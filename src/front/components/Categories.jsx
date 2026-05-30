import React from "react";
import CoralIcon from "../assets/img/Coral-icon.svg";
import { Link } from "react-router-dom";

import {
    Wrench,
    Fish,
    Lightbulb,
    Recycle
} from "lucide-react";

export const Categories = () => {

    return (

        <section className="categories-section py-5">

            <div className="container py-5">

                <div className="text-center mb-5">

                    <h2 className="categories-title mb-4">
                        Browse Popular <span>Categories</span>
                    </h2>

                    <p className="categories-subtitle">
                        Find everything you need for your reef tank,
                        all in one place.
                    </p>

                </div>

                <div className="row g-4 justify-content-center">

                    <div className="col-6 col-md-4 col-lg">

                        <Link
                            to="/category/Corals"
                            className="category-card coral-category"

                        >

                            <div className="category-icon">

                                <img
                                    src={CoralIcon}
                                    alt="Corals category"
                                    className="custom-category-icon"
                                />

                            </div>

                            <h3>Corals</h3>

                            <span className="category-line"></span>

                        </Link>

                    </div>

                    <div className="col-6 col-md-4 col-lg">

                        <Link
                            to="/category/Equipment"
                            className="category-card equipment-category"
                        >

                            <div className="category-icon">

                                <Wrench
                                    size={54}
                                    strokeWidth={1.8}
                                />

                            </div>

                            <h3>Equipment</h3>

                            <span className="category-line"></span>

                        </Link>

                    </div>

                    <div className="col-6 col-md-4 col-lg">

                        <Link
                            to="/category/Aquariums"
                            className="category-card aquarium-category"
                        >

                            <div className="category-icon">

                                <Fish
                                    size={54}
                                    strokeWidth={1.8}
                                />

                            </div>

                            <h3>Aquariums</h3>

                            <span className="category-line"></span>

                        </Link>

                    </div>

                    <div className="col-6 col-md-4 col-lg">

                        <Link
                            to="/category/Lighting"
                            className="category-card lighting-category"
                        >

                            <div className="category-icon">

                                <Lightbulb
                                    size={54}
                                    strokeWidth={1.8}
                                />

                            </div>

                            <h3>Lighting</h3>

                            <span className="category-line"></span>

                        </Link>

                    </div>

                    <div className="col-6 col-md-4 col-lg">

                        <Link
                            to="/category/Used"
                            className="category-card used-category"
                        >

                            <div className="category-icon">

                                <Recycle
                                    size={54}
                                    strokeWidth={1.8}
                                />

                            </div>

                            <h3>Used</h3>

                            <span className="category-line"></span>

                        </Link>

                    </div>

                </div>

            </div>

        </section>

    );
};