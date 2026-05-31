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

        <div className="auth-page">

            <div className="auth-card">

                {/* TITLE */}
                <h2 className="auth-title">
                    Create Account
                </h2>

                <p className="auth-subtitle">
                    Join the CoralHub community and start buying or selling reef products.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* FIRST + LAST NAME */}
                    <div className="row">

                        <div className="col-md-6 mb-3">

                            <label className="form-label">
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

                            <label className="form-label">
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

                        <label className="form-label">
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

                        <label className="form-label">
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

                        <label className="form-label">
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
                            <a href="/terms">
                                Terms and Conditions
                            </a>
                        </label>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Create Account
                    </button>

                </form>

                <div className="auth-divider"></div>

                {/* SIGN IN */}
                <p className="auth-footer">

                    Already have an account?{" "}

                    <Link to="/login">
                        Sign In
                    </Link>

                </p>

            </div>

        </div>

    
    );
};