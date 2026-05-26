import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const backendUrl = import.meta.env.VITE_BACKEND_URL;

                if (!backendUrl) {
                    throw new Error("VITE_BACKEND_URL is not defined in .env file");
                }

                const response = await fetch(backendUrl + "/api/products");

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return (
            <span style={{ color: "#ffc107" }}>
                {"★".repeat(fullStars)}
                <span style={{ color: "#e0e0e0" }}>{"★".repeat(emptyStars)}</span>
            </span>
        );
    };

    const renderStatusBadge = (status) => {
        const styles = {
            active: "bg-success",
            inactive: "bg-secondary",
            sold_out: "bg-danger"
        };
        return (
            <span className={`badge ${styles[status] || "bg-secondary"}`}>
                {status}
            </span>
        );
    };

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Cargando catálogo...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

    return (
        <div className="catalog-page">

            {/* HERO */}
            <section className="catalog-hero">
                <div className="container">

                    <div className="catalog-hero-content">
                        <h1>Find the best of the reef</h1>

                        <p>
                            Premium corals and marine products for reef tank lovers.
                        </p>

                        {/* SEARCH */}
                        <div className="catalog-search-wrapper">
                            <span className="search-icon">🔍</span>

                            <input
                                type="text"
                                placeholder="Search products by name or description..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="catalog-search"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">

                {/* EMPTY STATES */}
                {products.length === 0 && (
                    <div className="alert alert-info text-center">
                        No products available yet.
                    </div>
                )}

                {products.length > 0 && filteredProducts.length === 0 && (
                    <div className="alert alert-warning text-center">
                        No products match your search.
                    </div>
                )}

                {/* FEATURED */}
                {filteredProducts.length > 0 && (
                    <section>

                        <div className="section-header">
                            <h2>Featured Listings</h2>
                        </div>

                        <div className="row g-4">

                            {filteredProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="col-md-6 col-lg-3"
                                >

                                    <div className="coral-card">

                                        {/* IMAGE */}
                                        <div className="coral-image-wrapper">

                                            <img
                                                src={
                                                    product.image_url ||
                                                    "https://via.placeholder.com/300x200?text=No+Image"
                                                }
                                                alt={product.name}
                                                className="coral-image"
                                            />

                                            <div className="favorite-btn">
                                                ♡
                                            </div>

                                            <div className="new-badge">
                                                New
                                            </div>

                                        </div>

                                        {/* CONTENT */}
                                        <div className="coral-card-body">

                                            <h5>{product.name}</h5>

                                            <p>
                                                {product.description?.substring(0, 70)}
                                                {product.description?.length > 70 ? "..." : ""}
                                            </p>

                                            {/* STARS */}
                                            <div className="stars-row">

                                                <span className="stars">
                                                    {renderStars(product.rating_average)}
                                                </span>

                                                <small>
                                                    ({product.reviews_count} reviews)
                                                </small>

                                            </div>

                                            {/* PRICE */}
                                            <h3 className="product-price">
                                                ${product.price.toFixed(2)}
                                            </h3>

                                            {/* FOOTER */}
                                            <div className="product-meta">

                                                <span className="stock-badge">
                                                    Available
                                                </span>

                                                <small>
                                                    Stock: {product.stock}
                                                </small>

                                            </div>

                                            <Link
                                                to={`/product/${product.id}`}
                                                className="view-product-btn"
                                            >
                                                View Product
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
            
};