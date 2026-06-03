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

                        <div
                            key={order.id}
                            className="order-row"
                        >

                            <div>

                                <h5>
                                    Order #{order.id}
                                </h5>

                                <p>
                                    ${order.total}
                                </p>

                                <p>
                                    {order.items?.length || 0} item(s)
                                </p>

                                <small>
                                    {new Date(order.created_at).toLocaleDateString()}
                                </small>

                            </div>

                            <div
                                className={`product-status ${order.order_status}`}
                            >
                                {order.order_status}
                            </div>

                        </div>

                    ))}

                </div>

            )}

        </section>
    );
};