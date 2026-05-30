import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDashboard = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Estados de datos
    const [stats, setStats] = useState({ users_count: 0, products_count: 0, orders_count: 0 });
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Protección de Ruta: Si no está logueado o no es admin, redirigir
        if (!token || currentUser?.role !== "admin") {
            navigate("/");
            return;
        }

        const fetchAdminData = async () => {
            try {
                // 1. Cargar Estadísticas del Dashboard
                const statsRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/dashboard-stats`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                // 2. Cargar Lista de Usuarios para gestión de roles
                const usersRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
                    headers: { "Authorization": `Bearer ${token}` }
                });

                if (!statsRes.ok || !usersRes.ok) throw new Error("Error fetching admin dashboard data.");

                const statsData = await statsRes.json();
                const usersData = await usersRes.json();

                setStats(statsData);
                setUsers(usersData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAdminData();
    }, [token, navigate]);

    // Función para cambiar el rol de un usuario desde el Dashboard
    const handleRoleChange = async (userId, newRole) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}/role`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ role: newRole })
            });

            if (!res.ok) throw new Error("Failed to update user role");

            // Actualizar el estado local para reflejar el cambio de rol en la tabla al instante
            setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));

            alert("User role updated successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    // Función para eliminar un usuario de forma permanente
    const handleDeleteUser = async (userId, userEmail) => {
        // Preguntar confirmación antes de borrar
        const confirmDelete = window.confirm(`Are you sure you want to permanently delete user: ${userEmail}?`);
        if (!confirmDelete) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${userId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to delete user");

            // Quitar el usuario eliminado del estado local para que desaparezca de la tabla inmediatamente
            setUsers(users.filter(u => u.id !== userId));

            // Restar 1 al contador de usuarios en las tarjetas
            setStats(prev => ({ ...prev, users_count: prev.users_count - 1 }));

            alert("User deleted successfully!");
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="container text-center my-5"><div className="spinner-border text-primary"></div></div>;
    if (error) return <div className="container my-5"><div className="alert alert-danger">{error}</div></div>;

    return (
        <div className="container my-5">
            <h2 className="mb-4"><i className="fa-solid fa-chart-line me-2 text-danger"></i>Admin Dashboard</h2>

            {/* SECCIÓN 1: TARJETAS DE ESTADÍSTICAS */}
            <div className="row g-4 mb-5">
                <div className="col-md-4">
                    <div className="card bg-primary text-white shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-uppercase mb-1 small text-white-50">Registered Users</h6>
                                <h2 className="mb-0">{stats.users_count}</h2>
                            </div>
                            <i className="fa-solid fa-users fa-2x text-white-50"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-uppercase mb-1 small text-white-50">Total Orders</h6>
                                <h2 className="mb-0">{stats.orders_count}</h2>
                            </div>
                            <i className="fa-solid fa-bag-shopping fa-2x text-white-50"></i>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-dark shadow-sm">
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <div>
                                <h6 className="text-uppercase mb-1 small text-dark-50">Products For Sale</h6>
                                <h2 className="mb-0 fw-bold">{stats.products_count}</h2>
                            </div>
                            <i className="fa-solid fa-store fa-2x text-dark-50"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECCIÓN 2: GESTIÓN DE ROLES Y ELIMINACIÓN */}
            <div className="card shadow-sm">
                <div className="card-header bg-white py-3">
                    <h5 className="mb-0"><i className="fa-solid fa-user-gear me-2 text-secondary"></i>Manage User Roles & Accounts</h5>
                </div>
                <div className="card-body p-0">
                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr>
                                    <th>ID</th>
                                    <th>Email / Username</th>
                                    <th>Current Role</th>
                                    <th className="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>
                                            <span className="fw-semibold">{user.email}</span>
                                        </td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'bg-danger' : user.role === 'seller' ? 'bg-info text-dark' : 'bg-secondary'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="text-end" style={{ maxWidth: "250px" }}>
                                            <div className="d-flex justify-content-end align-items-center gap-2">
                                                {/* Selector dinámico de Roles */}
                                                <select
                                                    className="form-select form-select-sm w-auto"
                                                    value={user.role}
                                                    disabled={user.id === currentUser.id}
                                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                                >
                                                    <option value="buyer">Buyer</option>
                                                    <option value="seller">Seller</option>
                                                    <option value="admin">Admin</option>
                                                </select>

                                                {/* Botón de Eliminar Usuario */}
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    disabled={user.id === currentUser.id}
                                                    onClick={() => handleDeleteUser(user.id, user.email)}
                                                    title="Delete User permanently"
                                                >
                                                    <i className="fa-solid fa-trash-can"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};