import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        const fetchOrders = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.error || "Failed to load orders");
                }

                setOrders(data);

            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, [navigate]);

    const handleStatusChange = async (orderId, newStatus) => {

        const token = localStorage.getItem("token");

        try {

            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${orderId}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        order_status: newStatus
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error);
            }

            setOrders(prev =>
                prev.map(order =>
                    order.id === orderId
                        ? { ...order, order_status: newStatus }
                        : order
                )
            );

            alert("Order status updated");

        } catch (err) {

            alert(err.message);

        }
    };

    if (loading) {
        return <div className="container py-5">Loading...</div>;
    }

    if (error) {
        return <div className="container py-5">{error}</div>;
    }

    return (
        <main className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Manage Orders</h1>
                <span className="badge bg-primary">
                    Total Orders: {orders.length}
                </span>
            </div>

            <div className="card shadow">

                <div className="table-responsive">

                    <table className="table table-hover mb-0">

                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Buyer ID</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {orders.map(order => (

                                <tr key={order.id}>

                                    <td>#{order.id}</td>

                                    <td>{order.buyer_id}</td>

                                    <td>
                                        ${Number(order.total).toFixed(2)}
                                    </td>

                                    <td>
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>

                                    <td>

                                        <select
                                            className="form-select"
                                            value={order.order_status}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="paid">Paid</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </main>
    );
};