import React from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Cart = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Calcular el precio total de los artículos en el carrito
    const calculateTotal = () => {
        return store.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    // Lógica para procesar la compra final
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        // Regla de negocio: El usuario debe estar registrado/logueado para comprar
        if (!token) {
            alert("Debes iniciar sesión para procesar tu compra.");
            navigate("/login");
            return;
        }

        try {
            // Simulamos o enviamos la petición de orden de compra a Flask
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // Enviamos el JWT de seguridad
                },
                body: JSON.stringify({
                    items: store.cart,
                    total: calculateTotal()
                })
            });

            if (response.ok) {
                alert("🎉 ¡Compra realizada con éxito! Gracias por tu confianza.");
                dispatch({ type: "clear_cart" }); // Vaciamos el carrito global
                navigate("/private"); // Lo redirigimos a su zona privada
            } else {
                const data = await response.json();
                alert(data.msg || "Hubo un problema al procesar el pago.");
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
                    
                    <div className="col-lg-8">
                        {store.cart.map((item) => (
                            <div className="card mb-3 p-3 border-0 shadow-sm rounded-3" key={item.id}>
                                <div className="d-flex align-items-center gap-4">
                                    <img src={item.image_url} alt={item.name} style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "10px" }} />
                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">{item.name}</h5>
                                        <p className="text-secondary mb-0">Precio: ${item.price}</p>
                                        <p className="text-secondary mb-0">Cantidad: {item.quantity}</p>
                                    </div>
                                    <div className="fw-bold fs-5">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Resumen del pedido */}
                    <div className="col-lg-4">
                        <div className="card p-4 border-0 shadow-sm rounded-4 bg-white">
                            <h4 className="fw-bold mb-4">Resumen de Compra</h4>
                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span>Total:</span>
                                <span className="fw-bold text-success">${calculateTotal()}</span>
                            </div>
                            <hr />
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