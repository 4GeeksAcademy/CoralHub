import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [searchTerm, setSearchTerm] = useState("");

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

        window.location.reload();
    };

    // SEARCH FUNCTION
    const handleSearch = (e) => {

        e.preventDefault();

        if (!searchTerm.trim()) return;

        navigate(`/search?q=${searchTerm}`);
    };

    return (

        <nav className="coralhub-navbar">

            <div className="container">

                <div className="coralhub-navbar-wrapper">

                    {/* LEFT SIDE */}
                    <div className="d-flex align-items-center gap-4">

                        {/* LOGO */}
                        <Link
                            to="/"
                            className="coralhub-logo"
                            aria-label="CoralHub homepage"
                        >

                            <img
                                src="/src/front/assets/img/CoralHub_logo.png"
                                alt="CoralHub"
                                className="coralhub-logo-img"
                            />

                        </Link>

                        {/* CATEGORIES */}
                        <div className="dropdown d-none d-lg-block">

                            <button
                                className="coralhub-category-btn dropdown-toggle"
                                type="button"
                                id="categoriesDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Categories
                            </button>

                            <ul
                                className="dropdown-menu"
                                aria-labelledby="categoriesDropdown"
                            >

                                <li>
                                    <Link
                                        to="/categories/corals"
                                        className="dropdown-item"
                                    >
                                        Corals
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/categories/equipments"
                                        className="dropdown-item"
                                    >
                                        Equipments
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/categories/used"
                                        className="dropdown-item"
                                    >
                                        Used
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/categories/lights"
                                        className="dropdown-item"
                                    >
                                        Lights
                                    </Link>
                                </li>

                            </ul>

                        </div>

                    </div>

                    {/* SEARCH BAR */}
                    <form
                        onSubmit={handleSearch}
                        className="coralhub-search-wrapper d-none d-lg-flex"
                        role="search"
                        aria-label="Product search"
                    >

                        <input
                            type="search"
                            placeholder="Search corals, fish, lights..."
                            className="coralhub-search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            className="coralhub-search-btn"
                            aria-label="Submit search"
                        >

                            <i className="fa-solid fa-magnifying-glass"></i>

                        </button>

                    </form>

                    {/* RIGHT SIDE */}
                    <div className="d-none d-lg-flex align-items-center gap-3">

                        {
                            token ? (
                                <>

                                    {/* DASHBOARD */}
                                    <Link
                                        to="/dashboard"
                                        className="nav-link-custom"
                                    >
                                        Dashboard
                                    </Link>

                                    {/* ADMIN */}
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (

                                        <Link
                                            to="/admin/users"
                                            className="nav-link-custom admin-link"
                                        >
                                            <i className="fa-solid fa-users-gear me-1"></i>
                                            Admin
                                        </Link>

                                    )}

                                    {/* MY PRODUCTS */}
                                    <Link
                                        to="/my-products"
                                        className="nav-link-custom"
                                    >
                                        My Products
                                    </Link>

                                    {/* CART */}
                                    <Link
                                        to="/cart"
                                        className="cart-icon"
                                        aria-label="Shopping cart"
                                    >

                                        <i className="fa-solid fa-cart-shopping"></i>

                                    </Link>

                                    {/* LOGOUT */}
                                    <button
                                        onClick={handleLogout}
                                        className="signin-btn"
                                        aria-label="Log out"
                                    >
                                        Logout
                                    </button>

                                </>
                            ) : (
                                <>

                                    <Link
                                        to="/login"
                                        className="signin-btn"
                                    >
                                        Sign in
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="signup-btn"
                                    >
                                        Sign up
                                    </Link>

                                </>
                            )
                        }

                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button
                        className="navbar-hamburger d-lg-none"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mobileNavbar"
                        aria-controls="mobileNavbar"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >

                        <i className="fa-solid fa-bars"></i>

                    </button>

                </div>

                {/* MOBILE MENU */}
                <div
                    className="collapse mobile-navbar-menu"
                    id="mobileNavbar"
                >

                    <div className="mobile-navbar-content">

                        {/* MOBILE SEARCH */}
                        <form
                            onSubmit={handleSearch}
                            className="mobile-search-wrapper"
                        >

                            <input
                                type="search"
                                placeholder="Search products..."
                                className="mobile-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                        </form>

                        <Link
                            to="/"
                            className="mobile-nav-link"
                        >
                            Explore
                        </Link>

                        <Link
                            to="/categories/corals"
                            className="mobile-nav-link"
                        >
                            Corals
                        </Link>

                        <Link
                            to="/categories/equipments"
                            className="mobile-nav-link"
                        >
                            Equipments
                        </Link>

                        {
                            token ? (
                                <>

                                    <Link
                                        to="/private"
                                        className="mobile-nav-link"
                                    >
                                        Dashboard
                                    </Link>

                                    <Link
                                        to="/my-products"
                                        className="mobile-nav-link"
                                    >
                                        My Products
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="mobile-nav-link"
                                    >
                                        Cart
                                    </Link>

                                    <button
                                        onClick={handleLogout}
                                        className="mobile-signup-btn"
                                    >
                                        Logout
                                    </button>

                                </>
                            ) : (
                                <>

                                    <Link
                                        to="/login"
                                        className="mobile-nav-link"
                                    >
                                        Sign in
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="mobile-signup-btn"
                                    >
                                        Sign up
                                    </Link>

                                </>
                            )
                        }

                    </div>

                </div>

            </div>

        </nav>
    );
};