import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Cart = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Calcular el precio total de los artículos en el carrito
    const calculateTotal = () => {
        return store.cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
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

    // Lógica para procesar la compra final
    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("Debes iniciar sesión para procesar tu compra.");
            navigate("/login");
            return;
        }

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
                    total: calculateTotal()
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
                    {/* Lista de productos */}
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