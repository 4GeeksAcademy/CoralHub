import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const SHIPPING_COST = 10;

export const Cart = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Delivery method state
    const [deliveryMethod, setDeliveryMethod] = useState("pickup");
    const [shippingAddress, setShippingAddress] = useState({
        full_name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "United States",
        phone: ""
    });

    // Subtotal de los productos
    const calculateSubtotal = () => {
        return store.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Costo de envío segun el metodo elegido
    const shippingFee = deliveryMethod === "shipping" ? SHIPPING_COST : 0;

    // Total final (productos + envio)
    const calculateTotal = () => {
        return (calculateSubtotal() + shippingFee).toFixed(2);
    };

    // Funciones de edición del carrito
    const handleIncreaseQuantity = (item) => {
        dispatch({
            type: "update_quantity",
            payload: { id: item.id, quantity: item.quantity + 1 }
        });
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch({
                type: "update_quantity",
                payload: { id: item.id, quantity: item.quantity - 1 }
            });
        } else {
            // Si es 1 y presionan menos, le preguntamos si desea eliminarlo
            if (confirm(`¿Deseas eliminar ${item.name} del carrito?`)) {
                handleRemoveItem(item.id);
            }
        }
    };

    const handleRemoveItem = (id) => {
        dispatch({
            type: "remove_from_cart",
            payload: id
        });
    };

    // Actualiza un campo del formulario de direccion
    const handleAddressChange = (field, value) => {
        setShippingAddress({ ...shippingAddress, [field]: value });
    };

    // Valida que la direccion este completa si eligio shipping
    const validateShippingForm = () => {
        if (deliveryMethod === "pickup") return true;

        const required = ["full_name", "street", "city", "state", "zip_code", "country"];
        for (const field of required) {
            if (!shippingAddress[field]?.trim()) {
                alert(`Por favor completa: ${field.replace("_", " ")}`);
                return false;
            }
        }
        return true;
    };

    // Lógica para procesar la compra final
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para procesar tu compra.");
            navigate("/login");
            return;
        }

        // Validamos la direccion antes de seguir
        if (!validateShippingForm()) return;

        try {
            // Sanitizamos la URL quitando barras diagonales al final si existen
            const cleanUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

            const response = await fetch(`${cleanUrl}/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    items: store.cart,
                    total: calculateTotal(),
                    delivery_method: deliveryMethod,
                    shipping_address: deliveryMethod === "shipping" ? shippingAddress : null
                })
            });

            if (response.ok) {
                alert("🎉 ¡Compra realizada con éxito! Gracias por tu confianza.");
                dispatch({ type: "clear_cart" });
                navigate("/private");
            } else {
                // Manejo de error seguro por si el backend no devuelve un JSON válido (ej: Error 405 HTML)
                const responseText = await response.text();
                try {
                    const data = JSON.parse(responseText);
                    alert(data.msg || data.error || `Error del servidor: ${response.status}`);
                } catch (jsonErr) {
                    alert(`El servidor respondió con un error (${response.status}). Verifica el método de la ruta en Flask.`);
                }
            }
        } catch (error) {
            console.error(error);
            alert("Error de conexión con el servidor.");
        }
    };

    return (
        <div className="container mt-5 min-vh-100">
            <h1 className="mb-4 fw-bold">Tu Carrito de Compras 🛒</h1>

            {store.cart.length === 0 ? (
                <div className="alert alert-warning text-center p-5">
                    <h3>Tu carrito está vacío.</h3>
                    <p>Explora nuestra tienda para añadir productos increíbles.</p>
                    <Link to="/" className="btn btn-dark mt-3">Ir a la Tienda</Link>
                </div>
            ) : (
                <div className="row">
                    {/* Lista de productos + Delivery Method */}
                    <div className="col-lg-8">
                        {store.cart.map((item) => (
                            <div className="card mb-3 p-3 border-0 shadow-sm rounded-3 bg-light" key={item.id}>
                                <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
                                    {/* Imagen */}
                                    <img src={item.image_url} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />

                                    {/* Información del Producto */}
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">{item.name}</h5>
                                        <p className="text-secondary mb-0">Precio unitario: ${item.price}</p>
                                    </div>

                                    {/* Control de Cantidad (Edición) */}
                                    <div className="d-flex align-items-center border rounded bg-white me-3">
                                        <button className="btn btn-sm px-3 py-1 border-0" onClick={() => handleDecreaseQuantity(item)}>-</button>
                                        <span className="px-2 fw-semibold" style={{ minWidth: "30px", textAlign: "center" }}>{item.quantity}</span>
                                        <button className="btn btn-sm px-3 py-1 border-0" onClick={() => handleIncreaseQuantity(item)}>+</button>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="fw-bold fs-5 me-3" style={{ minWidth: "90px", textAlign: "right" }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>

                                    {/* Botón Eliminar */}
                                    <button
                                        className="btn btn-outline-danger btn-sm border-0 p-2"
                                        onClick={() => handleRemoveItem(item.id)}
                                        title="Eliminar producto"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}

                        {/* DELIVERY METHOD */}
                        <div className="card mt-4 p-4 border-0 shadow-sm rounded-3 bg-light">
                            <h4 className="fw-bold mb-3">📦 Delivery Method</h4>

                            {/* Opcion: Pickup */}
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryMethod"
                                    id="pickup"
                                    value="pickup"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                />
                                <label className="form-check-label w-100" htmlFor="pickup">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>📍 Local Pickup</strong>
                                            <p className="text-secondary mb-0 small">Recoge tu pedido en nuestra ubicación en Miami, FL</p>
                                        </div>
                                        <span className="badge bg-success">FREE</span>
                                    </div>
                                </label>
                            </div>

                            {/* Opcion: Shipping */}
                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryMethod"
                                    id="shipping"
                                    value="shipping"
                                    checked={deliveryMethod === "shipping"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                />
                                <label className="form-check-label w-100" htmlFor="shipping">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>🚚 Shipping to your address</strong>
                                            <p className="text-secondary mb-0 small">Recibe tu pedido en tu domicilio (3-5 días hábiles)</p>
                                        </div>
                                        <span className="badge bg-primary">${SHIPPING_COST.toFixed(2)}</span>
                                    </div>
                                </label>
                            </div>

                            {/* FORMULARIO DE DIRECCIÓN (solo si elige shipping) */}
                            {deliveryMethod === "shipping" && (
                                <div className="mt-3 p-3 bg-white rounded-3">
                                    <h6 className="fw-bold mb-3">Shipping Address</h6>

                                    <div className="row g-2">
                                        <div className="col-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full Name *"
                                                value={shippingAddress.full_name}
                                                onChange={(e) => handleAddressChange("full_name", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Street Address *"
                                                value={shippingAddress.street}
                                                onChange={(e) => handleAddressChange("street", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City *"
                                                value={shippingAddress.city}
                                                onChange={(e) => handleAddressChange("city", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="State *"
                                                value={shippingAddress.state}
                                                onChange={(e) => handleAddressChange("state", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="ZIP Code *"
                                                value={shippingAddress.zip_code}
                                                onChange={(e) => handleAddressChange("zip_code", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Country *"
                                                value={shippingAddress.country}
                                                onChange={(e) => handleAddressChange("country", e.target.value)}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Phone (optional)"
                                                value={shippingAddress.phone}
                                                onChange={(e) => handleAddressChange("phone", e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Resumen del pedido */}
                    <div className="col-lg-4">
                        <div className="card p-4 border-0 shadow-sm rounded-4 bg-white">
                            <h4 className="fw-bold mb-4">Resumen de Compra</h4>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">Subtotal:</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">
                                    {deliveryMethod === "shipping" ? "Shipping:" : "Pickup:"}
                                </span>
                                <span>
                                    {deliveryMethod === "shipping"
                                        ? `$${shippingFee.toFixed(2)}`
                                        : <span className="text-success">FREE</span>
                                    }
                                </span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="fw-bold">Total:</span>
                                <span className="fw-bold text-success">${calculateTotal()}</span>
                            </div>

                            <button className="btn btn-dark w-100 py-3 fw-semibold rounded-3" onClick={handleCheckout}>
                                Confirmar y Pagar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};