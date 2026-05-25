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
                                src="/src/front/assets/img/logo-white.png"
                                alt="CoralHub"
                                className="coralhub-logo-img"
                            />

                        </Link>

                        {/* CATEGORY */}

                        <button className="category-dropdown-btn d-none d-lg-flex">

                            Categories

                            <i className="fa-solid fa-chevron-down ms-2"></i>

                        </button>

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
                            to="/"
                            className="mobile-nav-link"
                        >
                            Categories
                        </Link>

                        <Link
                            to="/"
                            className="mobile-nav-link"
                        >
                            Favorites
                        </Link>

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

                    </div>

                </div>

            </div>

        </nav>
    
    );
};