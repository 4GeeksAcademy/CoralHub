import React from "react";

export const TopSellers = () => {

    return (

        <section className="sellers-section py-5">

            <div className="container py-5">

                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

                    <div>

                        <h2 className="sellers-title">
                            Top rated <span>sellers</span>
                        </h2>

                    </div>

                    <button className="sellers-view-btn">
                        View all →
                    </button>

                </div>

                <div className="row g-4">

                    {/* CARD 1 */}

                    <div className="col-12 col-md-6 col-xl-3">

                        <div className="seller-card">

                            <div className="seller-avatar">
                                👤
                            </div>

                            <h3 className="seller-name">
                                ReefMaster
                            </h3>

                            <p className="seller-rating">
                                ⭐ 4.9 (128)
                            </p>

                            <p className="seller-sales">
                                542 sales
                            </p>

                            <button className="seller-btn">
                                View Store
                            </button>

                        </div>

                    </div>

                    {/* CARD 2 */}

                    <div className="col-12 col-md-6 col-xl-3">

                        <div className="seller-card">

                            <div className="seller-avatar">
                                👤
                            </div>

                            <h3 className="seller-name">
                                Coral Pro
                            </h3>

                            <p className="seller-rating">
                                ⭐ 4.8 (97)
                            </p>

                            <p className="seller-sales">
                                376 sales
                            </p>

                            <button className="seller-btn">
                                View Store
                            </button>

                        </div>

                    </div>

                    {/* CARD 3 */}

                    <div className="col-12 col-md-6 col-xl-3">

                        <div className="seller-card">

                            <div className="seller-avatar">
                                👤
                            </div>

                            <h3 className="seller-name">
                                Reef Tech
                            </h3>

                            <p className="seller-rating">
                                ⭐ 4.7 (62)
                            </p>

                            <p className="seller-sales">
                                281 sales
                            </p>

                            <button className="seller-btn">
                                View Store
                            </button>

                        </div>

                    </div>

                    {/* CARD 4 */}

                    <div className="col-12 col-md-6 col-xl-3">

                        <div className="seller-card">

                            <div className="seller-avatar">
                                👤
                            </div>

                            <h3 className="seller-name">
                                AquaWorld
                            </h3>

                            <p className="seller-rating">
                                ⭐ 5.0 (156)
                            </p>

                            <p className="seller-sales">
                                712 sales
                            </p>

                            <button className="seller-btn">
                                View Store
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </section>

    );
};