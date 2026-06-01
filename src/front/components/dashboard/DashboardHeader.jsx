import React from "react";
import { Link } from "react-router-dom";

export const DashboardHeader = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (

        <div className="dashboard-header">

            <div>
                <h1 className="dashboard-title">
                    Welcome back, {user.first_name}!
                </h1>

                <p className="dashboard-subtitle">
                    Here's your CoralHub activity overview.
                </p>
            </div>

            <Link
                to="/addproduct"
                className="publish-btn"
            >
                Publish Product
            </Link>

        </div>

    );
};