import React from "react";
import { Link } from "react-router-dom";

export const CheckoutCancel = () => {
    return (
        <div className="container mt-5 min-vh-100">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
                        <div style={{ fontSize: "5rem" }}>😕</div>

                        <h1 className="fw-bold mt-3 mb-3 text-warning">
                            Pago cancelado
                        </h1>

                        <p className="text-secondary fs-5 mb-4">
                            No se procesó ningún cobro. Tu carrito sigue intacto.
                        </p>

                        <div className="d-flex flex-column gap-2">
                            <Link to="/cart" className="btn btn-dark py-2 rounded-3">
                                Volver al carrito
                            </Link>
                            <Link to="/" className="btn btn-outline-secondary py-2 rounded-3">
                                Seguir comprando
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};