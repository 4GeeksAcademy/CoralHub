import React, { useEffect, useState } from "react";

export const DashboardActivity = () => {

    const [activities, setActivities] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("token");

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/my-products`, {

            method: "GET",

            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }

        })

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Could not load activity");
                }

                return response.json();
            })

            .then((products) => {

                const generatedActivities = [];

                products.forEach(product => {

                    generatedActivities.push({

                        id: `created-${product.id}`,

                        icon: "📦",

                        text: `${product.name} was published`,

                        time: new Date(
                            product.created_at
                        ).toLocaleDateString()
                    });

                    if (product.stock === 0) {

                        generatedActivities.push({

                            id: `soldout-${product.id}`,

                            icon: "🔥",

                            text: `${product.name} is sold out`,

                            time: "Stock update"
                        });
                    }

                    if (product.status === "inactive") {

                        generatedActivities.push({

                            id: `inactive-${product.id}`,

                            icon: "⏸",

                            text: `${product.name} was deactivated`,

                            time: "Status update"
                        });
                    }

                });

                setActivities(
                    generatedActivities.slice(0, 4)
                );

                setLoading(false);

            })

            .catch((error) => {

                console.error(error);

                setLoading(false);
            });

    }, []);

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Recent Activity</h2>

                <button className="section-btn">
                    View all activity
                </button>

            </div>

            <div className="activity-list">

                {loading ? (

                    <p className="dashboard-message">
                        Loading activity...
                    </p>

                ) : activities.length === 0 ? (

                    <p className="dashboard-message">
                        No activity yet.
                    </p>

                ) : (

                    activities.map(activity => (

                        <div
                            key={activity.id}
                            className="activity-row"
                        >

                            <div className="activity-icon">

                                {activity.icon}

                            </div>

                            <div className="activity-content">

                                <p>
                                    {activity.text}
                                </p>

                            </div>

                            <span className="activity-time">

                                {activity.time}

                            </span>

                        </div>

                    ))

                )}

            </div>

        </section>
    );
};