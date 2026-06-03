import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DashboardFavorites = () => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/favorites`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            setFavorites(data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }
    };

    const removeFavorite = async (productId) => {

        try {

            const token = localStorage.getItem("token");

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

                setFavorites(
                    favorites.filter(
                        favorite => favorite.product_id !== productId
                    )
                );

            }

        } catch (error) {

            console.error(error);

        }
    };

    if (loading) {
        return <p>Loading favorites...</p>;
    }

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Favorite Products</h2>

            </div>

            {favorites.length === 0 ? (

                <div className="empty-state">

                    <h4>No favorites yet</h4>

                    <p>
                        Save products you like and they'll appear here.
                    </p>

                </div>

            ) : (

                <div className="row g-4">

                    {favorites.map((favorite) => {

                        const product = favorite.product;

                        return (

                            <div
                                key={favorite.id}
                                className="col-md-6 col-xl-4"
                            >

                                <div className="dashboard-product-card">

                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="dashboard-product-image"
                                    />

                                    <div className="dashboard-product-body">

                                        <h5>
                                            {product.name}
                                        </h5>

                                        <p>
                                            ${product.price.toFixed(2)}
                                        </p>

                                        <div className="d-flex gap-2">

                                            <div className="favorite-actions">

                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="favorite-view-btn"
                                                >
                                                    View Product
                                                </Link>

                                                <button
                                                    className="favorite-remove-btn"
                                                    onClick={() => removeFavorite(product.id)}
                                                >
                                                    Remove
                                                </button>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        );

                    })}

                </div>

            )}

        </section>
    );
};