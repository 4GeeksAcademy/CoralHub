import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    successAlert,
    errorAlert,
    confirmAlert
} from "../utils/alerts";

export const AdminDashboard = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const currentUser = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user"))
        : null;

    const [stats, setStats] = useState({
        users_count: 0,
        products_count: 0,
        orders_count: 0,
        tickets_count: 0
    });

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentView, setCurrentView] = useState("overview");

    const getInitials = () => {
        if (!currentUser?.email) return "AD";
        return currentUser.email.substring(0, 2).toUpperCase();
    };

    useEffect(() => {
        if (!token || currentUser?.role !== "admin") {
            navigate("/login");
            return;
        }

        const fetchAdminData = async () => {
            try {
                const statsRes = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard-stats`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const usersRes = await fetch(
                    `${import.meta.env.VITE_BACKEND_URL}/api/admin/users`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const statsData = await statsRes.json();
                const usersData = await usersRes.json();

                if (!statsRes.ok) {
                    throw new Error(statsData.error || "Error loading admin stats.");
                }

                if (!usersRes.ok) {
                    throw new Error(usersData.error || "Error loading admin users.");
                }

                setStats({
                    users_count: statsData.users_count || 0,
                    products_count: statsData.products_count || 0,
                    orders_count: statsData.orders_count || 0,
                    tickets_count: statsData.tickets_count || 0
                });

                setUsers(Array.isArray(usersData) ? usersData : []);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();

    }, [token, navigate, currentUser?.role]);

    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/role`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        role: newRole
                    })
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to update user role");
            }

            setUsers(
                users.map((user) =>
                    user.id === userId
                        ? { ...user, role: newRole }
                        : user
                )
            );

            successAlert(
                "Role Updated",
                "User role updated successfully."
            );

        } catch (err) {
            errorAlert(
                "Update Failed",
                err.message
            );
        }
    };

    const handleDeleteUser = async (userId, userEmail) => {
        const result = await confirmAlert(
            "Delete User",
            `Are you sure you want to permanently delete ${userEmail}?`
        );

        if (!result.isConfirmed) return;

        try {
            const res = await fetch(
                `${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Failed to delete user");
            }

            setUsers(users.filter((user) => user.id !== userId));

            setStats((prev) => ({
                ...prev,
                users_count: Math.max(prev.users_count - 1, 0)
            }));

            successAlert(
                "User Deleted",
                "User deleted successfully."
            );

        } catch (err) {
            errorAlert(
                "Delete Failed",
                err.message
            );
        }
    };

    if (loading) {
        return (
            <div className="container text-center my-5">
                <div className="spinner-border text-primary"></div>
                <p className="mt-3">Loading admin dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">
                    <h5 className="fw-bold">Admin Dashboard Error</h5>
                    <p className="mb-2">{error}</p>
                    <p className="mb-0">
                        Make sure you are logged in with a real admin account from the backend.
                    </p>
                </div>

                <button
                    className="btn btn-dark"
                    onClick={() => navigate("/login")}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <div className="container-fluid p-0">
            <div className="row g-0">

                {/* SIDEBAR */}
                <div className="col-md-3 col-lg-2 p-3 min-vh-100">
                    <div
                        className="d-flex flex-column p-4 h-100 shadow-lg"
                        style={{
                            backgroundColor: "#031525",
                            borderRadius: "24px",
                            color: "#ffffff"
                        }}
                    >

                        <div className="text-center mb-4 pt-2">
                            <div
                                className="d-flex align-items-center justify-content-center mx-auto mb-3 fw-bold"
                                style={{
                                    width: "85px",
                                    height: "85px",
                                    borderRadius: "50%",
                                    backgroundColor: "#14a39a",
                                    fontSize: "24px",
                                    letterSpacing: "1px",
                                    boxShadow: "0 0 20px rgba(20, 163, 154, 0.3)"
                                }}
                            >
                                {getInitials()}
                            </div>

                            <h5 className="mb-1 fw-bold" style={{ fontSize: "16px" }}>
                                Admin Account
                            </h5>

                            <p
                                className="text-truncate px-2 mb-0"
                                style={{ color: "#8a9ba8", fontSize: "13px" }}
                            >
                                {currentUser?.email}
                            </p>
                        </div>

                        <hr style={{ borderColor: "rgba(255,255,255,0.1)", margin: "15px 0" }} />

                        <ul className="nav nav-pills flex-column gap-2 mb-auto">

                            <li className="nav-item">
                                <button
                                    onClick={() => setCurrentView("overview")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={
                                        currentView === "overview"
                                            ? {
                                                backgroundColor: "rgba(20, 163, 154, 0.15)",
                                                border: "1px solid #14a39a",
                                                color: "#ffffff",
                                                borderRadius: "12px",
                                                fontWeight: "600"
                                            }
                                            : {
                                                backgroundColor: "transparent",
                                                color: "#b0c1d1",
                                                borderRadius: "12px"
                                            }
                                    }
                                >
                                    <i className="fa-solid fa-chart-pie"></i>
                                    Overview
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={() => navigate("/admin/tickets")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#b0c1d1",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <i className="fa-solid fa-ticket"></i>
                                    Tickets
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={() => navigate("/my-claims")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#b0c1d1",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <i className="fa-solid fa-triangle-exclamation"></i>
                                    Claims Log
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={() => setCurrentView("overview")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#b0c1d1",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <i className="fa-solid fa-users"></i>
                                    Manage Users
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={() => navigate("/admin/orders")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#b0c1d1",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <i className="fa-solid fa-box"></i>
                                    Orders
                                </button>
                            </li>

                            <li className="nav-item">
                                <button
                                    onClick={() => navigate("/addproduct")}
                                    className="nav-link w-100 text-start d-flex align-items-center gap-3 py-2 px-3 border-0"
                                    style={{
                                        backgroundColor: "transparent",
                                        color: "#b0c1d1",
                                        borderRadius: "12px"
                                    }}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                    Add Product
                                </button>
                            </li>
                        </ul>

                        <div
                            className="pt-3 border-top"
                            style={{ borderColor: "rgba(255,255,255,0.1)" }}
                        >
                            <div className="text-center small" style={{ color: "#6b7c96" }}>
                                <span className="badge bg-danger px-2 py-1">
                                    Admin Panel
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MAIN CONTENT */}
                <div className="col-md-9 col-lg-10 p-4 p-md-5">

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="m-0 fw-bold">
                            <i className="fa-solid fa-chart-line me-2 text-danger"></i>
                            Admin Dashboard
                        </h2>

                        <span className="badge bg-success px-3 py-2 rounded-pill">
                            System Online
                        </span>
                    </div>

                    {/* STATS CARDS */}
                    <div className="row g-4 mb-5">

                        <div className="col-md-3">
                            <div className="card bg-primary text-white border-0 shadow-sm h-100">
                                <div className="card-body d-flex align-items-center justify-content-between py-4">
                                    <div>
                                        <h6 className="text-uppercase mb-1 small text-white-50 fw-bold">
                                            Registered Users
                                        </h6>
                                        <h2 className="mb-0 fw-bold">
                                            {stats.users_count}
                                        </h2>
                                    </div>
                                    <i className="fa-solid fa-users fa-2x text-white-50"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card bg-success text-white border-0 shadow-sm h-100">
                                <div className="card-body d-flex align-items-center justify-content-between py-4">
                                    <div>
                                        <h6 className="text-uppercase mb-1 small text-white-50 fw-bold">
                                            Total Orders
                                        </h6>
                                        <h2 className="mb-0 fw-bold">
                                            {stats.orders_count}
                                        </h2>
                                    </div>
                                    <i className="fa-solid fa-bag-shopping fa-2x text-white-50"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card bg-warning text-dark border-0 shadow-sm h-100">
                                <div className="card-body d-flex align-items-center justify-content-between py-4">
                                    <div>
                                        <h6 className="text-uppercase mb-1 small text-dark-50 fw-bold">
                                            Products
                                        </h6>
                                        <h2 className="mb-0 fw-bold">
                                            {stats.products_count}
                                        </h2>
                                    </div>
                                    <i className="fa-solid fa-store fa-2x text-dark-50"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-3">
                            <div className="card bg-danger text-white border-0 shadow-sm h-100">
                                <div className="card-body d-flex align-items-center justify-content-between py-4">
                                    <div>
                                        <h6 className="text-uppercase mb-1 small text-white-50 fw-bold">
                                            Support Tickets
                                        </h6>
                                        <h2 className="mb-0 fw-bold">
                                            {stats.tickets_count}
                                        </h2>
                                    </div>
                                    <i className="fa-solid fa-ticket fa-2x text-white-50"></i>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* USERS MANAGEMENT */}
                    <div className="card border-0 shadow-sm">
                        <div className="card-header bg-white py-3 border-bottom">
                            <h5 className="mb-0 fw-bold text-secondary">
                                <i className="fa-solid fa-user-gear me-2"></i>
                                Manage User Roles & Accounts
                            </h5>
                        </div>

                        <div className="card-body p-0 bg-white">
                            <div className="table-responsive">
                                <table className="table table-hover align-middle mb-0">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Email / Username</th>
                                            <th>Current Role</th>
                                            <th className="text-end px-4">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {users.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center py-4 text-muted">
                                                    No users found.
                                                </td>
                                            </tr>
                                        ) : (
                                            users.map((user) => (
                                                <tr key={user.id}>
                                                    <td>{user.id}</td>

                                                    <td>
                                                        <span className="fw-semibold text-dark">
                                                            {user.email}
                                                        </span>
                                                    </td>

                                                    <td>
                                                        <span
                                                            className={`badge px-2 py-1 rounded ${user.role === "admin"
                                                                    ? "bg-danger"
                                                                    : user.role === "seller"
                                                                        ? "bg-info text-dark"
                                                                        : "bg-secondary"
                                                                }`}
                                                        >
                                                            {user.role}
                                                        </span>
                                                    </td>

                                                    <td className="text-end px-4" style={{ maxWidth: "250px" }}>
                                                        <div className="d-flex justify-content-end align-items-center gap-2">
                                                            <select
                                                                className="form-select form-select-sm w-auto"
                                                                value={user.role}
                                                                disabled={user.id === currentUser?.id}
                                                                onChange={(e) =>
                                                                    handleRoleChange(user.id, e.target.value)
                                                                }
                                                            >
                                                                <option value="buyer">Buyer</option>
                                                                <option value="seller">Seller</option>
                                                                <option value="admin">Admin</option>
                                                            </select>

                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                disabled={user.id === currentUser?.id}
                                                                onClick={() =>
                                                                    handleDeleteUser(user.id, user.email)
                                                                }
                                                                title="Delete User permanently"
                                                            >
                                                                <i className="fa-solid fa-trash-can"></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};