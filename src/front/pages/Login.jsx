import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    successAlert,
    errorAlert
} from "../utils/alerts";

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

        // ADMIN DEMO LOGIN
        // Esto permite probar la vista de administrador sin usar consola
        if (
            email.toLowerCase() === "admin@gmail.com" &&
            password === "admin123"
        ) {
            const adminUser = {
                first_name: "Juan",
                email: "admin@gmail.com",
                role: "admin"
            };

            localStorage.setItem("token", "admin-test-token");
            localStorage.setItem("user", JSON.stringify(adminUser));

            await successAlert(
                "Welcome Admin",
                "You are logged in as administrator."
            );

            navigate("/welcome");
            return;
        }

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

                localStorage.setItem("token", data.token);

                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                await successAlert(
                    "Welcome Back",
                    "Login successful."
                );

                navigate("/welcome");

            } else {

                errorAlert(
                    "Login Failed",
                    data.msg || "Invalid email or password"
                );
            }

        } catch (error) {

            console.log(error);

            errorAlert(
                "Server Error",
                "Something went wrong. Please try again later."
            );
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
                <p className="text-center text-secondary mt-4 mb-0">
                    Don’t have an account?{" "}
                    <Link
                        to="/signup"
                        className="text-dark fw-semibold text-decoration-none"
                    >
                        Sign Up
                    </Link>
                </p>

                {/* ADMIN DEMO INFO */}
                <p className="text-center text-secondary mt-3 mb-0" style={{ fontSize: "13px" }}>
                    Admin demo: admin@gmail.com / admin123
                </p>

            </div>
        </div>

    );
};