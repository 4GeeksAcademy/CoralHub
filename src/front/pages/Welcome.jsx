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
        <div className="container welcome-screen min-vh-100 d-flex flex-column justify-content-center">
            <div className="row justify-content-center">
                <div className="col-lg-9 text-center">

                    {/* Greeting */}
                    <div className="welcome-greet">
                        <h1 className="fw-bold mb-3 welcome-title">
                            {isReturning
                                ? `Welcome back, ${firstName}! 👋`
                                : `Welcome, ${firstName}! 🎉`}
                        </h1>

                        <p className="welcome-subtitle fs-5 mb-5">
                            {isReturning
                                ? "Great to see you again at CoralHub."
                                : "We're glad you're here. Explore the marketplace and find your next coral."}
                        </p>
                    </div>

                    {/* Quick access cards */}
                    <div className="row g-4 justify-content-center">

                        <div className="col-md-4">
                            <Link to="/" className="text-decoration-none">
                                <div className="welcome-card welcome-card-1">
                                    <div className="welcome-icon welcome-icon-blue">🐠</div>
                                    <h5 className="fw-bold welcome-card-title">Browse Products</h5>
                                    <p className="welcome-card-text mb-0">Discover corals, fish, lights and more</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/cart" className="text-decoration-none">
                                <div className="welcome-card welcome-card-2">
                                    <div className="welcome-icon welcome-icon-teal">🛒</div>
                                    <h5 className="fw-bold welcome-card-title">My Cart</h5>
                                    <p className="welcome-card-text mb-0">Review the items you've added</p>
                                </div>
                            </Link>
                        </div>

                        <div className="col-md-4">
                            <Link to="/profile" className="text-decoration-none">
                                <div className="welcome-card welcome-card-3">
                                    <div className="welcome-icon welcome-icon-purple">👤</div>
                                    <h5 className="fw-bold welcome-card-title">My Profile</h5>
                                    <p className="welcome-card-text mb-0">Manage your account details</p>
                                </div>
                            </Link>
                        </div>

                    </div>

                    {/* Main call to action */}
                    <div>
                        <Link to="/" className="welcome-btn">
                            Start Shopping
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
};
