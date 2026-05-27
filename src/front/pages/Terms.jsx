import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Terms = () => {
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
                    <h1 className="legal-title">Terms & Conditions</h1>
                    <p className="legal-updated">Last updated: May 26, 2026</p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using <strong>CoralHub</strong>, you accept these
                            Terms and Conditions in their entirety. If you do not agree with
                            any part, you must not use our platform.
                        </p>
                    </section>

                    <section>
                        <h2>2. Service Description</h2>
                        <p>
                            CoralHub is an online marketplace that connects sellers and buyers
                            of marine aquarium products: live corals, fish, invertebrates,
                            equipment, food, and accessories. We act as an intermediary
                            between the parties.
                        </p>
                    </section>

                    <section>
                        <h2>3. Registration and User Account</h2>
                        <ul>
                            <li>You must be at least 18 years old to register.</li>
                            <li>The information you provide must be true and up to date.</li>
                            <li>You are responsible for maintaining the confidentiality of your password.</li>
                            <li>You are responsible for all activity that occurs in your account.</li>
                            <li>Notify us immediately if you suspect unauthorized access to your account.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>4. Purchases and Payments</h2>
                        <p>When you make a purchase on CoralHub:</p>
                        <ul>
                            <li>Prices are shown in US dollars (USD) and include taxes when applicable.</li>
                            <li>Payment is processed securely through Stripe.</li>
                            <li>CoralHub reserves the right to reject or cancel any suspicious order.</li>
                            <li>Once the purchase is confirmed, you will receive an email with the order details.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>5. Live Specimen Shipping</h2>
                        <p>
                            Since we sell live organisms (corals, fish, invertebrates), special
                            conditions apply:
                        </p>
                        <ul>
                            <li>Shipments are made Monday through Wednesday to avoid prolonged transit times.</li>
                            <li>You must be present to receive the package or coordinate with your carrier.</li>
                            <li>We guarantee Live Arrival Guarantee if you report the problem within the first 2 hours after delivery, with photos and unboxing video.</li>
                            <li>The buyer is responsible for properly acclimating the organisms.</li>
                            <li>We are not responsible for losses due to incorrect acclimation.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>6. Returns and Refunds</h2>
                        <p>Due to the nature of our products:</p>
                        <ul>
                            <li><strong>Live organisms:</strong> we do not accept returns, only replacements under the Live Arrival Guarantee.</li>
                            <li><strong>Equipment and accessories:</strong> you have 14 days to return unused products in their original packaging.</li>
                            <li>Return shipping costs are the responsibility of the buyer, unless the product is defective.</li>
                            <li>Refunds are processed within 5-10 business days to the original payment method.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>7. Seller Responsibilities</h2>
                        <p>If you sell on CoralHub, you commit to:</p>
                        <ul>
                            <li>Publish accurate descriptions and real photos of your products.</li>
                            <li>Comply with all reported shipping deadlines.</li>
                            <li>Properly pack live organisms to ensure their survival.</li>
                            <li>Comply with local regulations regarding the sale of marine organisms.</li>
                            <li>Pay the CoralHub commission for each sale made.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>8. Prohibited Conduct</h2>
                        <p>The following is strictly prohibited:</p>
                        <ul>
                            <li>Selling endangered species or those protected by CITES without permits.</li>
                            <li>Publishing false, fraudulent, or misleading content.</li>
                            <li>Harassing, insulting, or discriminating against other users.</li>
                            <li>Attempting to breach platform security.</li>
                            <li>Using bots or automated scripts without authorization.</li>
                            <li>Conducting transactions outside the platform to evade commissions.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>9. Intellectual Property</h2>
                        <p>
                            All content on CoralHub (logos, design, code, texts) is the
                            property of CoralHub or its licensors. You may not copy, reproduce,
                            or redistribute any content without written authorization.
                        </p>
                    </section>

                    <section>
                        <h2>10. Limitation of Liability</h2>
                        <p>
                            CoralHub acts as an intermediary and is not responsible for:
                        </p>
                        <ul>
                            <li>Quality or condition of products sold by third parties.</li>
                            <li>Disputes between buyers and sellers.</li>
                            <li>Indirect or consequential losses.</li>
                            <li>Temporary service interruptions due to maintenance.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>11. Suspension and Termination</h2>
                        <p>
                            We reserve the right to suspend or delete accounts that violate
                            these terms, without prior notice and without refund of pending
                            charges.
                        </p>
                    </section>

                    <section>
                        <h2>12. Applicable Law</h2>
                        <p>
                            These terms are governed by the laws of the State of Florida, USA.
                            Any disputes will be resolved in the competent courts of
                            Miami-Dade.
                        </p>
                    </section>

                    <section>
                        <h2>13. Changes to the Terms</h2>
                        <p>
                            We may modify these terms at any time. We will notify you of
                            important changes by email. Continued use of the platform implies
                            acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2>14. Contact</h2>
                        <p>
                            Questions about these terms? Write to us at{" "}
                            <a href="mailto:legal@coralhub.com">legal@coralhub.com</a>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};