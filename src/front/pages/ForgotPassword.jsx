import React, { useState } from "react";
import { Link } from "react-router-dom"; 

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [emailSent, setEmailSent] = useState(false); // Nuevo estado

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            setEmailSent(true); // Cambiamos el estado a true
            setMessage("We just sent you an email with a code");
        }
    };

    return (
        <div className="container mt-5">
            {!emailSent ? (
                // FORMULARIO DE ENVÍO
                <form onSubmit={handleSubmit}>
                    <h2>Password Recovery</h2>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Introduce tu email" required />
                    <button type="submit" className="btn btn-primary mt-3">Send code</button>
                </form>
            ) : (
                // MENSAJE DE ÉXITO Y BOTÓN DE REDIRECCIÓN
                <div className="alert alert-success">
                    <p>{message}</p>
                    <p>If you have code, continue here:</p>
                    <Link to="/reset-password" className="btn btn-success">
                        Go to reset passwordd
                    </Link>
                </div>
            )}
        </div>
    );
};