import React from "react";

export const DashboardSidebar = ({
    activeSection,
    setActiveSection
}) => {

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
                    className={`dashboard-link ${activeSection === "activity" ? "active" : ""}`}
                    onClick={() => setActiveSection("activity")}
                >
                    Recent Activity
                </button>

            </nav>

        </aside>
    );
};