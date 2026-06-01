import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const DashboardProducts = ({ setActiveSection }) => {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const [visibleCount, setVisibleCount] = useState(3);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/my-products`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        })

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Could not load products");
                }

                return response.json();
            })

            .then((data) => {

                setProducts(data);

                setLoading(false);
            })

            .catch((error) => {

                console.error(error);

                setError(error.message);

                setLoading(false);
            });

    }, []);

    if (loading) {

        return (

            <section className="dashboard-section">

                <div className="section-header">

                    <h2>My Products</h2>

                </div>

                <p className="dashboard-message">
                    Loading products...
                </p>

            </section>
        );
    }

    if (error) {

        return (

            <section className="dashboard-section">

                <div className="section-header">

                    <h2>My Products</h2>

                </div>

                <p className="dashboard-error">
                    {error}
                </p>

            </section>
        );
    }

    const isOverviewPreview = !!setActiveSection;

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>My Products</h2>

                <Link
                    to="/add-product"
                    className="section-btn"
                >
                    Add Product
                </Link>

            </div>

            {products.length === 0 ? (

                <p className="dashboard-message">
                    You don't have products yet.
                </p>

            ) : (

                <>

                    <div className="products-table">

                        {products
                            .slice(0, visibleCount)
                            .map(product => (

                                <div
                                    key={product.id}
                                    className="product-row"
                                >

                                    <div className="product-info">

                                        <img
                                            src={product.image_url}
                                            alt={product.name}
                                            className="product-image"
                                        />

                                        <div>

                                            <h5>{product.name}</h5>

                                            <p>${product.price}</p>

                                        </div>

                                    </div>

                                    <div className="product-stock">

                                        Stock: {product.stock}

                                    </div>

                                    <Link
                                        to={`/product/${product.id}`}
                                        className="product-status active"
                                    >
                                        View
                                    </Link>

                                </div>

                            ))}

                    </div>

                    {isOverviewPreview && (

                        <button
                            className="dashboard-load-more"
                            onClick={() => setActiveSection("products")}
                        >
                            View All Products
                        </button>

                    )}
                </>

            )}

        </section>
    );
};