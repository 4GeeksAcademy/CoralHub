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
    const [image, setImage] = useState(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const uploadImage = async () => {

        if (!image) return "";

        setLoadingImage(true);

        try {

            const formDataImage = new FormData();

            formDataImage.append("image", image);

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await fetch(

                `${backendUrl}/api/upload`,

                {
                    method: "POST",
                    body: formDataImage
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed with status ${response.status}`);
            }

            const data = await response.json();

            if (!data.image_url) {
                throw new Error("No image URL returned from server");
            }

            return data.image_url;

        } catch (error) {

            console.error("Image upload error:", error);
            setError(`Image upload failed: ${error.message}`);

            return "";

        } finally {

            setLoadingImage(false);
        }
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");

        if (!image) {
            setError("Please select an image before submitting.");
            return;
        }

        try {

            const imageUrl = await uploadImage();

            if (!imageUrl) {
                setError("Failed to upload image. Please try again.");
                return;
            }

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
                    image_url: imageUrl,
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

            setImage(null);
            setPreview(null);

        } catch (error) {

            console.error("Submit error:", error);
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

                                {/* PRODUCT IMAGE */}
                                <div className="mb-4">

                                    <label
                                        htmlFor="product-image"
                                        className="form-label fw-semibold"
                                    >
                                        Product Image
                                    </label>

                                    <input
                                        type="file"
                                        className="form-control"
                                        id="product-image"
                                        accept="image/*"
                                        aria-describedby="image-help"
                                        onChange={(e) => {

                                            const file = e.target.files[0];

                                            setImage(file);

                                            if (file) {
                                                setPreview(URL.createObjectURL(file));
                                            }
                                        }}
                                    />

                                    <div
                                        id="image-help"
                                        className="form-text"
                                    >
                                        Upload a clear image of your product.
                                    </div>

                                    {
                                        loadingImage && (
                                            <p
                                                className="mt-2"
                                                aria-live="polite"
                                            >
                                                Uploading image...
                                            </p>
                                        )
                                    }

                                    {
                                        preview && (
                                            <img
                                                src={preview}
                                                alt="Product preview"
                                                className="img-fluid rounded mt-3"
                                                style={{
                                                    maxHeight: "250px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        )
                                    }

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

                                        <option value="Coral">
                                            Coral
                                        </option>

                                        <option value="Light">
                                            Light
                                        </option>

                                        <option value="Hardware">
                                            Hardware
                                        </option>

                                        <option value="Tanks">
                                            Tanks
                                        </option>

                                        <option value="Used Equipment">
                                            Used Equipment
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