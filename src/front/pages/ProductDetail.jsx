import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import "../index.css";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        fetch(`${backendUrl}/api/products/${id}`)
            .then((response) => {
                if (!response.ok) throw new Error("Product not found");
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    // Agregar producto al carrito (ahora sincroniza con el backend)
    const handleAddToCart = async () => {
        const token = localStorage.getItem("token");

        // Verificar si el usuario está logueado
        if (!token) {
            alert("You need to sign in first");
            navigate("/login");
            return;
        }

        if (!product) return;

        setAddingToCart(true);

        try {
            // 1. Agregar el producto al carrito en el backend
            const response = await fetch(`${backendUrl}/api/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: 1
                })
            });

            if (!response.ok) {
                const data = await response.json();
                alert(data.error || "Error al agregar al carrito");
                setAddingToCart(false);
                return;
            }

            // 2. Refrescar el carrito global para que la Navbar se actualice
            const cartRes = await fetch(`${backendUrl}/api/cart`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (cartRes.ok) {
                const cartData = await cartRes.json();
                dispatch({ type: "set_cart", payload: cartData });
            }

            alert(`${product.name} añadido al carrito con éxito 🛒`);
        } catch (err) {
            console.error(err);
            alert("Error de conexión con el servidor");
        } finally {
            setAddingToCart(false);
        }
    };

    if (loading) {
        return (
            <div className="product-page">
                <div className="container py-5 text-center">
                    <div className="spinner-border text-info"></div>
                    <p className="mt-3 text-light">
                        Loading product...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page">
                <div className="container py-5">
                    <div className="alert alert-danger">
                        {error}
                    </div>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="product-page">
            <div className="container py-5">
                <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb custom-breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active">{product.name}</li>
                    </ol>
                </nav>

                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="product-image-card">
                            <img
                                src={
                                    product.image_url ||
                                    "https://placehold.co/500x500/png?text=No+Image"
                                }
                                alt={product.name}
                                className="product-main-image"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                        "https://placehold.co/500x500/png?text=Image+Not+Found";
                                }}
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="product-info-card">
                            <h1 className="product-title">{product.name}</h1>
                            <div className="rating-row">⭐⭐⭐⭐⭐ <span className="review-text">4.7 (32 reviews)</span></div>
                            <h2 className="product-price">${product.price}</h2>
                            <div className="stock-row">
                                <span>Stock: {product.stock} available</span>
                                <span className="status-badge">● Active</span>
                            </div>
                            <p className="product-description">{product.description}</p>

                            <div className="product-actions">
                                <button
                                    className="hero-btn-solid"
                                    onClick={handleAddToCart}
                                    disabled={addingToCart || product.stock === 0}
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    {addingToCart ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                                </button>
                                <button className="btn wishlist-btn" aria-label="Add to wishlist">♡</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};