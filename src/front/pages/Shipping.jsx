import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Shipping = () => {
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
                    <h1 className="legal-title">Shipping & Delivery</h1>
                    <p className="legal-updated">
                        Everything you need to know about how we ship your order safely.
                    </p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>🚚 Shipping Methods</h2>
                        <p>
                            At <strong>CoralHub</strong>, we offer multiple shipping options
                            to fit your needs. All live specimens are shipped via overnight
                            service to guarantee their safety.
                        </p>
                        <ul>
                            <li><strong>Standard Shipping (3-5 business days):</strong> for dry goods, equipment, and accessories only. Starting at $7.99.</li>
                            <li><strong>Express Shipping (2 business days):</strong> for dry goods. Starting at $14.99.</li>
                            <li><strong>Overnight Shipping (next business day):</strong> required for all live specimens. Starting at $39.99.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>🐠 Live Specimen Shipping</h2>
                        <p>
                            All live corals, fish, and invertebrates require special handling:
                        </p>
                        <ul>
                            <li>Shipments are made <strong>Monday through Wednesday only</strong> to avoid weekend transit delays.</li>
                            <li>Specimens are packed in <strong>insulated boxes</strong> with heat or cool packs depending on the season.</li>
                            <li>Each bag is filled with <strong>pure oxygen</strong> to ensure survival during transit.</li>
                            <li>You must be <strong>present to receive the package</strong> or coordinate with your carrier.</li>
                            <li>Cutoff time for next-day shipping is <strong>2:00 PM EST</strong>.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>✅ Live Arrival Guarantee</h2>
                        <p>
                            We back every live order with our <strong>Live Arrival Guarantee</strong>.
                            If your specimen arrives DOA (Dead on Arrival):
                        </p>
                        <ul>
                            <li>Report the issue within <strong>2 hours of delivery</strong>.</li>
                            <li>Submit clear photos and a short unboxing video.</li>
                            <li>We'll process a <strong>full refund or replacement within 24 hours</strong>.</li>
                        </ul>
                        <p>
                            <em>Note: the guarantee doesn't cover losses due to improper acclimation
                                or refused delivery.</em>
                        </p>
                    </section>

                    <section>
                        <h2>📦 Order Tracking</h2>
                        <p>
                            Once your order ships, you'll receive an email with a tracking
                            number. You can also track your order anytime from your account
                            under <strong>"My Orders"</strong>.
                        </p>
                    </section>

                    <section>
                        <h2>🌎 Shipping Destinations</h2>
                        <p>
                            We currently ship within the <strong>Continental United States</strong> only.
                            Due to strict regulations on marine organisms, we don't ship to:
                        </p>
                        <ul>
                            <li>Alaska and Hawaii</li>
                            <li>Puerto Rico and US territories</li>
                            <li>International destinations</li>
                        </ul>
                        <p>We're working on expanding to Canada and Mexico in 2026. Stay tuned!</p>
                    </section>

                    <section>
                        <h2>⏰ Processing Times</h2>
                        <p>
                            Most orders are processed and shipped within <strong>1-2 business days</strong>.
                            During peak periods (holidays, sales events), processing may take up to 3
                            business days. You'll receive an email notification once your order ships.
                        </p>
                    </section>

                    <section>
                        <h2>💰 Free Shipping</h2>
                        <p>
                            Enjoy <strong>FREE standard shipping</strong> on orders over $100 (dry goods
                            only). Live specimens always require overnight shipping for their safety.
                        </p>
                    </section>

                    <section>
                        <h2>📞 Questions?</h2>
                        <p>
                            Need help with shipping? Contact us at{" "}
                            <a href="mailto:shipping@coralhub.com">shipping@coralhub.com</a> or
                            visit our <Link to="/faq">FAQ</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};