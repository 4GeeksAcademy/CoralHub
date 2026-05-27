import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Cookies = () => {
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
                    <h1 className="legal-title">Cookie Policy</h1>
                    <p className="legal-updated">Last updated: May 26, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. What Are Cookies?</h2>
                        <p>
                            Cookies are small text files that websites store on your device
                            (computer, tablet, or phone) when you visit them. They help us
                            recognize you, remember your preferences, and improve your
                            experience on <strong>CoralHub</strong>.
                        </p>
                    </section>

                    <section>
                        <h2>2. Why We Use Cookies</h2>
                        <p>At CoralHub, we use cookies to:</p>
                        <ul>
                            <li>Keep you signed in during your session.</li>
                            <li>Remember the items in your shopping cart.</li>
                            <li>Save your language and display preferences.</li>
                            <li>Analyze how visitors use our marketplace to improve it.</li>
                            <li>Show you relevant products based on your interests.</li>
                            <li>Prevent fraud and enhance security.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>3. Types of Cookies We Use</h2>

                        <h3 style={{ fontSize: "18px", color: "#0d2238", marginTop: "16px", marginBottom: "8px" }}>
                            🔒 Essential Cookies
                        </h3>
                        <p>
                            These cookies are necessary for the website to function and cannot
                            be turned off. They include authentication, shopping cart, and
                            security cookies.
                        </p>

                        <h3 style={{ fontSize: "18px", color: "#0d2238", marginTop: "16px", marginBottom: "8px" }}>
                            📊 Analytics Cookies
                        </h3>
                        <p>
                            We use tools like Google Analytics to understand how users
                            interact with CoralHub. These cookies collect anonymous data such
                            as pages visited, time spent, and traffic sources.
                        </p>

                        <h3 style={{ fontSize: "18px", color: "#0d2238", marginTop: "16px", marginBottom: "8px" }}>
                            🎯 Functional Cookies
                        </h3>
                        <p>
                            These cookies remember your preferences (language, currency,
                            region) to deliver a personalized experience every time you
                            return.
                        </p>

                        <h3 style={{ fontSize: "18px", color: "#0d2238", marginTop: "16px", marginBottom: "8px" }}>
                            📢 Marketing Cookies
                        </h3>
                        <p>
                            Used to show you relevant ads based on your browsing on CoralHub
                            and other partner sites. You can disable these at any time.
                        </p>
                    </section>

                    <section>
                        <h2>4. Third-Party Cookies</h2>
                        <p>
                            Some cookies are placed by trusted third-party services we use:
                        </p>
                        <ul>
                            <li><strong>Google Analytics:</strong> traffic and behavior analysis.</li>
                            <li><strong>Stripe:</strong> secure payment processing.</li>
                            <li><strong>Cloudinary:</strong> optimized image delivery.</li>
                            <li><strong>Meta Pixel:</strong> ad campaign tracking on Facebook/Instagram.</li>
                        </ul>
                        <p>
                            These third parties have their own privacy and cookie policies,
                            which we recommend you review.
                        </p>
                    </section>

                    <section>
                        <h2>5. How Long Do Cookies Last?</h2>
                        <ul>
                            <li><strong>Session cookies:</strong> deleted automatically when you close the browser.</li>
                            <li><strong>Persistent cookies:</strong> stay on your device between 30 days and 2 years, depending on the type.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. How to Manage or Disable Cookies</h2>
                        <p>
                            You can control or delete cookies at any time. Here's how to do it
                            in the main browsers:
                        </p>
                        <ul>
                            <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                            <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
                            <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                            <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                        </ul>
                        <p>
                            <strong>⚠️ Note:</strong> If you disable essential cookies, some
                            features of CoralHub may not work correctly (such as signing in or
                            adding items to your cart).
                        </p>
                    </section>

                    <section>
                        <h2>7. Your Consent</h2>
                        <p>
                            When you visit CoralHub for the first time, we'll show you a
                            banner asking for your consent to use non-essential cookies. You
                            can change your preferences anytime from the settings of your
                            account.
                        </p>
                    </section>

                    <section>
                        <h2>8. Changes to This Policy</h2>
                        <p>
                            We may update this Cookie Policy occasionally to reflect changes
                            in our practices or for legal reasons. We will notify you of
                            significant changes by email or on the platform.
                        </p>
                    </section>

                    <section>
                        <h2>9. Contact</h2>
                        <p>
                            If you have questions about our cookie usage, write to us at{" "}
                            <a href="mailto:privacy@coralhub.com">privacy@coralhub.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};