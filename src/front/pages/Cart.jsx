import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Cart = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [processingCheckout, setProcessingCheckout] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Trae el carrito desde el backend al montar el componente
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        dispatch({ type: "set_cart_loading", payload: true });

        try {
            const response = await fetch(`${backendUrl}/api/cart`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Error ${response.status}: ${errorData.msg || errorData.error || response.statusText}`);
            }

            const data = await response.json();
            dispatch({ type: "set_cart", payload: data });
        } catch (err) {
            console.error("Error completo:", err);
            setError(err.message);
        } finally {
            dispatch({ type: "set_cart_loading", payload: false });
        }
    };

    // Cambiar cantidad de un item (PUT /api/cart/<id>)
    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${backendUrl}/api/cart/${itemId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || "Error al actualizar cantidad");
                return;
            }

            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Error de conexión");
        }
    };

    // Eliminar un item del carrito (DELETE /api/cart/<id>)
    const removeItem = async (itemId) => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(`${backendUrl}/api/cart/${itemId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("No se pudo eliminar el producto");

            fetchCart();
        } catch (err) {
            console.error(err);
            alert("Error al eliminar el producto");
        }
    };

    // ⚡ CHECKOUT CON STRIPE
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para procesar tu compra.");
            navigate("/login");
            return;
        }

        if (store.cart.items.length === 0) {
            alert("Tu carrito está vacío");
            return;
        }

        setProcessingCheckout(true);

        try {
            // 1. Pedir al backend que cree una sesión de Stripe
            const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.error || "Hubo un problema al procesar el pago.");
                setProcessingCheckout(false);
                return;
            }

            // 2. Redirigir al usuario a la página de pago de Stripe
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert("Error: no se recibió la URL de pago");
                setProcessingCheckout(false);
            }
        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor.");
            setProcessingCheckout(false);
        }
    };

    // ESTADO: Loading
    if (store.cartLoading) {
        return (
            <div className="container mt-5 text-center min-vh-100">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                </div>
                <p className="mt-3">Cargando tu carrito...</p>
            </div>
        );
    }

    // ESTADO: Error
    if (error) {
        return (
            <div className="container mt-5 min-vh-100">
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    // ESTADO: Carrito vacío
    if (!store.cart.items || store.cart.items.length === 0) {
        return (
            <div className="container mt-5 min-vh-100">
                <h1 className="mb-4 fw-bold">Tu Carrito de Compras 🛒</h1>
                <div className="alert alert-warning text-center p-5">
                    <h3>Tu carrito está vacío.</h3>
                    <p>Explora nuestra tienda para añadir productos increíbles.</p>
                    <Link to="/" className="btn btn-dark mt-3">Ir a la Tienda</Link>
                </div>
            </div>
        );
    }

    // ESTADO: Carrito con items
    return (
        <div className="container mt-5 min-vh-100">
            <h1 className="mb-4 fw-bold">Tu Carrito de Compras 🛒</h1>

            <div className="row">
                {/* Lista de productos */}
                <div className="col-lg-8">
                    {store.cart.items.map((item) => (
                        <div className="card mb-3 p-3 border-0 shadow-sm rounded-3" key={item.id}>
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <img
                                    src={item.product?.image_url || "https://via.placeholder.com/80"}
                                    alt={item.product?.name}
                                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }}
                                />

                                <div className="flex-grow-1">
                                    <h5 className="fw-bold mb-1">{item.product?.name}</h5>
                                    <p className="text-secondary mb-2">
                                        Precio unitario: ${item.product?.price?.toFixed(2)}
                                    </p>

                                    {/* Controles de cantidad */}
                                    <div className="d-flex align-items-center gap-2">
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                        >
                                            −
                                        </button>
                                        <span className="fw-bold px-3">{item.quantity}</span>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <button
                                            className="btn btn-outline-danger btn-sm ms-3"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            🗑️ Eliminar
                                        </button>
                                    </div>
                                </div>

                                <div className="fw-bold fs-5 text-end" style={{ minWidth: "100px" }}>
                                    ${(item.product?.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Resumen */}
                <div className="col-lg-4">
                    <div className="card p-4 border-0 shadow-sm rounded-4 bg-white sticky-top" style={{ top: "20px" }}>
                        <h4 className="fw-bold mb-4">Resumen de Compra</h4>

                        <div className="d-flex justify-content-between mb-2">
                            <span className="text-secondary">Productos:</span>
                            <span>{store.cart.count}</span>
                        </div>

                        <div className="d-flex justify-content-between mb-3 fs-5">
                            <span>Total:</span>
                            <span className="fw-bold text-success">${store.cart.total.toFixed(2)}</span>
                        </div>

                        <hr />

                        <button
                            className="btn btn-dark w-100 py-3 fw-semibold rounded-3"
                            onClick={handleCheckout}
                            disabled={processingCheckout}
                        >
                            {processingCheckout ? "Redirigiendo a Stripe..." : "💳 Pagar con Stripe"}
                        </button>

                        <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: "0.8rem" }}>
                            🔒 Pago seguro procesado por Stripe
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};