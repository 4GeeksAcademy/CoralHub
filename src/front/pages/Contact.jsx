import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "general",
        message: "",
    });
    const [sent, setSent] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Demo: just show success message
        setSent(true);
        setForm({ name: "", email: "", subject: "general", message: "" });
        setTimeout(() => setSent(false), 5000);
    };

    return (
        <div className="legal-page">
            <div className="container py-5">
                <div className="legal-header">
                    <Link to="/" className="legal-back">
                        <i className="fas fa-arrow-left"></i> Back to home
                    </Link>
                    <h1 className="legal-title">Contact Us</h1>
                    <p className="legal-updated">
                        We're here to help. Reach out and we'll respond within 24 hours.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* LEFT: Info cards */}
                    <div className="contact-info">
                        <div className="contact-card">
                            <div className="contact-card-icon">📧</div>
                            <h4>Email</h4>
                            <p>For general inquiries</p>
                            <a href="mailto:hello@coralhub.com">hello@coralhub.com</a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-card-icon">🛟</div>
                            <h4>Support</h4>
                            <p>Need help with an order?</p>
                            <a href="mailto:support@coralhub.com">support@coralhub.com</a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-card-icon">🏪</div>
                            <h4>Sellers</h4>
                            <p>Want to sell on CoralHub?</p>
                            <a href="mailto:sellers@coralhub.com">sellers@coralhub.com</a>
                        </div>

                        <div className="contact-card">
                            <div className="contact-card-icon">📍</div>
                            <h4>Headquarters</h4>
                            <p>
                                Miami, Florida<br />
                                United States
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: Form */}
                    <div className="contact-form-wrapper">
                        <h3 className="contact-form-title">Send us a message</h3>
                        <p className="contact-form-subtitle">
                            Fill out the form and we'll get back to you as soon as possible.
                        </p>

                        {sent && (
                            <div className="contact-success">
                                ✅ Message sent! We'll reply to your email soon.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="contact-field">
                                <label>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div className="contact-field">
                                <label>Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    required
                                />
                            </div>

                            <div className="contact-field">
                                <label>Subject</label>
                                <select
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                >
                                    <option value="general">General inquiry</option>
                                    <option value="support">Order support</option>
                                    <option value="seller">Become a seller</option>
                                    <option value="bug">Report a bug</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="contact-field">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell us how we can help..."
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="about-btn about-btn-primary contact-submit">
                                Send Message <i className="fas fa-paper-plane"></i>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};