import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Welcome = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [isReturning, setIsReturning] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/login");
            return;
        }

        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error("Error reading user from localStorage:", error);
            }
        }

        const hasVisited = localStorage.getItem("coralhub_returning");

        if (hasVisited) {
            setIsReturning(true);
        } else {
            localStorage.setItem("coralhub_returning", "true");
            setIsReturning(false);
        }
    }, [navigate]);

    const firstName = user?.first_name || "there";

    return (
        <main className="premium-welcome-page">

            {/* Background glowing effects */}
            <div className="ocean-glow ocean-glow-one"></div>
            <div className="ocean-glow ocean-glow-two"></div>
            <div className="ocean-glow ocean-glow-three"></div>

            {/* Floating bubbles */}
            <div className="floating-bubble bubble-one"></div>
            <div className="floating-bubble bubble-two"></div>
            <div className="floating-bubble bubble-three"></div>
            <div className="floating-bubble bubble-four"></div>

            {/* Hero Section */}
            <section className="welcome-hero">

                <div className="welcome-left">

                    <div className="welcome-badge">
                        <span className="welcome-wave">👋</span>
                    </div>

                    <h1 className="premium-welcome-title">
                        {isReturning ? "Welcome back," : "Welcome,"}
                        <span>{firstName}!</span>
                    </h1>

                    <p className="premium-welcome-subtitle">
                        Great to see you again at CoralHub.
                        <br />
                        <strong>★ Let’s continue exploring the ocean together.</strong>
                    </p>

                    {/* Stats */}
                    <div className="welcome-stats-grid">

                        <div className="welcome-stat-card">
                            <div className="stat-icon purple">🛒</div>

                            <div>
                                <h3>1</h3>
                                <p>Items in cart</p>
                                <span>$129.99</span>
                            </div>
                        </div>

                        <div className="welcome-stat-card">
                            <div className="stat-icon green">🎟️</div>

                            <div>
                                <h3>3</h3>
                                <p>My Tickets</p>
                                <span>Open cases</span>
                            </div>
                        </div>

                        <div className="welcome-stat-card">
                            <div className="stat-icon orange">🛡️</div>

                            <div>
                                <h3>2</h3>
                                <p>My Claims</p>
                                <span className="orange-text">In progress</span>
                            </div>
                        </div>

                        {/* Gold Aquarist Card */}
                        <Link to="/rewards" className="welcome-stat-card member-card gold-aquarist-card">
                            <div className="stat-icon gold">👑</div>

                            <div className="gold-aquarist-content">
                                <h3>Gold Aquarist</h3>
                                <p>65% to Platinum</p>

                                <div className="level-bar">
                                    <div></div>
                                </div>

                                <span className="rewards-text">🎁 2 Rewards Available</span>
                                <span className="view-rewards">View Rewards →</span>
                            </div>
                        </Link>

                    </div>
                </div>

                {/* Right visual side */}
                <div className="welcome-visual">
                    <div className="fish fish-one">🐠</div>
                    <div className="fish fish-two">🐟</div>
                    <div className="coral coral-one"></div>
                    <div className="coral coral-two"></div>
                    <div className="coral coral-three"></div>
                </div>

            </section>

            {/* Action Cards */}
            <section className="premium-actions">

                <Link to="/" className="premium-action-card browse-card">
                    <div className="action-icon blue">🪸</div>

                    <div>
                        <h2>Browse Products</h2>
                        <p>Discover amazing corals, fish, lights and more.</p>
                    </div>

                    <span className="action-arrow">→</span>
                </Link>

                <Link to="/cart" className="premium-action-card cart-card">
                    <div className="action-icon teal">🛒</div>

                    <div>
                        <h2>My Cart</h2>
                        <p>Review the items you’ve added.</p>
                    </div>

                    <span className="action-arrow">→</span>
                </Link>

                <Link to="/profile" className="premium-action-card profile-card">
                    <div className="action-icon violet">👤</div>

                    <div>
                        <h2>My Profile</h2>
                        <p>Manage your account and preferences.</p>
                    </div>

                    <span className="action-arrow">→</span>
                </Link>

            </section>

            {/* Main CTA */}
            <div className="premium-cta-wrapper">
                <Link to="/" className="premium-start-btn">
                    <span>✨</span>
                    Start Shopping
                    <span>→</span>
                </Link>
            </div>

        </main>
    );
};