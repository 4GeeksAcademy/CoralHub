import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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

        <div className="container min-vh-100 d-flex justify-content-center align-items-center bg-light">

            <div
                className="card shadow-sm p-4 border-0"
                style={{
                    maxWidth: "450px",
                    width: "100%",
                    borderRadius: "20px"
                }}
            >

                {/* TITLE */}
                <h1 className="fw-bold mb-2">
                    Sign In
                </h1>

                <p className="text-secondary mb-4">
                    Enter your credentials to access your account
                </p>

                <form onSubmit={handleSubmit}>

                    {/* EMAIL */}
                    <div className="mb-4">

                        <label
                            htmlFor="email"
                            className="form-label fw-semibold"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            className="form-control py-3 border-0 bg-light"
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
                            className="form-label fw-semibold mb-0"
                        >
                            Password
                        </label>

                        <a
                            href="#"
                            className="text-dark text-decoration-none small fw-medium"
                        >
                            Forgot your password?
                        </a>

                    </div>

                    {/* PASSWORD INPUT */}
                    <div className="mb-4">

                        <input
                            id="password"
                            type="password"
                            className="form-control py-3 border-0 bg-light"
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
                        className="btn btn-dark w-100 py-3 fw-semibold"
                        style={{
                            borderRadius: "12px"
                        }}
                    >
                        Sign In
                    </button>

                </form>

                {/* SIGN UP */}
                <p className="text-center text-secondary mt-4 mb-0">

                    Don’t have an account?{" "}

                    <a
                        href="/signup"
                        className="text-dark fw-semibold text-decoration-none"
                    >
                        Sign Up
                    </a>

                </p>

            </div>

        </div>
    );
};