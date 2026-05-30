import { Link, useNavigate, useLocation } from "react-router-dom"; // <-- Añadimos useLocation aquí
import { useState, useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Navbar = () => {

    const navigate = useNavigate();
    const location = useLocation(); // <-- Inicializamos el hook para saber en qué página estamos
    const { store, dispatch } = useGlobalReducer();

    const token = localStorage.getItem("token");

    const [searchTerm, setSearchTerm] = useState("");

    // Verificamos si el usuario está exactamente en la página de administración
    const isAdminPage = location.pathname === "/admin/dashboard";

    // ... (Tu lógica de handleLogout y handleSearch se mantiene exactamente igual) ...
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
        /* Aquí está el truco: Si isAdminPage es true, le inyectamos la clase 'admin-navbar-compact'.
          Si es false, se queda con sus estilos normales de siempre en las otras páginas.
        */
        <nav className={`coralhub-navbar ${isAdminPage ? "admin-navbar-compact py-1" : ""}`}>

            <div className="container">

                {/* Hacemos lo mismo con el wrapper interno */}
                <div className={`coralhub-navbar-wrapper ${isAdminPage ? "admin-wrapper-compact" : ""}`}>

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
                                /* Si estamos en admin, encogemos un poco el logo para que no estire el óvalo */
                                style={isAdminPage ? { maxHeight: "32px", width: "auto" } : {}}
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

                            <ul className="dropdown-menu" aria-labelledby="categoriesDropdown">
                                <li><Link to="/categories/corals" className="dropdown-item">Corals</Link></li>
                                <li><Link to="/categories/equipments" className="dropdown-item">Equipments</Link></li>
                                <li><Link to="/categories/used" className="dropdown-item">Used</Link></li>
                                <li><Link to="/categories/lights" className="dropdown-item">Lights</Link></li>
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
                        <button type="submit" className="coralhub-search-btn" aria-label="Submit search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>

                    {/* RIGHT SIDE */}
                    {/* Si es la página de admin, reducimos un poco el tamaño de letra general de este contenedor */}
                    <div className={`d-none d-lg-flex align-items-center gap-3 ${isAdminPage ? "small-admin-links" : ""}`}>

                        {
                            token ? (
                                <>
                                    {/* DASHBOARD */}
                                    <Link to="/dashboard" className="nav-link-custom">Dashboard</Link>

                                    {/* ADMIN */}
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
                                        <Link to="/admin/dashboard" className="nav-link-custom admin-link">
                                            <i className="fa-solid fa-users-gear me-1"></i>Admin Dashboard
                                        </Link>
                                    )}

                                    {/* SUPPORT TICKETS (ADMIN) */}
                                    {JSON.parse(localStorage.getItem("user"))?.role === "admin" && (
                                        <Link to="/admin/tickets" className="nav-link-custom admin-link">
                                            <i className="fa-solid fa-ticket me-1"></i>Tickets
                                        </Link>
                                    )}

                                    {/* MY CLAIMS (buyer) */}
                                    <Link to="/my-claims" className="nav-link-custom">My Claims</Link>

                                    {/* CLAIMS RECEIVED (seller) */}
                                    <Link to="/seller-claims" className="nav-link-custom">Claims Received</Link>

                                    {/* MY PRODUCTS */}
                                    <Link to="/my-products" className="nav-link-custom">My Products</Link>

                                    {/* CART */}
                                    <Link to="/cart" className="cart-icon position-relative" aria-label="Shopping cart">
                                        <i className="fa-solid fa-cart-shopping"></i>
                                        {store.cart && store.cart.length > 0 && (
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>
                                                {store.cart.length}
                                            </span>
                                        )}
                                    </Link>

                                    {/* LOGOUT */}
                                    <button onClick={handleLogout} className="signin-btn" aria-label="Log out">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="signin-btn">Sign in</Link>
                                    <Link to="/signup" className="signup-btn">Sign up</Link>
                                </>
                            )
                        }

                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button className="navbar-hamburger d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#mobileNavbar">
                        <i className="fa-solid fa-bars"></i>
                    </button>

                </div>

                {/* MOBILE MENU (Se queda igual) */}
                <div className="collapse mobile-navbar-menu" id="mobileNavbar">
                    <div className="mobile-navbar-content">
                        <form onSubmit={handleSearch} className="mobile-search-wrapper">
                            <input type="search" placeholder="Search products..." className="mobile-search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        </form>
                        <Link to="/" className="mobile-nav-link">Explore</Link>
                        <Link to="/categories/corals" className="mobile-nav-link">Corals</Link>
                        <Link to="/categories/equipments" className="mobile-nav-link">Equipments</Link>
                        {token ? (
                            <>
                                <Link to="/private" className="mobile-nav-link">Dashboard</Link>
                                <Link to="/my-products" className="mobile-nav-link">My Products</Link>
                                <Link to="/cart" className="mobile-nav-link position-relative">Cart{store.cart && store.cart.length > 0 && <span className="badge bg-danger ms-2">{store.cart.length}</span>}</Link>
                                <button onClick={handleLogout} className="mobile-signup-btn">Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="mobile-nav-link">Sign in</Link>
                                <Link to="/signup" className="mobile-signup-btn">Sign up</Link>
                            </>
                        )}
                    </div>
                </div>

            </div>

        </nav>
    );
};