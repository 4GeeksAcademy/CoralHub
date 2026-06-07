import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { successAlert } from "../utils/alerts";

export const MyTickets = () => {
    const navigate = useNavigate();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    // Cargar tickets del usuario
    const fetchTickets = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        try {
            const res = await fetch(`${backendUrl}/api/support-tickets`, {
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                const data = await res.json();
                setTickets(data);
            } else if (res.status === 401) {
                navigate("/login");
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

    // Crear ticket nuevo
    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
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
            const res = await fetch(`${backendUrl}/api/support-tickets`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    subject: subject.trim(),
                    message: message.trim()
                })
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Error sending message");
                setSubmitting(false);
                return;
            }

            // Limpiar y recargar
            setSubject("");
            setMessage("");
            fetchTickets();
            await successAlert(
                "Message Sent",
                "Your message was sent to our support team successfully."
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
            in_progress: "bg-info text-dark",
            closed: "bg-success"
        };
        const labels = {
            open: "Open",
            in_progress: "In Progress",
            closed: "Answered"
        };
        return (
            <span className={`badge ${colors[status] || "bg-secondary"}`}>
                {labels[status] || status}
            </span>
        );
    };

    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Contact Support</h1>

            {/* Formulario nuevo ticket */}
            <div className="card border-0 shadow-sm rounded-4 p-4 mb-5">
                <h5 className="fw-bold mb-3">Send us a message</h5>

                <div className="mb-3">
                    <label className="form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="What is your message about?"
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
                        placeholder="Describe your question or issue..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={1000}
                    ></textarea>
                    <small className="text-secondary">{message.length}/1000</small>
                </div>

                {error && <div className="alert alert-danger py-2">{error}</div>}

                <button
                    className="btn btn-dark rounded-3 px-4"
                    onClick={handleSubmit}
                    disabled={submitting}
                >
                    {submitting ? "Sending..." : "Send Message"}
                </button>
            </div>

            {/* Lista de mis tickets */}
            <h4 className="fw-bold mb-3">My Messages</h4>

            {loading ? (
                <p className="text-secondary">Loading...</p>
            ) : tickets.length === 0 ? (
                <p className="text-secondary">You haven't sent any messages yet.</p>
            ) : (
                tickets.map((ticket) => (
                    <div key={ticket.id} className="card border-0 shadow-sm rounded-4 p-4 mb-3">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                            <h6 className="fw-bold mb-0">{ticket.subject}</h6>
                            {statusBadge(ticket.status)}
                        </div>
                        <p className="text-secondary mb-2" style={{ fontSize: "0.85rem" }}>
                            {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : ""}
                        </p>
                        <p className="mb-3">{ticket.message}</p>

                        {ticket.admin_response && (
                            <div className="bg-light rounded-3 p-3 border-start border-4 border-success">
                                <strong className="d-block mb-1 text-success">Support Team replied:</strong>
                                <p className="mb-0">{ticket.admin_response}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};