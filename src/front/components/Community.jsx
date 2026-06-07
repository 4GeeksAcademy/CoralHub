import React, { useState } from "react";

export const Community = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleJoinCommunity = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/community/subscribe`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Subscription failed");
            }

            setMessage("Welcome to the Reef Community!");
            setEmail("");

        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <section className="community-section py-5 position-relative overflow-hidden">
            <div className="container py-5">
                <div className="community-card">
                    <div className="row align-items-center g-5">

                        <div className="col-lg-8">
                            <div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
                                <div className="community-icon">
                                    <span>👥</span>
                                </div>

                                <div className="text-center text-md-start">
                                    <h2 className="community-title mb-3">
                                        Join the <span>Reef</span> Community
                                    </h2>

                                    <p className="community-text mb-3">
                                        Connect with hobbyists, share knowledge,
                                        and grow the reef together.
                                    </p>

                                    <form onSubmit={handleJoinCommunity} className="community-form">
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="community-input"
                                        />

                                        <button type="submit" className="community-btn">
                                            Join CoralHub →
                                        </button>
                                    </form>

                                    {message && (
                                        <p className="community-message mt-3">
                                            {message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <svg className="community-wave" viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path
                    d="M0 62C170 95 330 35 500 42C680 50 760 105 940 76C1090 52 1235 28 1440 66"
                    stroke="#4EC7C1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    fill="none"
                    opacity="0.8"
                />
            </svg>
        </section>
    );
};