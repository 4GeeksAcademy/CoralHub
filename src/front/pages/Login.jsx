import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {

    const navigate = useNavigate();

    // STATES
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // LOGIN
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                import.meta.env.VITE_BACKEND_URL + "/api/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );

            const data = await response.json();

            console.log(data);

            // SI LOGIN FUNCIONA
            if (response.ok) {

                // guardar token
                localStorage.setItem("token", data.token);

                // guardar usuario opcionalmente
                localStorage.setItem(
                    "user",
                    JSON.stringify(data.user)
                );

                alert("Login successful");

                // redirect
                navigate("/private");

            } else {

                alert(data.msg);

            }

        } catch (error) {

            console.log(error);
            alert("Server error");

        }
    };

    return (

        <div className="container mt-5">

            <h1>Log In</h1>

            <form onSubmit={handleSubmit}>

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
                    Login
                </button>

            </form>

        </div>
    );
};