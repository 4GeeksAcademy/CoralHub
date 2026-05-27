import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CheckoutSuccess = () => {
    const { dispatch } = useGlobalReducer();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    useEffect(() => {
        // Clear cart on backend and in global state
        const clearCart = async () => {
            const token = localStorage.getItem("token");

            if (!token) return;

            try {
                // Clear cart in DB
                await fetch(`${backendUrl}/api/cart`, {
                    method: "DELETE",
                    headers: { "Authorization": `Bearer ${token}` }
                });

                // Clear cart in global state (updates the navbar badge)
                dispatch({ type: "clear_cart" });
            } catch (err) {
                console.error("Error clearing cart:", err);
            }
        };

        clearCart();
    }, []);

    return (
        <div className="container mt-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                        <div style={{ fontSize: "5rem" }}>🎉</div>

                        <h1 className="fw-bold mt-3 mb-3 text-success">
                            Payment Successful!
                        </h1>

                        <p className="text-secondary fs-5 mb-4">
                            Thank you for your purchase. Your order has been processed successfully.
                        </p>

                        {sessionId && (
                            <p className="text-secondary small mb-4">
                                Transaction ID: <code>{sessionId.substring(0, 20)}...</code>
                            </p>
                        )}

                        <div className="d-flex flex-column gap-2">
                            <Link to="/" className="btn btn-dark py-2 rounded-3">
                                Back to Store
                            </Link>
                            <Link to="/dashboard" className="btn btn-outline-secondary py-2 rounded-3">
                                View My Orders
                            </Link>
                        </div>

                        <p className="text-secondary mt-4 mb-0" style={{ fontSize: "0.85rem" }}>
                            📧 You'll receive a confirmation email from Stripe shortly.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};