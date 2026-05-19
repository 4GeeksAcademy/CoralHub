import React, { useEffect, useState } from "react";

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
        <div className="container my-5">
            {/* HEADER */}
            <div className="text-center mb-5">
                <h1 className="display-4 fw-bold">CoralHub Marketplace</h1>
                <p className="lead text-muted">
                    The Marketplace for Marine Aquarium Lovers
                </p>
            </div>

            {/* ============================= */}
            {/* BUSCADOR DE PRODUCTOS         */}
            {/* ============================= */}
            <div className="row justify-content-center mb-4">
                <div className="col-md-8">
                    <div className="input-group input-group-lg shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            🔍
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search products by name or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                className="btn btn-outline-secondary"
                                onClick={() => setSearchTerm("")}
                                title="Clear search"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                    {searchTerm && (
                        <p className="text-center text-muted mt-2">
                            Showing {filteredProducts.length} result(s) for "{searchTerm}"
                        </p>
                    )}
                </div>
            </div>

            {/* Mensaje si no hay productos */}
            {products.length === 0 && (
                <div className="alert alert-info text-center">
                    No products available. Add some from the admin panel.
                </div>
            )}

            {/* Mensaje si la búsqueda no tiene resultados */}
            {products.length > 0 && filteredProducts.length === 0 && (
                <div className="alert alert-warning text-center">
                    No products match your search. Try different keywords.
                </div>
            )}

            {/* ============================= */}
            {/* FEATURED LISTINGS             */}
            {/* ============================= */}
            {filteredProducts.length > 0 && (
                <section className="mb-5">
                    <h2 className="mb-4 border-bottom pb-2">Featured Listings</h2>
                    <div className="row g-4">
                        {filteredProducts.map((product) => (
                            <div key={product.id} className="col-md-6 col-lg-3">
                                <div className="card h-100 shadow-sm">
                                    <img
                                        src={product.image_url || "https://via.placeholder.com/300x200?text=No+Image"}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text text-muted small">
                                            {product.description?.substring(0, 60)}
                                            {product.description?.length > 60 ? "..." : ""}
                                        </p>

                                        <div className="mb-2">
                                            {renderStars(product.rating_average)}
                                            <small className="text-muted ms-2">
                                                ({product.reviews_count} reviews)
                                            </small>
                                        </div>

                                        <div className="mt-auto">
                                            <h4 className="text-primary mb-2">
                                                ${product.price.toFixed(2)}
                                            </h4>
                                            <div className="d-flex justify-content-between align-items-center">
                                                {renderStatusBadge(product.status)}
                                                <small className="text-muted">
                                                    Stock: {product.stock}
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ============================= */}
            {/* RECENTLY ADDED                */}
            {/* ============================= */}
            {filteredProducts.length > 0 && (
                <section className="mb-5">
                    <h2 className="mb-4 border-bottom pb-2">Recently Added</h2>
                    <div className="list-group">
                        {filteredProducts.map((product) => (
                            <div
                                key={`recent-${product.id}`}
                                className="list-group-item d-flex justify-content-between align-items-center"
                            >
                                <div className="d-flex align-items-center">
                                    <img
                                        src={product.image_url || "https://via.placeholder.com/60x60?text=No+Image"}
                                        alt={product.name}
                                        style={{
                                            width: "60px",
                                            height: "60px",
                                            objectFit: "cover",
                                            borderRadius: "8px",
                                            marginRight: "15px"
                                        }}
                                    />
                                    <div>
                                        <h6 className="mb-0">{product.name}</h6>
                                        <small className="text-muted">
                                            {renderStars(product.rating_average)} · Stock: {product.stock}
                                        </small>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h5 className="mb-0 text-primary">
                                        ${product.price.toFixed(2)}
                                    </h5>
                                    {renderStatusBadge(product.status)}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};