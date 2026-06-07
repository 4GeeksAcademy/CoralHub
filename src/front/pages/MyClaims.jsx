import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    successAlert
} from "../utils/alerts";

export const MyClaims = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [orders, setOrders] = useState([]);
    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado del formulario (qué OrderItem se está reclamando)
    const [selectedItem, setSelectedItem] = useState(null); // { order_item_id, product_name }
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Cargar órdenes del buyer + reclamos que ya hizo
    const fetchData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            // Órdenes reales del usuario
            const ordersRes = await fetch(`${backendUrl}/api/my-orders`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (ordersRes.ok) {
                const ordersData = await ordersRes.json();
                setOrders(ordersData);
            } else if (ordersRes.status === 401) {
                navigate("/login");
                return;
            }

            // Reclamos que el buyer ya hizo
            const claimsRes = await fetch(`${backendUrl}/api/claims/buyer`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            if (claimsRes.ok) {
                const claimsData = await claimsRes.json();
                setClaims(claimsData);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Elegir un producto comprado para reclamar
    const openClaimForm = (orderItemId, productName) => {
        setSelectedItem({ order_item_id: orderItemId, product_name: productName });
        setSubject("");
        setMessage("");
        setError(null);
        // Subir al formulario
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Enviar el reclamo
    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        if (!selectedItem) {
            setError("Please select a purchased product to file a claim about.");
            return;
        }
        if (!subject.trim()) {
            setError("Subject is required");
            return;
        }
        if (!message.trim()) {
            setError("Message is required");
            return;
        }

        setSubmitting(true);
        setError(null);

        try {
            const res = await fetch(`${backendUrl}/api/claims`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    order_item_id: selectedItem.order_item_id,
                    subject: subject.trim(),
                    message: message.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error sending claim");
                setSubmitting(false);
                return;
            }

            // Limpiar y recargar
            setSelectedItem(null);
            setSubject("");
            setMessage("");
            fetchData();
            await successAlert(
                "Claim Sent",
                "Your claim was sent to the seller successfully."
            );
            console.error(err);
            setError("Connection error");
        } finally {
            setSubmitting(false);
        }
    };

    // Color del badge según estado
    const statusBadge = (status) => {
        const colors = {
            open: "bg-warning text-dark",
            responded: "bg-info text-dark",
            resolved: "bg-success"
        };
        const labels = {
            open: "Open",
            responded: "Responded",
            resolved: "Resolved"
        };
        return (
            <span className={`badge ${colors[status] || "bg-secondary"}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">My Claims</h1>

            {/* Formulario de reclamo (aparece al elegir un producto) */}
            {selectedItem && (
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
                    <h5 className="fw-bold mb-3">
                        File a claim about: <span className="text-primary">{selectedItem.product_name}</span>
                    </h5>

                    <div className="mb-3">
                        <label className="form-label">Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="What is the problem about?"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            maxLength={200}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Message</label>
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Describe the issue with your purchase..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            maxLength={1000}
                        ></textarea>
                        <small className="text-secondary">{message.length}/1000</small>
                    </div>

                    {error && <div className="alert alert-danger py-2">{error}</div>}

                    <div className="d-flex gap-2">
                        <button
                            className="btn btn-dark rounded-3 px-4"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? "Sending..." : "Send Claim"}
                        </button>
                        <button
                            className="btn btn-outline-secondary rounded-3 px-4"
                            onClick={() => { setSelectedItem(null); setError(null); }}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Productos comprados (para iniciar un reclamo) */}
            <h4 className="fw-bold mb-3">Your Purchases</h4>

            {loading ? (
                <p className="text-secondary">Loading...</p>
            ) : orders.length === 0 ? (
                <p className="text-secondary">You haven't purchased anything yet.</p>
            ) : (
                orders.map((order) => (
                    <div key={order.id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h6 className="fw-bold mb-0">Order #{order.id}</h6>
                            <small className="text-secondary">
                                {order.created_at ? new Date(order.created_at).toLocaleDateString() : ""}
                            </small>
                        </div>

                        {order.items && order.items.length > 0 ? (
                            order.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="d-flex justify-content-between align-items-center border-top py-2"
                                >
                                    <div className="d-flex align-items-center gap-3">
                                        {item.product?.image_url && (
                                            <img
                                                src={item.product.image_url}
                                                alt={item.product?.name}
                                                style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 8 }}
                                            />
                                        )}
                                        <div>
                                            <div className="fw-semibold">
                                                {item.product?.name || "Product"}
                                            </div>
                                            <small className="text-secondary">
                                                Qty: {item.quantity} · ${item.unit_price}
                                            </small>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-sm btn-outline-dark rounded-3"
                                        onClick={() => openClaimForm(item.id, item.product?.name || "Product")}
                                    >
                                        File a claim
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p className="text-secondary mb-0">No items in this order.</p>
                        )}
                    </div>
                ))
            )}

            {/* Lista de reclamos hechos */}
            <h4 className="fw-bold mb-3 mt-5">My Filed Claims</h4>

            {loading ? (
                <p className="text-secondary">Loading...</p>
            ) : claims.length === 0 ? (
                <p className="text-secondary">You haven't filed any claims yet.</p>
            ) : (
                claims.map((claim) => (
                    <div key={claim.id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h6 className="fw-bold mb-0">{claim.subject}</h6>
                                <small className="text-secondary">
                                    Product: {claim.product_name || "—"}
                                </small>
                            </div>
                            {statusBadge(claim.status)}
                        </div>
                        <p className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>
                            {claim.created_at ? new Date(claim.created_at).toLocaleString() : ""}
                        </p>
                        <p className="mb-3">{claim.message}</p>

                        {claim.seller_response && (
                            <div className="bg-light rounded-3 p-3 border-start border-4 border-success">
                                <strong className="d-block mb-1 text-success">
                                    Seller replied{claim.seller_name ? ` (${claim.seller_name})` : ""}:
                                </strong>
                                <p className="mb-0">{claim.seller_response}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
