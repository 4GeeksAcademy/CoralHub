import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const CheckoutSuccess = () => {
    const { store, dispatch } = useGlobalReducer();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const hasCreatedOrder = useRef(false);

    useEffect(() => {
        const finishCheckout = async () => {
            if (hasCreatedOrder.current) return;
            hasCreatedOrder.current = true;

            const token = localStorage.getItem("token");

            if (!token || !sessionId) return;

            try {
                const cart = store.cart || JSON.parse(localStorage.getItem("cart")) || [];

                const deliveryMethod =
                    localStorage.getItem("delivery_method") || "pickup";

                const shippingAddress =
                    JSON.parse(localStorage.getItem("shipping_address")) || null;

                const orderResponse = await fetch(
                    `${backendUrl}/api/create-order-from-session`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            session_id: sessionId,
                            cart,
                            delivery_method: deliveryMethod,
                            shipping_address: shippingAddress
                        })
                    }
                );

                const orderData = await orderResponse.json();

                if (!orderResponse.ok) {
                    console.error("Error creating order:", orderData);
                    return;
                }

                await fetch(`${backendUrl}/api/cart`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                dispatch({ type: "clear_cart" });

                localStorage.removeItem("delivery_method");
                localStorage.removeItem("shipping_address");

            } catch (err) {
                console.error("Error finishing checkout:", err);
            }
        };

        finishCheckout();
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

                            <Link to="/dashboard/orders" className="btn btn-outline-secondary py-2 rounded-3">
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