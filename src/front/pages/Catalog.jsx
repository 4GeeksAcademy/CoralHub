import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import { warningAlert } from "../utils/alerts";

export const Catalog = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [visibleProducts, setVisibleProducts] = useState(16);
    const [favoriteIds, setFavoriteIds] = useState([]);

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


    useEffect(() => {

        const token = localStorage.getItem("token");

        if (!token) return;

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((data) => {

                const ids = data.map(
                    favorite => favorite.product_id
                );

                setFavoriteIds(ids);

            })
            .catch((error) => console.error(error));

    }, []);


    // Filtrar productos según el término de búsqueda
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const visibleFilteredProducts = filteredProducts.slice(0, visibleProducts);

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


    const handleFavorite = async (productId) => {

        const token = localStorage.getItem("token");

        if (!token) {

            warningAlert(
                "Sign In Required",
                "You need to sign in first."
            );
            return;
        }

        const isAlreadyFavorite =
            favoriteIds.includes(productId);

        try {

            if (!isAlreadyFavorite) {

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/favorites`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            product_id: productId
                        })
                    }
                );

                if (response.ok) {

                    setFavoriteIds([
                        ...favoriteIds,
                        productId
                    ]);
                }

            } else {

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/favorites/${productId}`,
                    {
                        method: "DELETE",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.ok) {

                    setFavoriteIds(
                        favoriteIds.filter(
                            id => id !== productId
                        )
                    );
                }
            }

        } catch (error) {

            console.error(error);

        }

    };

    return (
        <div className="catalog-page">

            {/* HERO */}
            <section className="catalog-hero">

                <div className="container">

                    <div className="catalog-hero-content">

                        <h1>
                            Find the best of the reef
                        </h1>

                        <p>
                            Premium corals and marine products for reef tank lovers.
                        </p>

                        {/* SEARCH */}
                        <div className="catalog-search-wrapper">

                            <span className="search-icon">
                                🔍
                            </span>

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

            {/* CONTENT */}
            <div className="container catalog-container">

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

                {/* FEATURED LISTINGS */}
                {filteredProducts.length > 0 && (

                    <section>

                        <div className="section-header-catalog">
                            <h2>Featured Listings</h2>
                        </div>

                        <div className="row g-4">

                            {visibleFilteredProducts.map((product) => (

                                <div
                                    key={product.id}
                                    className="col-sm-6 col-lg-3"
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

                                            <FavoriteButton
                                                className="favorite-btn-card"
                                                isFavorite={favoriteIds.includes(product.id)}
                                                onClick={() => handleFavorite(product.id)}
                                            />

                                            <div className="new-badge">
                                                New
                                            </div>

                                        </div>

                                        {/* BODY */}
                                        <div className="coral-card-body">

                                            <h5>
                                                {product.name}
                                            </h5>
                                            <small style={{ color: "red" }}>
                                                Category: {product.category}
                                            </small>

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

                                            {/* SELLER */}
                                            <div className="seller-row">

                                                <div className="seller-avatar-placeholder">
                                                    {product.seller_name?.charAt(0)}
                                                </div>

                                                <span className="catalog-seller-name">
                                                    {product.seller_name}
                                                </span>

                                            </div>

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
                        {visibleProducts < filteredProducts.length && (
                            <div className="text-center mt-5">
                                <button
                                    className="see-more-btn"
                                    onClick={() => setVisibleProducts(prev => prev + 8)}
                                >
                                    See More Products
                                </button>
                            </div>
                        )}

                        {visibleProducts > 16 && (
                            <div className="text-center mt-3">
                                <button
                                    className="see-less-btn"
                                    onClick={() => setVisibleProducts(16)}
                                >
                                    Show Less
                                </button>
                            </div>
                        )}
                    </section>
                )}

                {/* ======================================== */}
                {/* RECENTLY ADDED */}
                {/* ======================================== */}

                {filteredProducts.length > 0 && (

                    <section className="recent-section">

                        <div className="section-header-catalog">
                            <h2>Recently Added</h2>
                        </div>

                        <div className="recent-list">

                            {filteredProducts.slice(0, 4).map((product) => (

                                <div
                                    key={`recent-${product.id}`}
                                    className="recent-card"
                                >

                                    {/* IMAGE */}
                                    <img
                                        src={
                                            product.image_url ||
                                            "https://via.placeholder.com/100x100?text=No+Image"
                                        }
                                        alt={product.name}
                                        className="recent-image"
                                    />

                                    {/* INFO */}
                                    <div className="recent-info">

                                        <h5>
                                            {product.name}
                                        </h5>

                                        <p>
                                            {product.description?.substring(0, 60)}
                                            {product.description?.length > 60 ? "..." : ""}
                                        </p>

                                        <div className="recent-meta">

                                            <span className="recent-price">
                                                ${product.price.toFixed(2)}
                                            </span>

                                            <span className="recent-stock">
                                                Stock: {product.stock}
                                            </span>

                                        </div>
                                    </div>

                                    {/* BUTTON */}
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="recent-btn"
                                    >
                                        View Product
                                    </Link>

                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );

};