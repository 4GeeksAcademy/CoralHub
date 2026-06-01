import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";


export const Login = () => {

    const navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const location = useLocation();

    const from = location.state?.from || "/";

    // LOGIN
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            // SI LOGIN FUNCIONA
            if (response.ok) {

                // guardar token
                localStorage.setItem("token", data.token);

                // guardar usuario opcionalmente
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert("Login successful");

                // redirect
                navigate(from);

            } else {

                alert(data.msg);

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
                    Welcome Back
                </h2>

                <p className="auth-subtitle">
                    Sign in to access your CoralHub account.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <div className="mb-3">

                        <label
                            htmlFor="email"
                            className="form-label"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            className="form-control"
                            placeholder="you@example.com"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* PASSWORD HEADER */}
                    <div className="d-flex justify-content-between align-items-center mb-2">

                        <label
                            htmlFor="password"
                            className="form-label mb-0"
                        >
                            Password
                        </label>

                        <Link
                            to="/forgot-password"
                            className="small text-decoration-none"
                            style={{ color: "#ff7f50" }}
                        >
                            Forgot password?
                        </Link>

                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="mb-3">

                        <input
                            id="password"
                            type="password"
                            className="form-control"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* REMEMBER ME */}
                    <div className="form-check mb-4">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="rememberMe"
                        />

                        <label
                            className="form-check-label"
                            htmlFor="rememberMe"
                        >
                            Remember me
                        </label>

                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="auth-btn"
                    >
                        Sign In
                    </button>

                </form>

                <div className="auth-divider"></div>

                {/* SIGN UP */}
                <p className="auth-footer">

                    Don't have an account?{" "}

                    <Link to="/signup">
                        Sign Up
                    </Link>

                </p>

            </div>

        </div>

    );
};