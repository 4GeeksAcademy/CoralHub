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
        navigate("/");

        // refresh navbar
        window.location.reload();
    };

    return (

        <nav className="coralhub-navbar">

            <div className="container">

                <div className="coralhub-navbar-wrapper">

                    {/* LEFT */}
                    <div className="d-flex align-items-center gap-5">

                        {/* LOGO */}
                        <Link
                            to="/"
                            className="coralhub-logo"
                        >

                            <img
                                src="/src/front/assets/img/CoralHub_logo.png"
                                alt="CoralHub"
                                className="coralhub-logo-img"
                            />

                        </Link>

                        {/* CATEGORIES DROPDOWN */}
                        <div className="dropdown">

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

                    {/* SEARCH */}
                    <div className="coralhub-search-wrapper d-none d-lg-block">

                        <input
                            type="text"
                            placeholder="Search corals, lights, equipments..."
                            className="coralhub-search-input"
                        />

                        <button className="coralhub-search-btn">

                            <i className="fa-solid fa-magnifying-glass"></i>

                        </button>

                    </div>

                    {/* DESKTOP BUTTONS */}
                    <div className="d-none d-lg-flex align-items-center gap-3">

                        {
                            token ? (

                                <button
                                    onClick={handleLogout}
                                    className="signin-btn"
                                >
                                    Log out
                                </button>

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

                    {/* HAMBURGER */}
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

                        <Link
                            to="/categories/used"
                            className="mobile-nav-link"
                        >
                            Used
                        </Link>

                        <Link
                            to="/categories/lights"
                            className="mobile-nav-link"
                        >
                            Lights
                        </Link>

                        {
                            token ? (

                                <button
                                    onClick={handleLogout}
                                    className="mobile-signup-btn"
                                >
                                    Log out
                                </button>

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