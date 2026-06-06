import React, { useState, useEffect} from "react";

export const DashboardSidebar = ({
    activeSection,
    setActiveSection
}) => {

    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {

        const loadUnreadCount = async () => {

            try {

                const token = localStorage.getItem("token");

                if (!token) return;

                const response = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/messages/unread-count`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                setUnreadCount(data.unread_count);

            } catch (error) {

                console.error(error);

            }

        };

        loadUnreadCount();

        const interval = setInterval(
            loadUnreadCount,
            10000
        );

        return () => clearInterval(interval);

    }, []);
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    const firstName = user.first_name || "";
    const lastName = user.last_name || "";

    const fullName = `${firstName} ${lastName}`.trim();

    const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

    return (

        <aside className="dashboard-sidebar">

            <div className="dashboard-user">

                <div className="dashboard-avatar">
                    {initials || "U"}
                </div>

                <h3>
                    {fullName || "User"}
                </h3>

                <p>
                    {user.email || "No email available"}
                </p>

            </div>

            <nav className="dashboard-nav">

                <button
                    className={`dashboard-link ${activeSection === "overview" ? "active" : ""}`}
                    onClick={() => setActiveSection("overview")}
                >
                    Overview
                </button>

                <button
                    className={`dashboard-link ${activeSection === "profile" ? "active" : ""}`}
                    onClick={() => setActiveSection("profile")}
                >
                    Profile
                </button>

                <button
                    className={`dashboard-link ${activeSection === "products" ? "active" : ""}`}
                    onClick={() => setActiveSection("products")}
                >
                    My Products
                </button>

                <button
                    className={`dashboard-link ${activeSection === "orders" ? "active" : ""}`}
                    onClick={() => setActiveSection("orders")}
                >
                    My Orders
                </button>

                <button
                    className={`dashboard-link ${activeSection === "favorites" ? "active" : ""}`}
                    onClick={() => setActiveSection("favorites")}
                >
                    Favorites
                </button>

                <button
                    className={`dashboard-link ${activeSection === "messages"
                            ? "active"
                            : ""
                        }`}
                    onClick={() => setActiveSection("messages")}
                >

                    <div className="dashboard-link-content">

                        <span>
                            My Messages
                        </span>

                        {unreadCount > 0 && (

                            <span className="notification-badge">
                                {unreadCount}
                            </span>

                        )}

                    </div>

                </button>

                <button
                    className={`dashboard-link ${activeSection === "activity" ? "active" : ""}`}
                    onClick={() => setActiveSection("activity")}
                >
                    Recent Activity
                </button>

            </nav>

        </aside>
    );
};