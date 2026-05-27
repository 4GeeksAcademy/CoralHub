import React from "react";

export const DashboardProducts = () => {

    const products = [
        {
            id: 1,
            name: "Holy Grail Torch",
            price: "$250",
            stock: 2,
            status: "Active"
        },

        {
            id: 2,
            name: "Rainbow Bubble Tip",
            price: "$180",
            stock: 3,
            status: "Active"
        },

        {
            id: 3,
            name: "Green Brain Coral",
            price: "$120",
            stock: 1,
            status: "Pending"
        }
    ];

    return (

        <section className="dashboard-section">

            <div className="section-header">

                <h2>My Products</h2>

                <button className="section-btn">
                    View all
                </button>

            </div>

            <div className="products-table">

                {products.map(product => (

                    <div
                        key={product.id}
                        className="product-row"
                    >

                        <div className="product-info">

                            <div className="product-image"></div>

                            <div>

                                <h3>{product.name}</h3>

                                <p>{product.price}</p>

                            </div>

                        </div>

                        <div className="product-stock">
                            Stock: {product.stock}
                        </div>

                        <div className={`product-status ${product.status.toLowerCase()}`}>
                            {product.status}
                        </div>

                    </div>

                ))}

            </div>

        </section>

    );
};