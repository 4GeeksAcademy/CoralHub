import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();

    // STATES
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // FORM
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        first_name,
                        last_name,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("User created successfully");
                navigate("/login");

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.log(error);
            alert("Server error");

        }
    };

    return (

        <div className="container d-flex justify-content-center align-items-center min-vh-100">

            <div
                className="bg-white border rounded p-4 shadow-sm"
                style={{ width: "420px" }}
            >

                {/* TITLE */}
                <h2 className="fw-bold mb-2">
                    Create Account
                </h2>

                <p className="text-secondary mb-4">
                    Enter your information to get started
                </p>

                <form onSubmit={handleSubmit}>

                    {/* FIRST + LAST NAME */}
                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-semibold">
                                First Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="John"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />

                        </div>

                        <div className="col-md-6 mb-3">

                            <label className="form-label fw-semibold">
                                Last Name
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Doe"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                        </div>

                    </div>

                    {/* EMAIL */}
                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            Email
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            placeholder="john.doe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="mb-3">

                        <label className="form-label fw-semibold">
                            Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="mb-4">

                        <label className="form-label fw-semibold">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                        />

                    </div>

                    {/* TERMS */}
                    <div className="form-check mb-4">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="terms"
                        />

                        <label
                            className="form-check-label"
                            htmlFor="terms"
                        >
                            I agree to the{" "}
                            <a href="#">
                                terms and conditions
                            </a>
                        </label>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="btn btn-primary w-100 py-2 fw-semibold"
                    >
                        Sign Up
                    </button>

                </form>

                <hr className="my-4" />

                {/* SIGN IN */}
                <p className="text-center text-secondary mb-0">

                    Already have an account?{" "}

                    <Link to="/signin">
                        Sign in
                    </Link>

                </p>

            </div>

        </div>
    );
};