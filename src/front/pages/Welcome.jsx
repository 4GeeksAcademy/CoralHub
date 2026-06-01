import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Welcome = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isReturning, setIsReturning] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        // If there's no session, send them to login
        if (!token) {
            navigate("/login");
            return;
        }

        // Read the user we saved at login time
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Decide first-time vs returning user.
        // We use a flag in localStorage: if it doesn't exist, it's their
        // first time -> "Welcome". If it exists -> "Welcome back".
        const hasVisited = localStorage.getItem("coralhub_returning");
        if (hasVisited) {
            setIsReturning(true);
        } else {
            localStorage.setItem("coralhub_returning", "true");
            setIsReturning(false);
        }
    }, [navigate]);

    const firstName = user?.first_name || "there";

    return (
        <div className="container mt-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-lg-8 text-center">

                    {/* Greeting */}
                    <h1 className="fw-bold mb-3">
                        {isReturning
                            ? `Welcome back, ${firstName}! 👋`
                            : `Welcome, ${firstName}! 🎉`}
                    </h1>

                    <p className="text-secondary fs-5 mb-5">
                        {isReturning
                            ? "Great to see you again at CoralHub."
                            : "We're glad you're here. Explore the marketplace and find your next coral."}
                    </p>

                    {/* Quick access cards */}
                    <div className="row g-4">

                        <div className="col-md-4">
                            <Link to="/" className="text-decoration-none">
                                <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                    <div className="fs-1 mb-2">🐠</div>
                                    <h5 className="fw-bold">Browse Products</h5>
                                    <p className="text-secondary mb-0 small">Discover corals, fish, lights and more</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/cart" className="text-decoration-none">
                                <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                    <div className="fs-1 mb-2">🛒</div>
                                    <h5 className="fw-bold">My Cart</h5>
                                    <p className="text-secondary mb-0 small">Review the items you've added</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/profile" className="text-decoration-none">
                                <div className="card h-100 p-4 border-0 shadow-sm rounded-4">
                                    <div className="fs-1 mb-2">👤</div>
                                    <h5 className="fw-bold">My Profile</h5>
                                    <p className="text-secondary mb-0 small">Manage your account details</p>
                                </div>
                            </Link>
                        </div>

                    </div>

                    {/* Main call to action */}
                    <Link to="/" className="btn btn-dark btn-lg px-5 py-3 mt-5 rounded-3 fw-semibold">
                        Start Shopping
                    </Link>

                </div>
            </div>
        </div>
    );
};
