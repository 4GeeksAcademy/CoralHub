import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

const SHIPPING_COST = 10;

export const Cart = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    const [deliveryMethod, setDeliveryMethod] = useState("pickup");

    const [shippingAddress, setShippingAddress] = useState({
        full_name: "",
        street: "",
        city: "",
        state: "",
        zip_code: "",
        country: "United States",
        phone: ""
    });

    const cartItems = store.cart || [];

    const calculateSubtotal = () => {
        return cartItems.reduce(
            (total, item) => total + Number(item.price) * Number(item.quantity || 1),
            0
        );
    };

    const shippingFee = deliveryMethod === "shipping" ? SHIPPING_COST : 0;

    const calculateTotal = () => {
        return (calculateSubtotal() + shippingFee).toFixed(2);
    };

    const handleIncreaseQuantity = (item) => {
        dispatch({
            type: "update_quantity",
            payload: { id: item.id, quantity: item.quantity + 1 }
        });
    };

    const handleDecreaseQuantity = (item) => {
        if (item.quantity > 1) {
            dispatch({
                type: "update_quantity",
                payload: { id: item.id, quantity: item.quantity - 1 }
            });
        } else {
            if (confirm(`Do you want to remove ${item.name} from your cart?`)) {
                handleRemoveItem(item.id);
            }
        }
    };

    const handleRemoveItem = (id) => {
        dispatch({
            type: "remove_from_cart",
            payload: id
        });
    };

    const handleAddressChange = (field, value) => {
        setShippingAddress({
            ...shippingAddress,
            [field]: value
        });
    };

    const validateShippingForm = () => {
        if (deliveryMethod === "pickup") return true;

        const required = ["full_name", "street", "city", "state", "zip_code", "country"];

        for (const field of required) {
            if (!shippingAddress[field]?.trim()) {
                alert(`Please complete: ${field.replace("_", " ")}`);
                return false;
            }
        }

        return true;
    };

    const handleCheckout = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must log in to complete your purchase.");
            navigate("/login");
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        if (!validateShippingForm()) return;

        try {
            const cleanUrl = import.meta.env.VITE_BACKEND_URL.replace(/\/$/, "");

            console.log("Cart sent to Stripe:", cartItems);

            const response = await fetch(`${cleanUrl}/api/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    cart: cartItems,
                    items: cartItems,
                    total: calculateTotal(),
                    delivery_method: deliveryMethod,
                    shipping_address: deliveryMethod === "shipping" ? shippingAddress : null
                })
            });

            const responseText = await response.text();

            let data = {};
            try {
                data = JSON.parse(responseText);
            } catch (error) {
                console.error("Backend did not return JSON:", responseText);
            }

            if (!response.ok) {
                alert(data.msg || data.error || `Server error: ${response.status}`);
                return;
            }

            if (data.url) {
                window.location.href = data.url;
                return;
            }

            if (data.checkout_url) {
                window.location.href = data.checkout_url;
                return;
            }

            alert("Checkout session was created, but Stripe URL was not returned.");

        } catch (error) {
            console.error("Checkout error:", error);
            alert("Connection error with the server.");
        }
    };

    return (
        <div className="container mt-5 min-vh-100">
            <h1 className="mb-4 fw-bold">Your Shopping Cart 🛒</h1>

            {cartItems.length === 0 ? (
                <div className="alert alert-warning text-center p-5">
                    <h3>Your cart is empty.</h3>
                    <p>Explore our store to add amazing products.</p>
                    <Link to="/" className="btn btn-dark mt-3">
                        Go to Store
                    </Link>
                </div>
            ) : (
                <div className="row">
                    <div className="col-lg-8">
                        {cartItems.map((item) => (
                            <div
                                className="card mb-3 p-3 border-0 shadow-sm rounded-3 bg-light"
                                key={item.id}
                            >
                                <div className="d-flex align-items-center gap-3 flex-wrap flex-md-nowrap">
                                    <img
                                        src={item.image_url}
                                        alt={item.name}
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            objectFit: "cover",
                                            borderRadius: "10px"
                                        }}
                                    />

                                    <div className="flex-grow-1">
                                        <h5 className="fw-bold mb-1">{item.name}</h5>
                                        <p className="text-secondary mb-0">
                                            Unit price: ${Number(item.price).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="d-flex align-items-center border rounded bg-white me-3">
                                        <button
                                            className="btn btn-sm px-3 py-1 border-0"
                                            onClick={() => handleDecreaseQuantity(item)}
                                        >
                                            -
                                        </button>

                                        <span
                                            className="px-2 fw-semibold"
                                            style={{ minWidth: "30px", textAlign: "center" }}
                                        >
                                            {item.quantity}
                                        </span>

                                        <button
                                            className="btn btn-sm px-3 py-1 border-0"
                                            onClick={() => handleIncreaseQuantity(item)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    <div
                                        className="fw-bold fs-5 me-3"
                                        style={{ minWidth: "90px", textAlign: "right" }}
                                    >
                                        ${(Number(item.price) * Number(item.quantity || 1)).toFixed(2)}
                                    </div>

                                    <button
                                        className="btn btn-outline-danger btn-sm border-0 p-2"
                                        onClick={() => handleRemoveItem(item.id)}
                                        title="Remove product"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="card mt-4 p-4 border-0 shadow-sm rounded-3 bg-light">
                            <h4 className="fw-bold mb-3">📦 Delivery Method</h4>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryMethod"
                                    id="pickup"
                                    value="pickup"
                                    checked={deliveryMethod === "pickup"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                />

                                <label className="form-check-label w-100" htmlFor="pickup">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>📍 Local Pickup</strong>
                                            <p className="text-secondary mb-0 small">
                                                Pick up your order at our location in Miami, FL
                                            </p>
                                        </div>

                                        <span className="badge bg-success">FREE</span>
                                    </div>
                                </label>
                            </div>

                            <div className="form-check mb-3">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="deliveryMethod"
                                    id="shipping"
                                    value="shipping"
                                    checked={deliveryMethod === "shipping"}
                                    onChange={(e) => setDeliveryMethod(e.target.value)}
                                />

                                <label className="form-check-label w-100" htmlFor="shipping">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <strong>🚚 Shipping to your address</strong>
                                            <p className="text-secondary mb-0 small">
                                                Receive your order at your address in 3–5 business days
                                            </p>
                                        </div>

                                        <span className="badge bg-primary">
                                            ${SHIPPING_COST.toFixed(2)}
                                        </span>
                                    </div>
                                </label>
                            </div>

                            {deliveryMethod === "shipping" && (
                                <div className="mt-3 p-3 bg-white rounded-3">
                                    <h6 className="fw-bold mb-3">Shipping Address</h6>

                                    <div className="row g-2">
                                        <div className="col-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Full Name *"
                                                value={shippingAddress.full_name}
                                                onChange={(e) =>
                                                    handleAddressChange("full_name", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-12">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Street Address *"
                                                value={shippingAddress.street}
                                                onChange={(e) =>
                                                    handleAddressChange("street", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="City *"
                                                value={shippingAddress.city}
                                                onChange={(e) =>
                                                    handleAddressChange("city", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="State *"
                                                value={shippingAddress.state}
                                                onChange={(e) =>
                                                    handleAddressChange("state", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-md-3">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="ZIP Code *"
                                                value={shippingAddress.zip_code}
                                                onChange={(e) =>
                                                    handleAddressChange("zip_code", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Country *"
                                                value={shippingAddress.country}
                                                onChange={(e) =>
                                                    handleAddressChange("country", e.target.value)
                                                }
                                            />
                                        </div>

                                        <div className="col-md-6">
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Phone (optional)"
                                                value={shippingAddress.phone}
                                                onChange={(e) =>
                                                    handleAddressChange("phone", e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card p-4 border-0 shadow-sm rounded-4 bg-white">
                            <h4 className="fw-bold mb-4">Order Summary</h4>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">Subtotal:</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span className="text-secondary">
                                    {deliveryMethod === "shipping" ? "Shipping:" : "Pickup:"}
                                </span>

                                <span>
                                    {deliveryMethod === "shipping" ? (
                                        `$${shippingFee.toFixed(2)}`
                                    ) : (
                                        <span className="text-success">FREE</span>
                                    )}
                                </span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-3 fs-5">
                                <span className="fw-bold">Total:</span>
                                <span className="fw-bold text-success">
                                    ${calculateTotal()}
                                </span>
                            </div>

                            <button
                                className="btn btn-dark w-100 py-3 fw-semibold rounded-3"
                                onClick={handleCheckout}
                            >
                                Confirm and Pay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};