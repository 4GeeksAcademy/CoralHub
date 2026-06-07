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
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);

                console.log("USER EN WELCOME:", parsedUser);
                console.log("ROLE DEL USER:", parsedUser?.role);
                console.log("EMAIL DEL USER:", parsedUser?.email);
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

    const firstName = user?.first_name || user?.name || "there";

    const userRole = String(user?.role || user?.rol || "").toLowerCase();
    const userEmail = String(user?.email || "").toLowerCase();

    const isAdmin =
        userRole === "admin" ||
        user?.is_admin === true ||
        user?.isAdmin === true ||
        userEmail.includes("admin");

    console.log("IS ADMIN:", isAdmin);

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
                        <span className="welcome-wave">
                            {isAdmin ? "🛡️" : "👋"}
                        </span>
                    </div>

                    {isAdmin ? (
                        <>
                            <h1 className="premium-welcome-title">
                                Welcome back,
                                <span> Admin!</span>
                            </h1>

                            <p className="premium-welcome-subtitle">
                                You are logged in as an administrator at CoralHub.
                                <br />
                                <strong>
                                    ★ Manage products, users, orders, claims and support tickets.
                                </strong>
                            </p>
                        </>
                    ) : (
                        <>
                            <h1 className="premium-welcome-title">
                                {isReturning ? "Welcome back," : "Welcome,"}
                                <span>{firstName}!</span>
                            </h1>

                            <p className="premium-welcome-subtitle">
                                Great to see you again at CoralHub.
                                <br />
                                <strong>
                                    ★ Let’s continue exploring the ocean together.
                                </strong>
                            </p>
                        </>
                    )}

                    {/* Stats */}
                    <div className="welcome-stats-grid">

                        {isAdmin ? (
                            <>
                                <Link to="/admin/dashboard" className="welcome-stat-card member-card gold-aquarist-card">
                                    <div className="stat-icon gold">⚙️</div>

                                    <div className="gold-aquarist-content">
                                        <h3>Admin Panel</h3>
                                        <p>Control Center</p>

                                        <div className="level-bar">
                                            <div></div>
                                        </div>

                                        <span className="rewards-text">
                                            Full platform access
                                        </span>
                                        <span className="view-rewards">
                                            Go to Dashboard →
                                        </span>
                                    </div>
                                </Link>

                                <Link to="/addproduct" className="welcome-stat-card">
                                    <div className="stat-icon purple">📦</div>

                                    <div>
                                        <h3>Products</h3>
                                        <p>Manage Catalog</p>
                                        <span>Add or edit products</span>
                                    </div>
                                </Link>

                                <Link to="/admin/orders" className="welcome-stat-card">
                                    <div className="stat-icon green">🧾</div>

                                    <div>
                                        <h3>Orders</h3>
                                        <p>Manage Orders</p>
                                        <span>Update order status</span>
                                    </div>
                                </Link>

                                <Link to="/admin/tickets" className="welcome-stat-card">
                                    <div className="stat-icon orange">🎟️</div>

                                    <div>
                                        <h3>Tickets</h3>
                                        <p>Support Center</p>
                                        <span className="orange-text">Review open cases</span>
                                    </div>
                                </Link>
                            </>
                        ) : (
                            <>
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

                                <Link
                                    to="/rewards"
                                    className="welcome-stat-card member-card gold-aquarist-card"
                                >
                                    <div className="stat-icon gold">👑</div>

                                    <div className="gold-aquarist-content">
                                        <h3>Gold Aquarist</h3>
                                        <p>65% to Platinum</p>

                                        <div className="level-bar">
                                            <div></div>
                                        </div>

                                        <span className="rewards-text">
                                            🎁 2 Rewards Available
                                        </span>
                                        <span className="view-rewards">
                                            View Rewards →
                                        </span>
                                    </div>
                                </Link>
                            </>
                        )}

                    </div>
                </div>

                {/* Right visual side */}
                <div className="welcome-visual">
                    {isAdmin ? (
                        <>
                            <div className="fish fish-one">📊</div>
                            <div className="fish fish-two">⚙️</div>
                            <div className="coral coral-one"></div>
                            <div className="coral coral-two"></div>
                            <div className="coral coral-three"></div>
                        </>
                    ) : (
                        <>
                            <div className="fish fish-one">🐠</div>
                            <div className="fish fish-two">🐟</div>
                            <div className="coral coral-one"></div>
                            <div className="coral coral-two"></div>
                            <div className="coral coral-three"></div>
                        </>
                    )}
                </div>

            </section>

            {/* Action Cards */}
            <section className="premium-actions">

                {isAdmin ? (
                    <>
                        <Link to="/admin/dashboard" className="premium-action-card browse-card">
                            <div className="action-icon blue">⚙️</div>

                            <div>
                                <h2>Admin Dashboard</h2>
                                <p>Manage platform activity, users, tickets and store data.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        <Link to="/addproduct" className="premium-action-card cart-card">
                            <div className="action-icon teal">📦</div>

                            <div>
                                <h2>Manage Products</h2>
                                <p>Add new aquarium products to the CoralHub catalog.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>

                        <Link to="/admin/orders" className="premium-action-card profile-2-card">
                            <div className="action-icon violet">🧾</div>

                            <div>
                                <h2>Manage Orders</h2>
                                <p>Review customer orders and update order status.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>
                    </>
                ) : (
                    <>
                        <Link to="/catalog" className="premium-action-card browse-card">
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

                        <Link to="/profile" className="premium-action-card profile-2-card">
                            <div className="action-icon violet">👤</div>

                            <div>
                                <h2>My Profile</h2>
                                <p>Manage your account and preferences.</p>
                            </div>

                            <span className="action-arrow">→</span>
                        </Link>
                    </>
                )}

            </section>

            {/* Main CTA */}
            <div className="premium-cta-wrapper">
                {isAdmin ? (
                    <Link to="/admin/dashboard" className="premium-start-btn">
                        <span>⚙️</span>
                        Open Admin Dashboard
                        <span>→</span>
                    </Link>
                ) : (
                    <Link to="/catalog" className="premium-start-btn">
                        <span>✨</span>
                        Start Shopping
                        <span>→</span>
                    </Link>
                )}
            </div>

        </main>
    );
};