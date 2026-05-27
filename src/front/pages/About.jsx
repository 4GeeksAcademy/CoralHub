import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const About = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="about-page">
            {/* ===== HERO ===== */}
            <section className="about-hero">
                <div className="container">
                    <Link to="/" className="legal-back about-back">
                        <i className="fas fa-arrow-left"></i> Back to home
                    </Link>
                    <span className="about-eyebrow">Our Story</span>
                    <h1 className="about-title">
                        We connect the <span className="highlight">marine community</span> in
                        one place.
                    </h1>
                    <p className="about-lead">
                        CoralHub was born from a simple idea: make it easy for aquarists
                        around the world to find the best corals, fish, and equipment from
                        trusted sellers. We are a community, not just a marketplace.
                    </p>
                </div>
            </section>

            {/* ===== STATS ===== */}
            <section className="about-stats-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-3 col-6">
                            <div className="about-stat">
                                <div className="about-stat-num">2K+</div>
                                <div className="about-stat-label">Active Sellers</div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="about-stat">
                                <div className="about-stat-num">50K+</div>
                                <div className="about-stat-label">Happy Aquarists</div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="about-stat">
                                <div className="about-stat-num">120K+</div>
                                <div className="about-stat-label">Live Specimens Shipped</div>
                            </div>
                        </div>
                        <div className="col-md-3 col-6">
                            <div className="about-stat">
                                <div className="about-stat-num">4.9★</div>
                                <div className="about-stat-label">Average Rating</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== MISSION + VISION ===== */}
            <section className="about-section">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-md-6">
                            <div className="about-card">
                                <div className="about-card-icon">🎯</div>
                                <h3>Our Mission</h3>
                                <p>
                                    To democratize access to the marine aquarium hobby by
                                    connecting passionate sellers with curious aquarists, offering
                                    a safe, transparent, and reliable platform for everyone.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="about-card">
                                <div className="about-card-icon">🌊</div>
                                <h3>Our Vision</h3>
                                <p>
                                    To be the global reference marketplace for the marine
                                    aquarium community, promoting responsible practices and
                                    contributing to ocean conservation through education and
                                    ethical sales.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== VALUES ===== */}
            <section className="about-section about-values">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="about-eyebrow">What Drives Us</span>
                        <h2 className="about-section-title">Our Values</h2>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">🐠</div>
                                <h4>Animal Welfare</h4>
                                <p>
                                    We only allow sellers who guarantee ethical practices and
                                    proper care for live specimens.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">🤝</div>
                                <h4>Trusted Community</h4>
                                <p>
                                    We verify every seller and review every transaction so you
                                    can buy with confidence.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">🌱</div>
                                <h4>Sustainability</h4>
                                <p>
                                    We promote responsible aquaculture and prioritize farmed
                                    specimens over wild collection.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">💡</div>
                                <h4>Continuous Education</h4>
                                <p>
                                    We share guides, articles, and resources to help aquarists at
                                    every experience level.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">🔒</div>
                                <h4>Security First</h4>
                                <p>
                                    Secure payments, privacy protection, and Live Arrival
                                    Guarantee on every order.
                                </p>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="about-value">
                                <div className="about-value-icon">⚡</div>
                                <h4>Constant Innovation</h4>
                                <p>
                                    We constantly improve the platform with feedback from our
                                    community of buyers and sellers.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== TEAM ===== */}
            <section className="about-section">
                <div className="container">
                    <div className="text-center mb-5">
                        <span className="about-eyebrow">The Team Behind CoralHub</span>
                        <h2 className="about-section-title">Meet the Founders</h2>
                        <p className="about-section-lead">
                            A multidisciplinary team of developers and aquarium enthusiasts
                            from 4Geeks Academy who built CoralHub from scratch.
                        </p>
                    </div>

                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="about-team-card">
                                <div className="about-team-avatar">AL</div>
                                <h4>Ana López</h4>
                                <p className="about-team-role">Full Stack Developer</p>
                                <p className="about-team-bio">
                                    Specialist in UI/UX design and frontend development. Passionate
                                    about creating accessible and beautiful user experiences.
                                </p>
                                <div className="about-team-socials">
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="about-team-card">
                                <div className="about-team-avatar">JM</div>
                                <h4>Juan Masís</h4>
                                <p className="about-team-role">Full Stack Developer</p>
                                <p className="about-team-bio">
                                    Expert in React and frontend architecture. Lover of saltwater
                                    aquariums and reef ecosystems.
                                </p>
                                <div className="about-team-socials">
                                    <a href="https://github.com/juanMasis777" target="_blank" rel="noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="about-team-card">
                                <div className="about-team-avatar">PC</div>
                                <h4>Pedro Chávez</h4>
                                <p className="about-team-role">Full Stack Developer</p>
                                <p className="about-team-bio">
                                    Backend specialist with Flask and Python. Builds robust APIs
                                    and database systems that scale.
                                </p>
                                <div className="about-team-socials">
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href="#" target="_blank" rel="noreferrer">
                                        <i className="fab fa-linkedin"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="about-cta">
                <div className="container">
                    <div className="about-cta-box">
                        <h2>Ready to join the community?</h2>
                        <p>
                            Whether you're starting your first aquarium or have years of
                            experience, we have everything you need.
                        </p>
                        <div className="about-cta-buttons">
                            <Link to="/signup" className="about-btn about-btn-primary">
                                Create Account
                            </Link>
                            <Link to="/search" className="about-btn about-btn-ghost">
                                Browse Products
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};