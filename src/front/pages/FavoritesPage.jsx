import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const FavoritesPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMostFavorited();
    }, []);

    const loadMostFavorited = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/favorites/all`
            );

            const data = await response.json();

            setProducts(data);

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="catalog-page">
                <div className="container py-5 text-center">
                    <p>Loading favorite products...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="catalog-page">

            <section className="catalog-hero">
                <div className="container">
                    <div className="catalog-hero-content">
                        <h1>Most Favorited Products</h1>

                        <p>
                            Discover the products CoralHub users are saving the most.
                        </p>
                    </div>
                </div>
            </section>

            <div className="container catalog-container">

                {products.length === 0 ? (
                    <div className="alert alert-info text-center">
                        No favorite products yet.
                    </div>
                ) : (
                    <div className="row g-4">

                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="col-sm-6 col-lg-3"
                            >
                                <div className="coral-card">

                                    <div className="coral-image-wrapper">
                                        <img
                                            src={
                                                product.image_url ||
                                                "https://via.placeholder.com/300x200?text=No+Image"
                                            }
                                            alt={product.name}
                                            className="coral-image"
                                        />

                                        <div className="new-badge">
                                            ❤️ {product.favorites_count}
                                        </div>
                                    </div>

                                    <div className="coral-card-body">

                                        <h5>{product.name}</h5>

                                        <p>
                                            {product.description?.substring(0, 70)}
                                            {product.description?.length > 70 ? "..." : ""}
                                        </p>

                                        <h3 className="product-price">
                                            ${Number(product.price).toFixed(2)}
                                        </h3>

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
                )}

            </div>
        </div>
    );
};