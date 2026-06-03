import React from "react";
import { Link } from "react-router-dom";

export const Rewards = () => {
    return (
        <main className="rewards-page">
            <section className="rewards-hero">
                <div>
                    <span className="rewards-badge">👑 Gold Aquarist</span>

                    <h1>Your CoralHub Member Benefits</h1>

                    <p>
                        Grow your CoralHub membership level by shopping, reviewing products,
                        saving favorites, and staying active in the community.
                    </p>
                </div>

                <div className="rewards-level-card">
                    <h2>65%</h2>
                    <p>to Platinum Aquarist</p>

                    <div className="rewards-progress">
                        <div></div>
                    </div>

                    <span>2 rewards available</span>
                </div>
            </section>

            <section className="membership-levels-grid">
                <div className="membership-card silver-level">
                    <div className="membership-icon">🥈</div>
                    <h3>Silver Aquarist</h3>
                    <p className="membership-subtitle">Starter Member</p>

                    <ul>
                        <li>Basic marketplace access</li>
                        <li>Save favorite products</li>
                        <li>Standard support</li>
                        <li>Order history access</li>
                    </ul>

                    <span className="membership-status">Entry Level</span>
                </div>

                <div className="membership-card gold-level active-level">
                    <div className="current-badge">Current Level</div>

                    <div className="membership-icon">👑</div>
                    <h3>Gold Aquarist</h3>
                    <p className="membership-subtitle">Premium Member</p>

                    <ul>
                        <li>2 rewards available</li>
                        <li>Priority support</li>
                        <li>Exclusive coral drops</li>
                        <li>Pickup priority</li>
                        <li>Special member discounts</li>
                    </ul>

                    <span className="membership-status">65% to Platinum</span>
                </div>

                <div className="membership-card platinum-level">
                    <div className="membership-icon">💎</div>
                    <h3>Platinum Aquarist</h3>
                    <p className="membership-subtitle">Elite Member</p>

                    <ul>
                        <li>VIP marketplace access</li>
                        <li>Early access to rare corals</li>
                        <li>Highest support priority</li>
                        <li>Exclusive Platinum discounts</li>
                        <li>Premium member badge</li>
                    </ul>

                    <span className="membership-status">Next Level</span>
                </div>
            </section>

            <section className="gold-benefits-section">
                <h2>Your Gold Benefits</h2>

                <div className="benefits-grid">
                    <div className="benefit-card">
                        <div className="benefit-icon">🎁</div>
                        <h3>2 Rewards Available</h3>
                        <p>Unlock member-only offers and CoralHub perks.</p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">⚡</div>
                        <h3>Priority Support</h3>
                        <p>Get faster responses for tickets, claims, and order issues.</p>
                    </div>

                    <div className="benefit-card">
                        <div className="benefit-icon">🪸</div>
                        <h3>Exclusive Coral Drops</h3>
                        <p>Access premium corals before standard members.</p>
                    </div>
                </div>
            </section>

            <div className="rewards-actions">
                <Link to="/" className="rewards-main-btn">
                    Start Shopping
                </Link>

                <Link to="/welcome" className="rewards-secondary-btn">
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
};