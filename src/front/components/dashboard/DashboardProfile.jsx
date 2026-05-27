import React from "react";

export const DashboardProfile = () => {

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Personal Information</h2>

                <button className="section-btn">
                    Edit
                </button>

            </div>

            <div className="profile-card">

                <div className="profile-avatar">
                    AM
                </div>

                <div className="profile-info">

                    <div className="profile-row">
                        <span>Full Name</span>
                        <strong>Ana Martinez</strong>
                    </div>

                    <div className="profile-row">
                        <span>Email</span>
                        <strong>ana@email.com</strong>
                    </div>

                    <div className="profile-row">
                        <span>Location</span>
                        <strong>Miami, Florida</strong>
                    </div>

                </div>

            </div>

        </section>

    );
};