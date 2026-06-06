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

                <p className="dashboard-message">Loading orders...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className="dashboard-section">
                <div className="section-header">
                    <h2>My Orders</h2>
                </div>

                <p className="dashboard-error">{error}</p>
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
                        <div key={order.id} className="order-card">

                            <div className="order-card-header">
                                <div>
                                    <h5>Order #{order.id}</h5>

                                    <p>
                                        {order.created_at
                                            ? new Date(order.created_at).toLocaleDateString()
                                            : "No date available"}
                                    </p>
                                </div>

                                <span className={`order-status ${order.order_status}`}>
                                    {order.order_status}
                                </span>
                            </div>

                            <div className="order-summary">
                                <p>
                                    <strong>Total:</strong> ${Number(order.total).toFixed(2)}
                                </p>

                                <p>
                                    <strong>Delivery:</strong>{" "}
                                    {order.delivery_method === "shipping"
                                        ? "Shipping"
                                        : "Pickup"}
                                </p>
                            </div>

                            {order.delivery_method === "shipping" && order.shipping_address && (
                                <div className="order-shipping">
                                    <h6>Shipping Address</h6>

                                    <p>{order.shipping_address.full_name}</p>
                                    <p>{order.shipping_address.street}</p>
                                    <p>
                                        {order.shipping_address.city}, {order.shipping_address.state}{" "}
                                        {order.shipping_address.zip_code}
                                    </p>
                                    <p>{order.shipping_address.country}</p>
                                    <p>{order.shipping_address.phone}</p>
                                </div>
                            )}

                            <div className="order-products">
                                {order.items?.map(item => (
                                    <div key={item.id} className="order-product">
                                        <img
                                            src={item.product?.image_url}
                                            alt={item.product?.name}
                                            className="order-product-image"
                                        />

                                        <div className="order-product-info">
                                            <h6>{item.product?.name}</h6>

                                            <p>
                                                Qty: {item.quantity}
                                            </p>

                                            <p>
                                                Unit price: ${Number(item.unit_price).toFixed(2)}
                                            </p>

                                            <p>
                                                Subtotal: ${(item.quantity * item.unit_price).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};