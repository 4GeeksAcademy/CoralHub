import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../index.css";

export const ProductDetail = () => {

    const { id } = useParams();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`)

            .then((response) => {

                if (!response.ok) {
                    throw new Error("Product not found");
                }

                return response.json();
            })

            .then((data) => {

                setProduct(data);

                setLoading(false);
            })

            .catch((error) => {

                console.error(error);

                setError(error.message);

                setLoading(false);
            });

    }, [id]);

    // LOADING
    if (loading) {

        return (

            <div className="product-page">

                <div className="container py-5 text-center">

                    <div
                        className="spinner-border text-info"
                        role="status"
                    ></div>

                    <p className="mt-3 text-light">
                        Loading product...
                    </p>

                </div>

            </div>
        );
    }

    // ERROR
    if (error) {

        return (

            <div className="product-page">

                <div className="container py-5">

                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        {error}
                    </div>

                </div>

            </div>
        );
    }

    return (

        <div className="product-page">

            <div className="container py-5">

                {/* BREADCRUMB */}

                <nav
                    aria-label="breadcrumb"
                    className="mb-4"
                >

                    <ol className="breadcrumb custom-breadcrumb">

                        <li className="breadcrumb-item">

                            <Link to="/">
                                Home
                            </Link>

                        </li>

                        <li className="breadcrumb-item active">

                            {product.name}

                        </li>

                    </ol>

                </nav>

                <div className="row g-4">

                    {/* LEFT COLUMN */}

                    <div className="col-lg-6">

                        <div className="product-image-card">

                            <img
                                src={product.image_url}
                                alt={`Image of ${product.name}`}
                                className="product-main-image"
                            />
                        </div>

                    </div>

                    {/* RIGHT COLUMN */}

                    <div className="col-lg-6">

                        <div className="product-info-card">


                            {/* TITLE */}

                            <h1 className="product-title">

                                {product.name}

                            </h1>

                            {/* RATING */}

                            <div className="rating-row">

                                ⭐⭐⭐⭐⭐

                                <span className="review-text">

                                    4.7 (32 reviews)

                                </span>

                            </div>

                            {/* PRICE */}

                            <h2 className="product-price">

                                ${product.price}

                            </h2>

                            {/* STOCK */}

                            <div className="stock-row">

                                <span>
                                    Stock: {product.stock} available
                                </span>

                                <span className="status-badge">

                                    ● Active
                                </span>

                            </div>

                            {/* DESCRIPTION */}

                            <p className="product-description">

                                {product.description}

                            </p>

                            {/* ACTIONS */}

                            <div className="product-actions">

                                <button
                                    className="btn add-cart-btn"
                                    aria-label={`Add ${product.name} to cart`}
                                >
                                    Add to Cart
                                </button>

                                <button
                                    className="btn wishlist-btn"
                                    aria-label="Add to wishlist"
                                >
                                    ♡
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {/* BOTTOM SECTION */}

                <div className="row g-4 mt-3">

                    {/* SELLER */}

                    <div className="col-lg-4">

                        <div className="bottom-card">

                            <h3 className="bottom-title">

                                About the Seller

                            </h3>

                            <div className="seller-box">

                                <div className="seller-avatar">

                                    🐙

                                </div>

                                <div>

                                    <h4 className="seller-name">

                                        ReefMaster

                                    </h4>

                                    <p className="seller-rating">

                                        ⭐⭐⭐⭐⭐ 4.9
                                    </p>

                                </div>

                            </div>

                            <button className="btn seller-btn">

                                View Seller Profile

                            </button>

                        </div>

                    </div>

                    {/* REVIEWS */}

                    <div className="col-lg-8">

                        <div className="bottom-card">

                            <div className="d-flex justify-content-between align-items-center mb-4">

                                <h3 className="bottom-title mb-0">

                                    Product Reviews

                                </h3>

                                <button className="btn review-btn">

                                    Add Review

                                </button>

                            </div>

                            {/* REVIEW */}

                            <div className="review-item">

                                <div className="d-flex gap-3">

                                    <div className="review-avatar">

                                        🐠

                                    </div>

                                    <div>

                                        <h5 className="review-user">

                                            AquaLover
                                        </h5>

                                        <p className="review-stars">

                                            ⭐⭐⭐⭐⭐
                                        </p>

                                        <p className="review-content">

                                            Absolutely stunning coral!
                                            Colors are even better in person.

                                        </p>

                                    </div>

                                </div>

                            </div>

                            <hr />

                            <div className="review-item">

                                <div className="d-flex gap-3">

                                    <div className="review-avatar">

                                        🪸

                                    </div>

                                    <div>

                                        <h5 className="review-user">

                                            CoralFanatic
                                        </h5>

                                        <p className="review-stars">

                                            ⭐⭐⭐⭐
                                        </p>

                                        <p className="review-content">

                                            Great polyp extension and healthy coral.

                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};