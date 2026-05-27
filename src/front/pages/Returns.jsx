import React, { useEffect } from "react";
import { Link } from "react-router-dom";

export const Returns = () => {
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
                    <h1 className="legal-title">Returns & Refunds</h1>
                    <p className="legal-updated">
                        Our hassle-free return policy. Read on for full details.
                    </p>
                </div>

                <div className="legal-content">
                    <section>
                        <h2>🔄 Return Policy Overview</h2>
                        <p>
                            At <strong>CoralHub</strong>, your satisfaction is our priority.
                            We accept returns on most products within <strong>14 days of delivery</strong>,
                            with specific conditions for live specimens and dry goods.
                        </p>
                    </section>

                    <section>
                        <h2>🐠 Live Specimens (Corals, Fish, Invertebrates)</h2>
                        <p>
                            Due to the nature of live organisms, we <strong>do not accept returns</strong> on
                            live specimens. However, we offer protection through our{" "}
                            <strong>Live Arrival Guarantee</strong>:
                        </p>
                        <ul>
                            <li>If your specimen arrives DOA, report it within <strong>2 hours of delivery</strong>.</li>
                            <li>Provide photos and unboxing video as proof.</li>
                            <li>We'll issue a full refund or replacement.</li>
                        </ul>
                        <p>
                            <em>Specimens that die after successful delivery and acclimation
                                are not covered.</em>
                        </p>
                    </section>

                    <section>
                        <h2>📦 Dry Goods & Equipment</h2>
                        <p>For non-living products (tanks, lights, filters, food, etc.):</p>
                        <ul>
                            <li>Returns accepted within <strong>14 days of delivery</strong>.</li>
                            <li>Items must be <strong>unused and in original packaging</strong>.</li>
                            <li>Buyer pays return shipping (unless the item is defective).</li>
                            <li>Refunds processed within <strong>5-10 business days</strong> to original payment method.</li>
                        </ul>
                    </section>

                    <section>
                        <h2>🚫 Non-Returnable Items</h2>
                        <p>The following items cannot be returned:</p>
                        <ul>
                            <li>Live specimens (covered by Live Arrival Guarantee only)</li>
                            <li>Opened food, supplements, or medications</li>
                            <li>Custom or personalized items</li>
                            <li>Items damaged due to misuse</li>
                            <li>Sale or clearance items (marked "Final Sale")</li>
                        </ul>
                    </section>

                    <section>
                        <h2>📝 How to Request a Return</h2>
                        <ol style={{ paddingLeft: "24px", color: "#3a4d61", lineHeight: "1.8" }}>
                            <li>Go to <strong>"My Orders"</strong> in your account dashboard.</li>
                            <li>Find the order and click <strong>"Request Return"</strong>.</li>
                            <li>Select the reason and upload photos if needed.</li>
                            <li>Submit your request — we'll review within 24 hours.</li>
                            <li>Once approved, you'll receive return shipping instructions.</li>
                            <li>Ship the item back; refund is issued after we receive and inspect it.</li>
                        </ol>
                    </section>

                    <section>
                        <h2>💵 Refund Methods</h2>
                        <p>Refunds are issued to your original payment method:</p>
                        <ul>
                            <li><strong>Credit/Debit Card:</strong> 5-10 business days</li>
                            <li><strong>PayPal:</strong> 1-3 business days</li>
                            <li><strong>Apple Pay / Google Pay:</strong> 5-10 business days</li>
                        </ul>
                        <p>
                            You'll receive an email confirmation when the refund is processed.
                        </p>
                    </section>

                    <section>
                        <h2>⚠️ Damaged or Defective Items</h2>
                        <p>
                            If your item arrives damaged or defective, contact us within <strong>48 hours</strong> of
                            delivery. We'll cover return shipping and issue a full refund or replacement.
                        </p>
                    </section>

                    <section>
                        <h2>📞 Need Help?</h2>
                        <p>
                            Questions about returns? Reach out to{" "}
                            <a href="mailto:returns@coralhub.com">returns@coralhub.com</a> or
                            visit our <Link to="/faq">FAQ section</Link>.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};