import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { store, dispatch } = useGlobalReducer();
    const token = localStorage.getItem("token");
    const [searchTerm, setSearchTerm] = useState("");

    // Verificamos si el usuario está exactamente en la página de administración
    const isAdminPage = location.pathname === "/admin/dashboard";

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
        window.location.reload();
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;
        navigate(`/search?q=${searchTerm}`);
    };

    return (
        <nav className={`coralhub-navbar ${isAdminPage ? "admin-navbar-compact py-1 bg-dark text-white shadow" : ""}`}>
            <div className="container">
                <div className={`coralhub-navbar-wrapper ${isAdminPage ? "admin-wrapper-compact" : ""}`}>
                    
                    {/* LEFT SIDE */}
                    <div className="d-flex align-items-center gap-4">
                        {/* LOGO */}
                        <Link to="/" className="coralhub-logo" aria-label="CoralHub homepage">
                            <img
                                src="/src/front/assets/img/CoralHub_logo.png"
                                alt="CoralHub"
                                className="coralhub-logo-img"
                                style={isAdminPage ? { maxHeight: "32px", width: "auto", filter: "brightness(0) invert(1)" } : {}}
                            />
                        </Link>

                        {/* CATEGORIES - Oculto si es Admin */}
                        {!isAdminPage && (
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
                                <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                                    <li><Link to="/category/Corals" className="dropdown-item">Corals</Link></li>
                                    <li><Link to="/category/Equipment" className="dropdown-item">Equipment</Link></li>
                                    <li><Link to="/category/Aquariums" className="dropdown-item">Aquariums</Link></li>
                                    <li><Link to="/category/Lighting" className="dropdown-item">Lighting</Link></li>
                                    <li><Link to="/category/Used" className="dropdown-item">Used</Link></li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* SEARCH BAR - Oculto si es Admin */}
                    {!isAdminPage && (
                        <form onSubmit={handleSearch} className="coralhub-search-wrapper d-none d-lg-flex" role="search" aria-label="Product search">
                            <input
                                type="search"
                                placeholder="Search corals, fish, lights..."
                                className="coralhub-search-input"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                aria-label="Search products"
                            />
                            <button type="submit" className="coralhub-search-btn" aria-label="Submit search">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    )}

                    {/* RIGHT SIDE (Escritorio) */}
                    <div className="d-none d-lg-flex align-items-center gap-3">
                        {isAdminPage ? (
                            // 👇 ENLACES EXCLUSIVOS PARA CUANDO ESTÁ EN EL DASHBOARD DE ADMIN
                            <>
                                <Link to="/admin/dashboard" className="text-white text-decoration-none fw-bold px-2">
                                    Admin Dashboard
                                </Link>
                                <Link to="/admin/tickets" className="text-white-50 text-decoration-none px-2 hover-white">
                                    My Tickets
                                </Link>
                                <Link to="/admin/claims" className="text-white-50 text-decoration-none px-2 hover-white">
                                    My Claims
                                </Link>
                                <button onClick={() => navigate("/")} className="btn btn-sm btn-outline-light ms-3">
                                    Exit View
                                </button>
                            </>
                        ) : (
                            // 👇 ENLACES DEL NAVBAR COMERCIAL NORMAL
                            token ? (
                                <>
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
                                        <Link to="/admin/dashboard" className="nav-link-custom admin-link">
                                            <i className="fa-solid fa-users-gear me-1"></i>Admin Dashboard
                                        </Link>
                                    )}
                                    <Link to="/dashboard" className="nav-link-custom">My Dashboard</Link>
                                    <Link to="/profile" className="nav-link-custom">My Profile</Link>
                                    <Link to="/cart" className="nav-link-custom position-relative" aria-label="Shopping cart">
                                        <i className="fa-solid fa-cart-shopping me-1"></i>Cart
                                        {store.cart && store.cart.length > 0 && (
                                            <span className="badge bg-danger ms-1">{store.cart.length}</span>
                                        )}
                                    </Link>
                                    <button onClick={handleLogout} className="signin-btn" aria-label="Log out">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="signin-btn">Sign in</Link>
                                    <Link to="/signup" className="signup-btn">Sign up</Link>
                                </>
                            )
                        )}
                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button className="navbar-hamburger d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNavbar">
                        <i className="fa-solid fa-bars"></i>
                    </button>

                </div>
            </div>

            {/* MOBILE MENU */}
            <div className="collapse mobile-navbar-menu" id="mobileNavbar">
                <div className="mobile-navbar-content">
                    {/* Se mantiene tu misma lógica existente para móviles */}
                    <Link to="/" className="mobile-nav-link">Explore</Link>
                    {token && <button onClick={handleLogout} className="mobile-signup-btn">Logout</button>}
                </div>
            </div>
        </nav>
    );
};