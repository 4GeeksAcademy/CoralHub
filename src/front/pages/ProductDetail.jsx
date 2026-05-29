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

    // Reviews state
    const [reviews, setReviews] = useState([]);
    const [newRating, setNewRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [newComment, setNewComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewError, setReviewError] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // Cargar producto
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

    // Cargar reviews
    useEffect(() => {
        fetchReviews();
    }, [id]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`${backendUrl}/api/products/${id}/reviews`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    // Calcular rating promedio real
    const averageRating = reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
        : 0;

    // Agregar al carrito (Lógica Front-End Persistente en LocalStorage)
    const handleAddToCart = () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You need to sign in first");
            navigate("/login");
            return;
        }

        if (!product) {
            alert("No se pudo cargar la información del producto.");
            return;
        }

        setAddingToCart(true);

        // Despachamos la acción directamente al reducer global para guardarlo en localStorage
        dispatch({
            type: "add_to_cart",
            payload: {
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url
            }
        });

        alert(`🎉 ¡${product.name} añadido al carrito con éxito! 🛒`);
        setAddingToCart(false);
    };

    // Enviar reseña
    const handleSubmitReview = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You need to sign in to leave a review");
            navigate("/login");
            return;
        }

        if (newRating < 1) {
            setReviewError("Please select a rating");
            return;
        }

        if (!newComment.trim()) {
            setReviewError("Please write a comment");
            return;
        }

        setSubmittingReview(true);
        setReviewError(null);

        try {
            const res = await fetch(`${backendUrl}/api/products/${id}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    rating: newRating,
                    comment: newComment.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setReviewError(data.error || "Error submitting review");
                setSubmittingReview(false);
                return;
            }

            // Limpiar formulario y recargar reviews
            setNewRating(0);
            setNewComment("");
            fetchReviews();
            alert("Review submitted successfully! 🎉");
        } catch (err) {
            console.error(err);
            setReviewError("Connection error");
        } finally {
            setSubmittingReview(false);
        }
    };

    // Borrar reseña
    const handleDeleteReview = async (reviewId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        if (!confirm("Are you sure you want to delete this review?")) return;

        try {
            const res = await fetch(`${backendUrl}/api/reviews/${reviewId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                fetchReviews();
            } else {
                const data = await res.json();
                alert(data.error || "Error deleting review");
            }
        } catch (err) {
            console.error(err);
            alert("Connection error");
        }
    };

    // Helper para renderizar estrellas
    const renderStars = (rating) => {
        return "★".repeat(Math.round(rating)) + "☆".repeat(5 - Math.round(rating));
    };

    // ID del usuario actual (para mostrar botón de borrar solo en sus reviews)
    const currentUserId = (() => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return user?.id;
        } catch {
            return null;
        }
    })();

    if (loading) {
        return (
            <div className="product-page">
                <div className="container py-5 text-center">
                    <div className="spinner-border text-info"></div>
                    <p className="mt-3 text-light">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page">
                <div className="container py-5">
                    <div className="alert alert-danger">{error}</div>
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
                            <div className="rating-row">
                                <span style={{ color: "#ffc107" }}>{renderStars(averageRating)}</span>{" "}
                                <span className="review-text">
                                    {averageRating > 0
                                        ? `${averageRating} (${reviews.length} review${reviews.length !== 1 ? "s" : ""})`
                                        : "No reviews yet"}
                                </span>
                            </div>
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
                                <button className="btn product-wishlist-btn" aria-label="Add to wishlist">♡</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================ */}
                {/* SECCIÓN DE REVIEWS           */}
                {/* ============================ */}
                <div className="row mt-5">
                    <div className="col-12">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <h3 className="fw-bold mb-4">Customer Reviews</h3>

                            {/* Formulario para escribir reseña */}
                            <div className="mb-5 p-4 bg-light rounded-3">
                                <h5 className="fw-bold mb-3">Write a review</h5>

                                {/* Selector de estrellas */}
                                <div className="mb-3">
                                    <label className="d-block mb-2 text-secondary">Your rating:</label>
                                    <div style={{ fontSize: "2rem", cursor: "pointer" }}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <span
                                                key={star}
                                                onClick={() => setNewRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                style={{
                                                    color: star <= (hoverRating || newRating) ? "#ffc107" : "#e0e0e0",
                                                    marginRight: "5px"
                                                }}
                                            >
                                                ★
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Comentario */}
                                <div className="mb-3">
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        placeholder="Share your experience with this product..."
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        maxLength={500}
                                    ></textarea>
                                    <small className="text-secondary">{newComment.length}/500</small>
                                </div>

                                {reviewError && (
                                    <div className="alert alert-danger py-2">{reviewError}</div>
                                )}

                                <button
                                    className="btn btn-dark rounded-3 px-4"
                                    onClick={handleSubmitReview}
                                    disabled={submittingReview}
                                >
                                    {submittingReview ? "Submitting..." : "Submit Review"}
                                </button>

                                <p className="text-secondary mt-2 mb-0" style={{ fontSize: "0.8rem" }}>
                                    Only customers who purchased this product can leave a review.
                                </p>
                            </div>

                            {/* Lista de reseñas */}
                            {reviews.length === 0 ? (
                                <p className="text-secondary text-center py-4">
                                    No reviews yet. Be the first to review this product!
                                </p>
                            ) : (
                                <div>
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-bottom py-3">
                                            <div className="d-flex justify-content-between align-items-start">
                                                <div>
                                                    <h6 className="fw-bold mb-1">{review.user_name}</h6>
                                                    <div style={{ color: "#ffc107" }}>
                                                        {renderStars(review.rating)}
                                                    </div>
                                                </div>
                                                <div className="text-end">
                                                    <small className="text-secondary">
                                                        {review.created_at
                                                            ? new Date(review.created_at).toLocaleDateString()
                                                            : ""}
                                                    </small>
                                                    {currentUserId === review.user_id && (
                                                        <button
                                                            className="btn btn-sm btn-outline-danger ms-2"
                                                            onClick={() => handleDeleteReview(review.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="mt-2 mb-0">{review.comment}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};