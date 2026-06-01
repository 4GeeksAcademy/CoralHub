import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminTickets = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [accessDenied, setAccessDenied] = useState(false);
    const [responses, setResponses] = useState({}); // { ticketId: "texto" }
    const [respondingId, setRespondingId] = useState(null);

    const fetchTickets = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`${backendUrl}/api/admin/support-tickets`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.status === 403) {
                setAccessDenied(true);
                setLoading(false);
                return;
            }

            if (res.ok) {
                const data = await res.json();
                setTickets(data);
            }
        } catch (err) {
            console.error("Error fetching tickets:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    const handleRespond = async (ticketId) => {
        const token = localStorage.getItem("token");
        const responseText = responses[ticketId];

        if (!responseText || !responseText.trim()) {
            alert("Please write a response");
            return;
        }

        setRespondingId(ticketId);

        try {
            const res = await fetch(`${backendUrl}/api/admin/support-tickets/${ticketId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ admin_response: responseText.trim() })
            });

            if (res.ok) {
                setResponses({ ...responses, [ticketId]: "" });
                fetchTickets();
                alert("Response sent!");
            } else {
                const data = await res.json();
                alert(data.error || "Error sending response");
            }
        } catch (err) {
            console.error(err);
            alert("Connection error");
        } finally {
            setRespondingId(null);
        }
    };

    const statusBadge = (status) => {
        const colors = {
            open: "bg-warning text-dark",
            in_progress: "bg-info text-dark",
            closed: "bg-success"
        };
        return (
            <span className={`badge ${colors[status] || "bg-secondary"}`}>
                {status}
            </span>
        );
    };

    if (accessDenied) {
        return (
            <div className="container py-5">
                <div className="alert alert-danger">
                    Access denied. This page is for administrators only.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Support Tickets (Admin)</h1>

            {loading ? (
                <p className="text-secondary">Loading...</p>
            ) : tickets.length === 0 ? (
                <p className="text-secondary">No support tickets yet.</p>
            ) : (
                tickets.map((ticket) => (
                    <div key={ticket.id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                                <h6 className="fw-bold mb-0">{ticket.subject}</h6>
                                <small className="text-secondary">
                                    From: {ticket.user_name} ({ticket.user_email})
                                </small>
                            </div>
                            {statusBadge(ticket.status)}
                        </div>
                        <p className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>
                            {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}
                            {ticket.order_id ? ` · Order #${ticket.order_id}` : ""}
                        </p>
                        <p className="mb-3">{ticket.message}</p>

                        {ticket.admin_response ? (
                            <div className="bg-light rounded-3 p-3 border-start border-4 border-success">
                                <strong className="d-block mb-1 text-success">Your reply:</strong>
                                <p className="mb-0">{ticket.admin_response}</p>
                            </div>
                        ) : (
                            <div>
                                <textarea
                                    className="form-control mb-2"
                                    rows="3"
                                    placeholder="Write your response..."
                                    value={responses[ticket.id] || ""}
                                    onChange={(e) =>
                                        setResponses({ ...responses, [ticket.id]: e.target.value })
                                    }
                                    maxLength={1000}
                                ></textarea>
                                <button
                                    className="btn btn-dark rounded-3 px-4"
                                    onClick={() => handleRespond(ticket.id)}
                                    disabled={respondingId === ticket.id}
                                >
                                    {respondingId === ticket.id ? "Sending..." : "Respond"}
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};