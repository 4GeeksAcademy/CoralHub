import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="legal-page">
            <div className="container py-5">
                <div className="legal-header">
                    <Link to="/" className="legal-back">
                        <i className="fas fa-arrow-left"></i> Back to home
                    </Link>
                    <h1 className="legal-title">Privacy Policy</h1>
                    <p className="legal-updated">Last updated: May 26, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Introduction</h2>
                        <p>
                            At <strong>CoralHub</strong>, we respect your privacy and are
                            committed to protecting the personal data you share with us. This
                            policy describes how we collect, use, store, and protect your
                            information when you use our marine aquarium marketplace.
                        </p>
                    </section>

                    <section>
                        <h2>2. Information We Collect</h2>
                        <p>To provide you with the best experience, we collect the following data:</p>
                        <ul>
                            <li><strong>Account data:</strong> name, email address, encrypted password, and phone number.</li>
                            <li><strong>Transaction data:</strong> shipping address, products purchased, order history.</li>
                            <li><strong>Payment data:</strong> securely processed by external providers (Stripe). CoralHub <em>never</em> stores your full card number.</li>
                            <li><strong>Usage data:</strong> pages visited, products viewed, searches performed to improve your experience.</li>
                            <li><strong>Technical data:</strong> IP address, browser type, operating system, and cookies.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. How We Use Your Information</h2>
                        <p>We use your information to:</p>
                        <ul>
                            <li>Process and deliver your orders of corals, fish, and accessories.</li>
                            <li>Communicate the status of your purchases and shipments.</li>
                            <li>Improve our products and services through usage analysis.</li>
                            <li>Send personalized offers (only with your consent).</li>
                            <li>Prevent fraud and ensure platform security.</li>
                            <li>Comply with legal and tax obligations.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Sharing Information with Third Parties</h2>
                        <p>
                            <strong>We do not sell your personal information.</strong> We only
                            share data with trusted third parties when strictly necessary:
                        </p>
                        <ul>
                            <li><strong>Sellers:</strong> only your name and shipping address to process your order.</li>
                            <li><strong>Payment services:</strong> Stripe processes transactions securely.</li>
                            <li><strong>Shipping services:</strong> FedEx, UPS, USPS to deliver your products.</li>
                            <li><strong>Authorities:</strong> only when required by law.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Cookies and Similar Technologies</h2>
                        <p>
                            We use cookies to improve your browsing experience, remember your
                            cart, keep your session active, and analyze traffic. You can manage
                            your cookie preferences anytime from your browser settings.
                        </p>
                    </section>

                    <section>
                        <h2>6. Data Security</h2>
                        <p>
                            We implement technical and organizational measures to protect your
                            information: SSL/TLS encryption, passwords hashed with bcrypt, JWT
                            authentication, and restricted access to authorized personnel only.
                        </p>
                    </section>

                    <section>
                        <h2>7. Your Rights</h2>
                        <p>As a CoralHub user, you have the right to:</p>
                        <ul>
                            <li><strong>Access</strong> the personal data we have about you.</li>
                            <li><strong>Rectify</strong> incorrect or outdated information.</li>
                            <li><strong>Delete</strong> your account and personal data.</li>
                            <li><strong>Object</strong> to processing of your data for marketing.</li>
                            <li><strong>Portability</strong> of your data to another service.</li>
                        </ul>
                        <p>
                            To exercise any of these rights, contact us at{" "}
                            <a href="mailto:privacy@coralhub.com">privacy@coralhub.com</a>.
                        </p>
                    </section>

                    <section>
                        <h2>8. Minors</h2>
                        <p>
                            CoralHub is not directed to individuals under 18. We do not
                            intentionally collect data from minors. If we discover that a minor
                            has registered, we will immediately delete their account.
                        </p>
                    </section>

                    <section>
                        <h2>9. Changes to This Policy</h2>
                        <p>
                            We may update this policy occasionally. We will notify you of any
                            significant changes by email or through a notice on the platform.
                        </p>
                    </section>

                    <section>
                        <h2>10. Contact</h2>
                        <p>
                            If you have questions about this policy, contact us at:
                        </p>
                        <ul>
                            <li><strong>Email:</strong> <a href="mailto:privacy@coralhub.com">privacy@coralhub.com</a></li>
                            <li><strong>Address:</strong> Miami, Florida, USA</li>
                        </ul>
                    </section>
                </div>
            </div>
        </div>
    );
};