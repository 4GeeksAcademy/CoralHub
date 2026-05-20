import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            const backendUrl = import.meta.env.VITE_BACKEND_URL;
            const token = localStorage.getItem("token");

            // Seguridad en Frontend: si no hay token, redirigir
            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch(`${backendUrl}/api/users`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                });

                const data = await response.json();

                if (!response.ok) {
                    setError(data.msg || "Incapaz de obtener los usuarios.");
                    setLoading(false);
                    return;
                }

                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError("Ocurrió un error en el servidor.");
                setLoading(false);
            }
        };

        fetchUsers();
    }, [navigate]);

    return (
        <main className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 className="h2 text-white">Panel de Administración</h1>
                    <p className="text-secondary">Lista global de usuarios registrados en CoralHub</p>
                </div>
                <span className="badge bg-primary fs-6">Total: {users.length}</span>
            </div>

            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="text-center text-white my-5">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Cargando...</span>
                    </div>
                </div>
            ) : (
                <div className="card bg-dark border-secondary shadow">
                    <div className="table-responsive">
                        <table className="table table-dark table-hover mb-0 align-middle">
                            <thead className="table-secondary">
                                <tr>
                                    <th scope="col" className="ps-4">ID</th>
                                    <th scope="col">Nombre Completo</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Rol</th>
                                    <th scope="col" className="pe-4">Fecha de Registro</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="ps-4 fw-bold text-secondary">#{user.id}</td>
                                        <td>{user.first_name} {user.last_name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`badge ${user.role === 'admin' ? 'bg-danger' :
                                                user.role === 'seller' ? 'bg-warning text-dark' : 'bg-info text-dark'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="pe-4 text-secondary">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </main>
    );
};