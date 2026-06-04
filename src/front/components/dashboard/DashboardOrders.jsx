import React, { useEffect, useState } from "react";

export const DashboardOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const token = localStorage.getItem("token");

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/my-orders`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (!response.ok) {
                    throw new Error("Could not load orders");
                }

                const data = await response.json();

                setOrders(data);

            } catch (error) {

                console.error(error);

                setError(error.message);

            } finally {

                setLoading(false);
            }
        };

        loadOrders();

    }, []);

    if (loading) {

        return (

            <section className="dashboard-section">

                <div className="section-header">

                    <h2>My Orders</h2>

                </div>

                <p className="dashboard-message">
                    Loading orders...
                </p>

            </section>
        );
    }

    if (error) {

        return (

            <section className="dashboard-section">

                <div className="section-header">

                    <h2>My Orders</h2>

                </div>

                <p className="dashboard-error">
                    {error}
                </p>

            </section>
        );
    }

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>My Orders</h2>

            </div>

            {orders.length === 0 ? (

                <p className="dashboard-message">
                    You don't have any orders yet.
                </p>

            ) : (

                <div className="orders-list">

                    {orders.map(order => (

                        <div className="order-products">
                            {order.items?.map(item => (
                                <div
                                    key={item.id}
                                    className="order-product"
                                >
                                    <img
                                        src={item.product.image_url}
                                        alt={item.product.name}
                                        className="order-product-image"
                                    />

                                    <div className="order-product-info">
                                        <h6>{item.product.name}</h6>

                                        <p>
                                            Qty: {item.quantity}
                                        </p>

                                        <p>
                                            ${item.unit_price}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};