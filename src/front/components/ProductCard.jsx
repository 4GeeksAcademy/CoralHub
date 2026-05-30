import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ product, renderStars }) => {
    return (
        <div className="coral-card">

            <div className="coral-image-wrapper">

                <img
                    src={
                        product.image_url ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={product.name}
                    className="coral-image"
                />

                <div className="favorite-like-btn">
                    ♡
                </div>

                <div className="new-badge">
                    New
                </div>

            </div>

            <div className="coral-card-body">

                <h5>{product.name}</h5>

                <p>
                    {product.description?.substring(0, 70)}
                    {product.description?.length > 70 ? "..." : ""}
                </p>

                <div className="stars-row">
                    <span className="stars">
                        {renderStars(product.rating_average || 0)}
                    </span>

                    <small>
                        ({product.reviews_count || 0} reviews)
                    </small>
                </div>

                <h3 className="product-price">
                    ${Number(product.price).toFixed(2)}
                </h3>

                <div className="seller-row">

                    <div className="seller-avatar-placeholder">
                        {product.seller_name?.charAt(0)}
                    </div>

                    <span className="seller-name">
                        {product.seller_name}
                    </span>

                </div>

            </div>

            <div className="product-meta">

                <span className="stock-badge">
                    Available
                </span>

                <small>
                    Stock: {product.stock}
                </small>

            </div>

            <Link
                to={`/product/${product.id}`}
                className="view-product-btn"
            >
                View Product
            </Link>

        </div>
    );
};