import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () => {

        // remove token
        localStorage.removeItem("token");

        // remove user
        localStorage.removeItem("user");

        // redirect
        navigate("/home");

        // refresh navbar
        window.location.reload();
    };

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-black"
            aria-label="Main navigation"
        >

            <div className="container">

                {/* LOGO */}
                <Link
                    to="/"
                    className="navbar-brand fw-bold"
                    aria-label="CoralHub homepage"
                >
                    CoralHub
                </Link>

                {/* MOBILE MENU BUTTON */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation menu"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* NAVIGATION LINKS */}
                <div
                    className="collapse navbar-collapse"
                    id="mainNavbar"
                >

                    <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-3">

                        {
                            token ? (
                                <>

                                    <li className="nav-item">
                                        <Link to="/private" className="nav-link">
                                            Dashboard
                                        </Link>
                                    </li>

                                    {/* NUEVO: LINK CONDICIONAL SOLO PARA ADMINS */}
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
                                        <li className="nav-item">
                                            <Link to="/admin/users" className="nav-link text-warning fw-bold">
                                                <i className="fa-solid fa-users-gear me-1"></i> Admin Usuarios
                                            </Link>
                                        </li>
                                    )}

                                    <li className="nav-item">
                                        <Link to="#" className="nav-link">
                                            My Products
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            to="#"
                                            className="nav-link"
                                        >
                                            My Orders
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            to="#"
                                            className="nav-link"
                                        >
                                            My Profile
                                        </Link>
                                    </li>

                                    {/* CART ICON */}
                                    <li className="nav-item">
                                        <Link
                                            to="/cart"
                                            className="nav-link"
                                            aria-label="Shopping cart"
                                        >

                                            <i
                                                className="fa-solid fa-cart-shopping text-white fs-5"
                                                aria-hidden="true"
                                            ></i>

                                            <span className="visually-hidden">
                                                Shopping cart
                                            </span>

                                        </Link>
                                    </li>

                                    {/* LOGOUT BUTTON */}
                                    <li className="nav-item">
                                        <button
                                            className="btn btn-danger"
                                            onClick={handleLogout}
                                            aria-label="Log out"
                                        >
                                            Logout
                                        </button>
                                    </li>

                                </>

                            ) : (

                                <>
                                    <li className="nav-item">
                                        <Link
                                            to="/signup"
                                            className="nav-link"
                                        >
                                            <button
                                                className="btn btn-primary"
                                                aria-label="Create account"
                                            >
                                                Sign Up
                                            </button>
                                        </Link>
                                    </li>

                                    <li className="nav-item">
                                        <Link
                                            to="/login"
                                            className="nav-link"
                                        >
                                            <button
                                                className="btn btn-outline-light"
                                                aria-label="Sign in"
                                            >
                                                Sign In
                                            </button>
                                        </Link>
                                    </li>

                                </>
                            )
                        }

                    </ul>

                </div>

            </div>

        </nav>
    );
};