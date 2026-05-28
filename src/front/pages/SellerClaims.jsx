import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const SellerClaims = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [claims, setClaims] = useState([]);
    const [loading, setLoading] = useState(true);

    // Respuesta en proceso por cada reclamo: { [claimId]: "texto" }
    const [responses, setResponses] = useState({});
    const [submittingId, setSubmittingId] = useState(null);
    const [error, setError] = useState(null);

    // Cargar reclamos que le llegaron al seller
    const fetchClaims = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`${backendUrl}/api/claims/seller`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setClaims(data);
            } else if (res.status === 401) {
                navigate("/login");
            }
        } catch (err) {
            console.error("Error fetching claims:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClaims();
    }, []);

    // Responder un reclamo
    const handleRespond = async (claimId) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const responseText = (responses[claimId] || "").trim();
        if (!responseText) {
            setError("Response cannot be empty");
            return;
        }

        setSubmittingId(claimId);
        setError(null);

        try {
            const res = await fetch(`${backendUrl}/api/claims/${claimId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    seller_response: responseText
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error sending response");
                setSubmittingId(null);
                return;
            }

            // Limpiar el campo de ese reclamo y recargar
            setResponses((prev) => ({ ...prev, [claimId]: "" }));
            fetchClaims();
        } catch (err) {
            console.error(err);
            setError("Connection error");
        } finally {
            setSubmittingId(null);
        }
    };

    // Marcar como resuelto
    const markResolved = async (claimId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const res = await fetch(`${backendUrl}/api/claims/${claimId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ status: "resolved" })
            });

            if (res.ok) {
                fetchClaims();
            }
        } catch (err) {
            console.error(err);
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
            <h1 className="fw-bold mb-4">Claims Received</h1>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            {loading ? (
                <p className="text-secondary">Loading...</p>
            ) : claims.length === 0 ? (
                <p className="text-secondary">You have no claims yet.</p>
            ) : (
                claims.map((claim) => (
                    <div key={claim.id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h6 className="fw-bold mb-0">{claim.subject}</h6>
                                <small className="text-secondary">
                                    Product: {claim.product_name || "—"}
                                    {claim.buyer_name ? ` · From: ${claim.buyer_name}` : ""}
                                </small>
                            </div>
                            {statusBadge(claim.status)}
                        </div>
                        <p className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>
                            {claim.created_at ? new Date(claim.created_at).toLocaleString() : ""}
                        </p>
                        <p className="mb-3">{claim.message}</p>

                        {/* Si ya respondió, muestra la respuesta */}
                        {claim.seller_response ? (
                            <>
                                <div className="bg-light rounded-3 p-3 border-start border-4 border-success mb-2">
                                    <strong className="d-block mb-1 text-success">Your reply:</strong>
                                    <p className="mb-0">{claim.seller_response}</p>
                                </div>
                                {claim.status !== "resolved" && (
                                    <button
                                        className="btn btn-sm btn-outline-success rounded-3"
                                        onClick={() => markResolved(claim.id)}
                                    >
                                        Mark as resolved
                                    </button>
                                )}
                            </>
                        ) : (
                            // Si no ha respondido, muestra el formulario
                            <div>
                                <textarea
                                    className="form-control mb-2"
                                    rows="3"
                                    placeholder="Write your response..."
                                    value={responses[claim.id] || ""}
                                    onChange={(e) =>
                                        setResponses((prev) => ({ ...prev, [claim.id]: e.target.value }))
                                    }
                                    maxLength={1000}
                                ></textarea>
                                <button
                                    className="btn btn-dark rounded-3 px-4"
                                    onClick={() => handleRespond(claim.id)}
                                    disabled={submittingId === claim.id}
                                >
                                    {submittingId === claim.id ? "Sending..." : "Respond"}
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
