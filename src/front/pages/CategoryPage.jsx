import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export const CategoryPage = () => {

    const { category } = useParams();
    console.log("CATEGORY:", category);

    const [products, setProducts] = useState([]);

    useEffect(() => {

        const fetchProducts = async () => {

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(
                `${backendUrl}/api/products/category/${category}`
            );

            const data = await response.json();

            console.log("CATEGORY PRODUCTS:", data);

            setProducts(data);
        };

        fetchProducts();

    }, [category]);

    console.log(products[0]);

    return (

        <div className="category-page">

            <section className="category-hero">

                <div className="container">

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

                            <li className="breadcrumb-item">
                                <Link to="/catalog">
                                    Categories
                                </Link>
                            </li>

                            <li
                                className="breadcrumb-item active"
                                aria-current="page"
                            >
                                {category}
                            </li>

                        </ol>
                    </nav>

                    <h1 className="category-title">
                        {category}
                    </h1>

                    <p className="category-subtitle">
                        Browse our selection of {category.toLowerCase()} available from trusted reef hobbyists.
                    </p>

                </div>

            </section>


            <div className="container catalog-container">


                <div className="row g-4">

                    {products.map((product) => (

                        <div
                            key={product.id}
                            className="col-sm-6 col-lg-3"
                        >

                            <div className="coral-card">

                                {/* IMAGE */}
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

                                {/* BODY */}
                                <div className="coral-card-body">

                                    <h5>
                                        {product.name}
                                    </h5>

                                    <p>
                                        {product.description?.substring(0, 70)}
                                        {product.description?.length > 70 ? "..." : ""}
                                    </p>

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

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );
};