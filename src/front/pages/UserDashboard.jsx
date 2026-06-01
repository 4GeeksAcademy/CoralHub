import React, { useState } from "react";

import { DashboardSidebar } from "../components/dashboard/DashboardSidebar";
import { DashboardHeader } from "../components/dashboard/DashboardHeader";
import { DashboardStatsCard } from "../components/dashboard/DashboardStatsCard";
import { DashboardProducts } from "../components/dashboard/DashboardProducts";
import { DashboardOrders } from "../components/dashboard/DashboardOrders";
import { DashboardProfile } from "../components/dashboard/DashboardProfile";
import { DashboardActivity } from "../components/dashboard/DashboardActivity";

export const UserDashboard = () => {

    const [activeSection, setActiveSection] = useState("overview");

    return (

        <div className="dashboard-layout">

            <DashboardSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            <main className="dashboard-main">

                <div className="dashboard-container">

                    <DashboardHeader />

                    <div className="dashboard-content">

                        {activeSection === "overview" && (
                            <>
                                <section className="dashboard-stats-grid">

                                    <DashboardStatsCard
                                        title="Active Products"
                                        value="12"
                                        subtitle="2 new this week"
                                    />

                                    <DashboardStatsCard
                                        title="Orders"
                                        value="4"
                                        subtitle="2 pending"
                                    />

                                    <DashboardStatsCard
                                        title="Revenue"
                                        value="$1,240"
                                        subtitle="+18% this month"
                                    />

                                    <DashboardStatsCard
                                        title="Favorites"
                                        value="23"
                                        subtitle="Saved products"
                                    />

                                </section>

                                <div className="dashboard-dual-grid">

                                    <DashboardProducts
                                        setActiveSection={setActiveSection}
                                    />

                                    <DashboardOrders />

                                </div>

                                <div className="dashboard-bottom-grid">

                                    <DashboardActivity />

                                </div>
                            </>
                        )}

                        {activeSection === "profile" && (
                            <DashboardProfile />
                        )}

                        {activeSection === "products" && (
                            <DashboardProducts />
                        )}

                        {activeSection === "orders" && (
                            <DashboardOrders />
                        )}

                        {activeSection === "activity" && (
                            <DashboardActivity />
                        )}

                    </div>

                </div>

            </main>

        </div>
    );
};