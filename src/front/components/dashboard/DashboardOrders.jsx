import React from "react";

export const DashboardOrders = () => {

    const orders = [
        {
            id: 1,
            customer: "John D.",
            total: "$250",
            status: "Pending"
        },

        {
            id: 2,
            customer: "Sarah W.",
            total: "$180",
            status: "Paid"
        }
    ];

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>Recent Orders</h2>

                <button className="section-btn">
                    View all
                </button>

            </div>

            <div className="orders-list">

                {orders.map(order => (

                    <div
                        key={order.id}
                        className="order-row"
                    >

                        <div>

                            <h5>{order.customer}</h5>

                            <p>{order.total}</p>

                        </div>

                        <div className={`product-status ${order.status.toLowerCase()}`}>
                            {order.status}
                        </div>

                    </div>

                ))}

            </div>

        </section>

    );
};