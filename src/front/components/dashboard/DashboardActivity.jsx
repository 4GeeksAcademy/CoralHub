import React from "react";

export const DashboardActivity = () => {

    const activities = [

        {
            id: 1,
            text: 'Someone viewed your "Holy Grail Torch" listing',
            time: "10 min"
        },

        {
            id: 2,
            text: 'Your "Rainbow Bubble Tip" product was purchased',
            time: "1 h"
        },

        {
            id: 3,
            text: 'You received a new message from John D.',
            time: "3 h"
        },

        {
            id: 4,
            text: "Order #1232 has been shipped",
            time: "5 h"
        }

    ];

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Recent Activity</h2>

            </div>

            <div className="activity-list">

                {activities.map(activity => (

                    <div
                        key={activity.id}
                        className="activity-row"
                    >

                        <div className="activity-content">

                            <div className="activity-icon"></div>

                            <p>{activity.text}</p>

                        </div>

                        <span className="activity-time">
                            {activity.time}
                        </span>

                    </div>

                ))}

            </div>

            <button className="activity-btn">
                View all activity
            </button>

        </section>
    );
};