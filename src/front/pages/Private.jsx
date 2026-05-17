import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const navigate = useNavigate();

    useEffect(() => {

        const token = localStorage.getItem("token");

        // si NO hay token
        if (!token) {
            navigate("/login");
        }

    }, []);

    return (

        <div className="container mt-5">

            <h1>Private Page 🔒</h1>

            <p>
                Only authenticated users can see this page.
            </p>

        </div>
    );
};