import React from "react";

export const DashboardHeader = () => {

    return (

        <div className="dashboard-header">

            <div>
                <h1 className="dashboard-title">
                    Welcome back, Ana!
                </h1>

                <p className="dashboard-subtitle">
                    Here's your CoralHub activity overview.
                </p>
            </div>

            <button className="publish-btn">
                + Publish Product
            </button>

        </div>

    );
};