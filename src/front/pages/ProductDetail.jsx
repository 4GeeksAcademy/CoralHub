import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx"; // 👈 Importamos el estado global
import "../index.css";

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { store, dispatch } = useGlobalReducer(); // 👈 Consumimos el dispatch
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)
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

    // Función para manejar el clic en Agregar al Carrito
    const handleAddToCart = () => {

        const token = localStorage.getItem("token");

        // Verificar si el usuario está logeado

        if (!token) {

            alert("You need to sign in first");
            navigate("/login");

            return;
        }

        // Agregar producto al carrito

        if (product) {

            dispatch({
                type: "add_to_cart",
                payload: product
            });

            alert(`${product.name} añadido al carrito con éxito 🛒`);
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
                                    className="hero-btn-solid "
                                    onClick={handleAddToCart}
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    Add to Cart
                                </button>
                                <button className="btn wishlist-btn" aria-label="Add to wishlist">♡</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Nota: He omitido la sección de comentarios inferior en este bloque para ahorrar espacio, mantén la tuya intacta */}
            </div>
        </div>
    );
};