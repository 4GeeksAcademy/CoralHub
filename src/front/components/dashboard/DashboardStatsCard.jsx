import React from "react";

export const DashboardStatsCard = ({
    title,
    value,
    subtitle
}) => {

    return (

        <div className="stats-card">

            <div>

                <h3 className="stats-title">
                    {title}
                </h3>

                <h2 className="stats-value">
                    {value}
                </h2>

                <p className="stats-subtitle">
                    {subtitle}
                </p>

            </div>

        </div>

    );
};