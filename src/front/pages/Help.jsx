import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Help = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const topics = [
        {
            icon: "🚀",
            title: "Getting Started",
            description: "New to CoralHub? Learn how to create an account and place your first order.",
            link: "/faq",
        },
        {
            icon: "📦",
            title: "Orders & Shipping",
            description: "Track your order, change your address, or learn about shipping times.",
            link: "/shipping",
        },
        {
            icon: "🔄",
            title: "Returns & Refunds",
            description: "Need to return something? Read our return policy and request process.",
            link: "/returns",
        },
        {
            icon: "🐠",
            title: "Live Arrival Guarantee",
            description: "Everything about our protection for live coral, fish, and invertebrates.",
            link: "/faq",
        },
        {
            icon: "💳",
            title: "Payments & Billing",
            description: "Manage payment methods, billing information, and view invoices.",
            link: "/faq",
        },
        {
            icon: "🏪",
            title: "Selling on CoralHub",
            description: "Learn how to become a seller, manage listings, and earn money.",
            link: "/faq",
        },
        {
            icon: "🔒",
            title: "Account & Security",
            description: "Manage your account settings, password, privacy, and security.",
            link: "/privacy",
        },
        {
            icon: "📚",
            title: "Aquarium Care Guides",
            description: "Tips and tutorials for caring for your saltwater aquarium.",
            link: "/faq",
        },
    ];

    return (
        <div className="legal-page">
            <div className="container py-5">
                <div className="legal-header">
                    <Link to="/" className="legal-back">
                        <i className="fas fa-arrow-left"></i> Back to home
                    </Link>
                    <h1 className="legal-title">Help Center</h1>
                    <p className="legal-updated">
                        How can we help you today? Choose a topic below or contact our team.
                    </p>
                </div>

                <div className="help-grid">
                    {topics.map((topic, idx) => (
                        <Link to={topic.link} key={idx} className="help-card">
                            <div className="help-card-icon">{topic.icon}</div>
                            <h3>{topic.title}</h3>
                            <p>{topic.description}</p>
                            <span className="help-card-arrow">
                                Learn more <i className="fas fa-arrow-right"></i>
                            </span>
                        </Link>
                    ))}
                </div>

                <div className="help-cta">
                    <div className="help-cta-box">
                        <div className="help-cta-icon">💬</div>
                        <h2>Still have questions?</h2>
                        <p>
                            Our friendly support team is ready to help you with anything. We
                            respond within 24 hours on business days.
                        </p>
                        <div className="help-cta-buttons">
                            <Link to="/contact" className="about-btn about-btn-primary">
                                Contact Support
                            </Link>
                            <Link to="/faq" className="about-btn about-btn-ghost-dark">
                                Browse FAQ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};