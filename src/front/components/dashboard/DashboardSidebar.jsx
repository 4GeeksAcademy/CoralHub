import React from "react";
import { Link } from "react-router-dom";

export const DashboardSidebar = () => {

    return (

        <aside className="dashboard-sidebar">

            {/* <div className="dashboard-logo">
                Coral<span>Hub</span>
            </div> */}

            <div className="dashboard-user">

                <div className="dashboard-avatar">
                    AM
                </div>

                <h3>Ana Martinez</h3>

                <p>☆ Pro Seller</p>

            </div>

            <nav className="dashboard-nav">

                <Link to="/profile" className="dashboard-link active">
                    Profile
                </Link>

                <Link to="/products" className="dashboard-link">
                    My Products
                </Link>

                <Link to="/orders" className="dashboard-link">
                    My Orders
                </Link>

                <Link to="/messages" className="dashboard-link">
                    Messages
                </Link>

                <Link to="/favorites" className="dashboard-link">
                    Favorites
                </Link>

                {/* <Link to="/settings" className="dashboard-link">
                    Settings
                </Link> */}

            </nav>

        </aside>

    );
};