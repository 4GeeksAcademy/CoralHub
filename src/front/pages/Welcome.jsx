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

    if (isAdmin) {
        return (
            <main className="admin-simple-page">
                <style>{`
                    .admin-simple-page {
                        min-height: 100vh;
                        padding: 70px 7% 80px;
                        color: white;
                        position: relative;
                        overflow: hidden;
                        background:
                            linear-gradient(90deg, rgba(2, 10, 25, 0.96), rgba(2, 10, 25, 0.86), rgba(2, 10, 25, 0.92)),
                            url("https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=1800&q=80");
                        background-size: cover;
                        background-position: center;
                    }

                    .admin-simple-page::before {
                        content: "";
                        position: absolute;
                        inset: 0;
                        background:
                            radial-gradient(circle at 18% 22%, rgba(68, 255, 230, 0.18), transparent 26%),
                            radial-gradient(circle at 82% 20%, rgba(255, 99, 71, 0.20), transparent 28%),
                            radial-gradient(circle at 75% 80%, rgba(160, 90, 255, 0.20), transparent 28%);
                        pointer-events: none;
                    }

                    .admin-simple-shell {
                        position: relative;
                        z-index: 2;
                        max-width: 1450px;
                        margin: 0 auto;
                    }

                    .admin-coral-decoration-left,
                    .admin-coral-decoration-right {
                        position: absolute;
                        font-size: 180px;
                        opacity: 0.16;
                        z-index: 1;
                        pointer-events: none;
                        filter: drop-shadow(0 0 30px rgba(80, 255, 230, 0.3));
                    }

                    .admin-coral-decoration-left {
                        left: -35px;
                        bottom: 30px;
                    }

                    .admin-coral-decoration-right {
                        right: -30px;
                        top: 130px;
                    }

                    .admin-simple-hero {
                        max-width: 900px;
                        margin-bottom: 36px;
                    }

                    .admin-simple-badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px 18px;
                        border-radius: 999px;
                        background: rgba(81, 255, 229, 0.12);
                        color: #64ffea;
                        border: 1px solid rgba(81, 255, 229, 0.28);
                        font-size: 13px;
                        font-weight: 900;
                        letter-spacing: 1px;
                        text-transform: uppercase;
                        margin-bottom: 18px;
                    }

                    .admin-simple-title {
                        font-size: clamp(48px, 6vw, 82px);
                        line-height: 0.98;
                        letter-spacing: -4px;
                        font-weight: 950;
                        margin: 0 0 18px;
                    }

                    .admin-simple-title span {
                        display: block;
                        background: linear-gradient(90deg, #5fffea, #57a7ff, #b579ff);
                        -webkit-background-clip: text;
                        background-clip: text;
                        color: transparent;
                    }

                    .admin-simple-subtitle {
                        max-width: 650px;
                        color: #d7e3f5;
                        font-size: 18px;
                        line-height: 1.7;
                        margin-bottom: 28px;
                    }

                    .admin-simple-subtitle strong {
                        color: #5fffea;
                    }

                    .admin-simple-actions {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 15px;
                    }

                    .admin-simple-primary,
                    .admin-simple-secondary {
                        text-decoration: none;
                        border-radius: 16px;
                        padding: 14px 22px;
                        font-weight: 900;
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        transition: 0.25s ease;
                    }

                    .admin-simple-primary {
                        color: #02111f;
                        background: linear-gradient(135deg, #5fffea, #63b7ff);
                        box-shadow: 0 18px 50px rgba(95, 255, 234, 0.25);
                    }

                    .admin-simple-secondary {
                        color: white;
                        background: rgba(255, 255, 255, 0.08);
                        border: 1px solid rgba(255, 255, 255, 0.16);
                    }

                    .admin-simple-primary:hover,
                    .admin-simple-secondary:hover {
                        transform: translateY(-4px);
                    }

                    .admin-simple-stats {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 20px;
                        margin-bottom: 24px;
                    }

                    .admin-simple-card {
                        text-decoration: none;
                        color: white;
                        min-height: 170px;
                        border-radius: 26px;
                        padding: 24px;
                        background: rgba(4, 20, 43, 0.76);
                        border: 1px solid rgba(255,255,255,0.13);
                        backdrop-filter: blur(18px);
                        box-shadow: 0 22px 65px rgba(0,0,0,0.30);
                        position: relative;
                        overflow: hidden;
                        transition: 0.25s ease;
                    }

                    .admin-simple-card:hover {
                        transform: translateY(-6px);
                        border-color: rgba(95,255,234,0.55);
                    }

                    .admin-simple-card::after {
                        content: "🪸";
                        position: absolute;
                        right: 18px;
                        bottom: 12px;
                        font-size: 54px;
                        opacity: 0.16;
                    }

                    .admin-simple-icon {
                        width: 52px;
                        height: 52px;
                        display: grid;
                        place-items: center;
                        border-radius: 17px;
                        font-size: 23px;
                        margin-bottom: 16px;
                    }

                    .admin-simple-icon.teal {
                        background: rgba(95,255,234,0.14);
                        color: #5fffea;
                    }

                    .admin-simple-icon.blue {
                        background: rgba(87,167,255,0.16);
                        color: #63b7ff;
                    }

                    .admin-simple-icon.purple {
                        background: rgba(181,121,255,0.16);
                        color: #c79cff;
                    }

                    .admin-simple-icon.orange {
                        background: rgba(255,120,85,0.16);
                        color: #ff9b72;
                    }

                    .admin-simple-card h3 {
                        font-size: 21px;
                        margin: 0 0 5px;
                    }

                    .admin-simple-card p {
                        color: #b6c6dc;
                        margin: 0;
                    }

                    .admin-simple-number {
                        font-size: 34px;
                        font-weight: 950;
                        margin: 10px 0 5px;
                    }

                    .admin-up {
                        color: #5fffea !important;
                        font-weight: 900;
                    }

                    .admin-down {
                        color: #ff9b72 !important;
                        font-weight: 900;
                    }

                    .admin-simple-grid {
                        display: grid;
                        grid-template-columns: 1.1fr 0.9fr;
                        gap: 24px;
                        margin-bottom: 24px;
                    }

                    .admin-simple-panel {
                        border-radius: 28px;
                        padding: 26px;
                        background: rgba(4, 20, 43, 0.78);
                        border: 1px solid rgba(255,255,255,0.13);
                        backdrop-filter: blur(18px);
                        box-shadow: 0 22px 65px rgba(0,0,0,0.30);
                    }

                    .admin-simple-panel-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        gap: 15px;
                        margin-bottom: 22px;
                    }

                    .admin-simple-panel h2 {
                        margin: 0;
                        font-size: 26px;
                    }

                    .admin-simple-panel p {
                        color: #b6c6dc;
                        margin: 5px 0 0;
                    }

                    .admin-chip {
                        padding: 9px 14px;
                        border-radius: 999px;
                        background: rgba(255,255,255,0.08);
                        border: 1px solid rgba(255,255,255,0.12);
                        color: #dce8f9;
                        font-size: 13px;
                        font-weight: 800;
                    }

                    .admin-simple-metrics {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 12px;
                        margin-bottom: 22px;
                    }

                    .admin-simple-metric {
                        padding: 16px;
                        border-radius: 18px;
                        background: rgba(255,255,255,0.055);
                        border: 1px solid rgba(255,255,255,0.09);
                    }

                    .admin-simple-metric span {
                        color: #a9bad0;
                        font-size: 13px;
                    }

                    .admin-simple-metric strong {
                        display: block;
                        margin: 7px 0;
                        font-size: 25px;
                    }

                    .admin-simple-chart {
                        height: 150px;
                        border-radius: 20px;
                        position: relative;
                        overflow: hidden;
                        background:
                            linear-gradient(180deg, rgba(95,255,234,0.12), transparent),
                            repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 30px);
                    }

                    .admin-simple-chart svg {
                        width: 100%;
                        height: 100%;
                        position: absolute;
                        inset: 0;
                    }

                    .admin-quick-actions {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 14px;
                    }

                    .admin-quick-action {
                        text-decoration: none;
                        color: white;
                        padding: 18px;
                        border-radius: 20px;
                        background: rgba(255,255,255,0.06);
                        border: 1px solid rgba(255,255,255,0.10);
                        display: flex;
                        gap: 14px;
                        align-items: center;
                        transition: 0.25s ease;
                    }

                    .admin-quick-action:hover {
                        transform: translateY(-4px);
                        border-color: rgba(95,255,234,0.55);
                    }

                    .admin-quick-icon {
                        width: 46px;
                        height: 46px;
                        border-radius: 15px;
                        display: grid;
                        place-items: center;
                        background: rgba(95,255,234,0.13);
                        font-size: 22px;
                    }

                    .admin-quick-action h3 {
                        margin: 0 0 4px;
                        font-size: 17px;
                    }

                    .admin-quick-action p {
                        margin: 0;
                        font-size: 13px;
                    }

                    .admin-activity-panel {
                        border-radius: 28px;
                        padding: 26px;
                        background: rgba(4, 20, 43, 0.80);
                        border: 1px solid rgba(255,255,255,0.13);
                        backdrop-filter: blur(18px);
                        box-shadow: 0 22px 65px rgba(0,0,0,0.30);
                    }

                    .admin-activity-header {
                        display: flex;
                        justify-content: space-between;
                        gap: 15px;
                        align-items: center;
                        margin-bottom: 18px;
                    }

                    .admin-activity-header h2 {
                        margin: 0;
                        font-size: 25px;
                    }

                    .admin-activity-header p {
                        color: #b6c6dc;
                        margin: 5px 0 0;
                    }

                    .admin-activity-list {
                        display: grid;
                        gap: 12px;
                    }

                    .admin-activity-row {
                        display: grid;
                        grid-template-columns: 46px 1fr 120px 115px;
                        gap: 14px;
                        align-items: center;
                        padding: 14px;
                        border-radius: 18px;
                        background: rgba(255,255,255,0.045);
                        border: 1px solid rgba(255,255,255,0.08);
                    }

                    .admin-row-icon {
                        width: 40px;
                        height: 40px;
                        border-radius: 14px;
                        display: grid;
                        place-items: center;
                        background: rgba(95,255,234,0.12);
                    }

                    .admin-activity-row p {
                        margin: 0;
                    }

                    .admin-activity-row span {
                        color: #b6c6dc;
                        font-size: 13px;
                    }

                    .admin-tag {
                        padding: 7px 10px;
                        border-radius: 999px;
                        font-size: 12px;
                        font-weight: 900;
                        text-align: center;
                    }

                    .tag-product {
                        color: #5fffea;
                        background: rgba(95,255,234,0.11);
                    }

                    .tag-order {
                        color: #63b7ff;
                        background: rgba(99,183,255,0.12);
                    }

                    .tag-user {
                        color: #c79cff;
                        background: rgba(199,156,255,0.13);
                    }

                    .tag-ticket {
                        color: #ff9b72;
                        background: rgba(255,155,114,0.13);
                    }

                    @media (max-width: 1100px) {
                        .admin-simple-stats,
                        .admin-simple-metrics {
                            grid-template-columns: repeat(2, 1fr);
                        }

                        .admin-simple-grid {
                            grid-template-columns: 1fr;
                        }

                        .admin-activity-row {
                            grid-template-columns: 46px 1fr;
                        }

                        .admin-activity-row span,
                        .admin-tag {
                            grid-column: 2;
                        }
                    }

                    @media (max-width: 700px) {
                        .admin-simple-page {
                            padding: 45px 5% 60px;
                        }

                        .admin-simple-title {
                            font-size: 45px;
                            letter-spacing: -2px;
                        }

                        .admin-simple-stats,
                        .admin-simple-metrics,
                        .admin-quick-actions {
                            grid-template-columns: 1fr;
                        }

                        .admin-coral-decoration-left,
                        .admin-coral-decoration-right {
                            font-size: 120px;
                        }
                    }
                `}</style>

                <div className="admin-coral-decoration-left">🪸</div>
                <div className="admin-coral-decoration-right">🪸</div>

                <div className="admin-simple-shell">

                    <section className="admin-simple-hero">
                        <div className="admin-simple-badge">
                            🛡️ Admin Control Center
                        </div>

                        <h1 className="admin-simple-title">
                            CoralHub Admin
                            <span>Reef Control Center</span>
                        </h1>

                        <p className="admin-simple-subtitle">
                            Welcome back, <strong>Admin {firstName}</strong>.
                            Manage products, orders, users, claims and support tickets
                            from your premium coral command center.
                        </p>

                        <div className="admin-simple-actions">
                            <Link to="/admin/dashboard" className="admin-simple-primary">
                                ▦ Open Dashboard
                            </Link>

                            <Link to="/addproduct" className="admin-simple-secondary">
                                ✚ Add Product
                            </Link>

                            <Link to="/admin/orders" className="admin-simple-secondary">
                                ▣ Orders
                            </Link>
                        </div>
                    </section>

                    <section className="admin-simple-stats">

                        <Link to="/addproduct" className="admin-simple-card">
                            <div className="admin-simple-icon teal">📦</div>
                            <h3>Products</h3>
                            <p>Total Products</p>
                            <div className="admin-simple-number">1,248</div>
                            <span className="admin-up">↑ 12.5% vs last month</span>
                        </Link>

                        <Link to="/admin/orders" className="admin-simple-card">
                            <div className="admin-simple-icon blue">🛒</div>
                            <h3>Orders</h3>
                            <p>Total Orders</p>
                            <div className="admin-simple-number">892</div>
                            <span className="admin-up">↑ 8.3% vs last month</span>
                        </Link>

                        <Link to="/admin/users" className="admin-simple-card">
                            <div className="admin-simple-icon purple">👥</div>
                            <h3>Users</h3>
                            <p>Total Users</p>
                            <div className="admin-simple-number">2,341</div>
                            <span className="admin-up">↑ 15.2% vs last month</span>
                        </Link>

                        <Link to="/admin/tickets" className="admin-simple-card">
                            <div className="admin-simple-icon orange">🎟️</div>
                            <h3>Tickets</h3>
                            <p>Open Tickets</p>
                            <div className="admin-simple-number">47</div>
                            <span className="admin-down">↓ 6.7% vs last month</span>
                        </Link>

                    </section>

                    <section className="admin-simple-grid">

                        <div className="admin-simple-panel">
                            <div className="admin-simple-panel-header">
                                <div>
                                    <h2>🪸 Reef Overview</h2>
                                    <p>Marketplace performance at a glance</p>
                                </div>

                                <span className="admin-chip">This Month</span>
                            </div>

                            <div className="admin-simple-metrics">
                                <div className="admin-simple-metric">
                                    <span>Total Revenue</span>
                                    <strong>$24,580</strong>
                                    <small className="admin-up">↑ 18.6%</small>
                                </div>

                                <div className="admin-simple-metric">
                                    <span>Completed Orders</span>
                                    <strong>768</strong>
                                    <small className="admin-up">↑ 10.4%</small>
                                </div>

                                <div className="admin-simple-metric">
                                    <span>New Users</span>
                                    <strong>356</strong>
                                    <small className="admin-up">↑ 22.1%</small>
                                </div>

                                <div className="admin-simple-metric">
                                    <span>Conversion Rate</span>
                                    <strong>3.62%</strong>
                                    <small className="admin-up">↑ 9.3%</small>
                                </div>
                            </div>

                            <div className="admin-simple-chart">
                                <svg viewBox="0 0 800 180" preserveAspectRatio="none">
                                    <polyline
                                        points="20,135 100,112 180,82 260,105 340,72 420,118 500,86 580,94 660,62 780,36"
                                        fill="none"
                                        stroke="#5fffea"
                                        strokeWidth="6"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <polyline
                                        points="20,135 100,112 180,82 260,105 340,72 420,118 500,86 580,94 660,62 780,36 780,180 20,180"
                                        fill="rgba(95,255,234,0.12)"
                                        stroke="none"
                                    />
                                </svg>
                            </div>
                        </div>

                        <div className="admin-simple-panel">
                            <div className="admin-simple-panel-header">
                                <div>
                                    <h2>⚡ Quick Actions</h2>
                                    <p>Frequently used admin actions</p>
                                </div>
                            </div>

                            <div className="admin-quick-actions">

                                <Link to="/addproduct" className="admin-quick-action">
                                    <div className="admin-quick-icon">🪸</div>

                                    <div>
                                        <h3>Add Product</h3>
                                        <p>Create a new product</p>
                                    </div>
                                </Link>

                                <Link to="/admin/orders" className="admin-quick-action">
                                    <div className="admin-quick-icon">📋</div>

                                    <div>
                                        <h3>Manage Orders</h3>
                                        <p>View customer orders</p>
                                    </div>
                                </Link>

                                <Link to="/admin/users" className="admin-quick-action">
                                    <div className="admin-quick-icon">👥</div>

                                    <div>
                                        <h3>View Users</h3>
                                        <p>Manage platform users</p>
                                    </div>
                                </Link>

                                <Link to="/admin/tickets" className="admin-quick-action">
                                    <div className="admin-quick-icon">🎟️</div>

                                    <div>
                                        <h3>Open Tickets</h3>
                                        <p>Review support cases</p>
                                    </div>
                                </Link>

                            </div>
                        </div>

                    </section>

                    <section className="admin-activity-panel">

                        <div className="admin-activity-header">
                            <div>
                                <h2>Recent Activity</h2>
                                <p>Latest admin activities and system events</p>
                            </div>

                            <span className="admin-chip">View All Activity →</span>
                        </div>

                        <div className="admin-activity-list">

                            <div className="admin-activity-row">
                                <div className="admin-row-icon">📦</div>
                                <p>New product “Ultra Green Acropora” was created.</p>
                                <span>Admin Juan</span>
                                <div className="admin-tag tag-product">Product</div>
                            </div>

                            <div className="admin-activity-row">
                                <div className="admin-row-icon">🧾</div>
                                <p>Order #CH-9842 was marked as completed.</p>
                                <span>Admin Juan</span>
                                <div className="admin-tag tag-order">Order</div>
                            </div>

                            <div className="admin-activity-row">
                                <div className="admin-row-icon">👥</div>
                                <p>New user “ReefLover23” registered.</p>
                                <span>Admin Juan</span>
                                <div className="admin-tag tag-user">User</div>
                            </div>

                            <div className="admin-activity-row">
                                <div className="admin-row-icon">🎟️</div>
                                <p>Ticket #T-5521 was updated.</p>
                                <span>Admin Juan</span>
                                <div className="admin-tag tag-ticket">Ticket</div>
                            </div>

                        </div>
                    </section>

                </div>
            </main>
        );
    }

    return (
        <main className="premium-welcome-page">

            <div className="ocean-glow ocean-glow-one"></div>
            <div className="ocean-glow ocean-glow-two"></div>
            <div className="ocean-glow ocean-glow-three"></div>

            <div className="floating-bubble bubble-one"></div>
            <div className="floating-bubble bubble-two"></div>
            <div className="floating-bubble bubble-three"></div>
            <div className="floating-bubble bubble-four"></div>

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
                        <strong>
                            ★ Let’s continue exploring the ocean together.
                        </strong>
                    </p>

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

                    </div>
                </div>

                <div className="welcome-visual">
                    <div className="fish fish-one">🐠</div>
                    <div className="fish fish-two">🐟</div>
                    <div className="coral coral-one"></div>
                    <div className="coral coral-two"></div>
                    <div className="coral coral-three"></div>
                </div>

            </section>

            <section className="premium-actions">

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

            </section>

            <div className="premium-cta-wrapper">
                <Link to="/catalog" className="premium-start-btn">
                    <span>✨</span>
                    Start Shopping
                    <span>→</span>
                </Link>
            </div>

        </main>
    );
};