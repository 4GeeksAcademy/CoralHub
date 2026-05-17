import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

    const navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firt_name, setFirsName] = useState("");
    const [last_name, setLastName] = useState("");

    // FUNCION DEL FORM
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {

                alert("Usuario creado correctamente");

                // REDIRECCION
                navigate("/signin");

            } else {

                alert(data.msg);

            }

        } catch (error) {

            console.log(error);
            alert("Error en el servidor");

        }
    };

    return (

        <div className="container mt-5">

            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>

                {/* FIRST NAME */}
                <div className="mb-3">

                    <label className="form-label">
                        First name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={first_name}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                </div>

                {/* LAST NAME */}
                <div className="mb-3">

                    <label className="form-label">
                        Last name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                    />

                </div>

                {/* EMAIL */}
                <div className="mb-3">

                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </div>

                {/* PASSWORD */}
                <div className="mb-3">

                    <label className="form-label">
                        Password
                    </label>

                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                </div>

                <button className="btn btn-primary">
                    Create account
                </button>

            </form>

        </div>
    );
};