import React, { useState } from "react";

export const AddProduct = () => {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        image_url: "",
        category: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const token = localStorage.getItem("token");

            const response = await fetch(`${backendUrl}/api/products`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify({
                    ...formData,
                    price: parseFloat(formData.price),
                    stock: parseInt(formData.stock)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.msg || "Unable to create product.");
                return;
            }

            setSuccess("Product added successfully!");

            setFormData({
                name: "",
                description: "",
                price: "",
                stock: "",
                image_url: "",
                category: ""
            });

        } catch (error) {

            setError("Something went wrong. Please try again.");
        }
    };

    return (

        <main className="container py-5">

            <div className="row justify-content-center">

                <div className="col-lg-8">

                    <section
                        className="card shadow border-0"
                        aria-labelledby="add-product-heading"
                    >

                        <div className="card-body p-4 p-md-5">

                            <h1
                                id="add-product-heading"
                                className="mb-3"
                            >
                                Add Product
                            </h1>

                            <p className="text-secondary mb-4">
                                Complete the form below to publish a new product in the marketplace.
                            </p>

                            {/* ACCESSIBLE SUCCESS MESSAGE */}
                            {
                                success && (
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                        aria-live="polite"
                                    >
                                        {success}
                                    </div>
                                )
                            }

                            {/* ACCESSIBLE ERROR MESSAGE */}
                            {
                                error && (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                        aria-live="assertive"
                                    >
                                        {error}
                                    </div>
                                )
                            }

                            <form onSubmit={handleSubmit} noValidate>

                                {/* PRODUCT NAME */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="name"
                                        className="form-label fw-semibold"
                                    >
                                        Product Name
                                    </label>

                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-describedby="name-help"
                                    />

                                    <div
                                        id="name-help"
                                        className="form-text"
                                    >
                                        Enter the name customers will see in the catalog.
                                    </div>

                                </div>

                                {/* DESCRIPTION */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >
                                        Description
                                    </label>

                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="5"
                                        value={formData.description}
                                        onChange={handleChange}
                                        aria-describedby="description-help"
                                    />

                                    <div
                                        id="description-help"
                                        className="form-text"
                                    >
                                        Provide important details about the product condition, size, or specifications.
                                    </div>

                                </div>

                                {/* PRICE */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="price"
                                        className="form-label fw-semibold"
                                    >
                                        Price
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="price"
                                        name="price"
                                        min="0"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-describedby="price-help"
                                    />

                                    <div
                                        id="price-help"
                                        className="form-text"
                                    >
                                        Enter the product price in USD.
                                    </div>

                                </div>

                                {/* STOCK */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="stock"
                                        className="form-label fw-semibold"
                                    >
                                        Stock Quantity
                                    </label>

                                    <input
                                        type="number"
                                        className="form-control"
                                        id="stock"
                                        name="stock"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-describedby="stock-help"
                                    />

                                    <div
                                        id="stock-help"
                                        className="form-text"
                                    >
                                        Specify how many units are available.
                                    </div>

                                </div>

                                {/* IMAGE URL */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="image_url"
                                        className="form-label fw-semibold"
                                    >
                                        Product Image URL
                                    </label>

                                    <input
                                        type="url"
                                        className="form-control"
                                        id="image_url"
                                        name="image_url"
                                        value={formData.image_url}
                                        onChange={handleChange}
                                        aria-describedby="image-help"
                                    />

                                    <div
                                        id="image-help"
                                        className="form-text"
                                    >
                                        Paste a valid image URL to display the product photo.
                                    </div>

                                </div>

                                {/* CATEGORY */}
                                <div className="mb-5">

                                    <label
                                        htmlFor="category"
                                        className="form-label fw-semibold"
                                    >
                                        Category
                                    </label>

                                    <select
                                        className="form-select"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-describedby="category-help"
                                    >

                                        <option value="">
                                            Select a category
                                        </option>

                                        <option value="Fish">
                                            Fish
                                        </option>

                                        <option value="Corals">
                                            Corals
                                        </option>

                                        <option value="Hardware">
                                            Hardware
                                        </option>

                                    </select>

                                    <div
                                        id="category-help"
                                        className="form-text"
                                    >
                                        Choose the category that best describes your product.
                                    </div>

                                </div>

                                {/* SUBMIT BUTTON */}
                                <button
                                    type="submit"
                                    className="btn btn-dark btn-lg w-100"
                                >
                                    Add Product
                                </button>

                            </form>

                        </div>

                    </section>

                </div>

            </div>

        </main>
    );
};