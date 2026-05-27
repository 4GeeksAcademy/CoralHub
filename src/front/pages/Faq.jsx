import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
    {
        category: "Getting Started",
        icon: "🚀",
        questions: [
            {
                q: "What is CoralHub?",
                a: "CoralHub is the #1 online marketplace dedicated to the marine aquarium hobby. We connect trusted sellers with passionate aquarists, offering live corals, fish, invertebrates, equipment, food, and accessories all in one secure platform.",
            },
            {
                q: "How do I create an account?",
                a: "Click 'Sign Up' in the top-right corner, fill in your name, email, and password. You'll receive a confirmation email — click the link to activate your account and start shopping or selling immediately.",
            },
            {
                q: "Is CoralHub free to use?",
                a: "Yes! Creating an account and browsing the marketplace is 100% free. Sellers pay a small commission only when they make a sale. Buyers pay no extra fees beyond the product price and shipping.",
            },
        ],
    },
    {
        category: "Orders & Shipping",
        icon: "📦",
        questions: [
            {
                q: "How long does shipping take?",
                a: "Most orders ship within 1–2 business days. Live specimens are shipped Monday through Wednesday to avoid weekend transit. Standard delivery takes 1–3 business days within the continental US. Overnight shipping is available at checkout.",
            },
            {
                q: "Do you ship live corals and fish safely?",
                a: "Absolutely. All live specimens are packed by experienced sellers using insulated boxes, heat/cool packs, and oxygenated bags. We also offer our Live Arrival Guarantee — if your specimen doesn't arrive alive, you get a full refund or replacement.",
            },
            {
                q: "Can I track my order?",
                a: "Yes! Once your order ships, you'll receive an email with a tracking number. You can also check the status anytime in your account under 'My Orders'.",
            },
            {
                q: "Do you ship internationally?",
                a: "Currently we only ship within the United States due to strict regulations on the import of live marine organisms. We're working on expanding to Canada and Mexico in 2026.",
            },
        ],
    },
    {
        category: "Live Arrival Guarantee",
        icon: "🐠",
        questions: [
            {
                q: "What is the Live Arrival Guarantee?",
                a: "Our Live Arrival Guarantee ensures that all live specimens (corals, fish, invertebrates) arrive alive and healthy. If anything arrives DOA (Dead on Arrival), you're covered for a full refund or replacement.",
            },
            {
                q: "How do I claim the Live Arrival Guarantee?",
                a: "You must report the issue within 2 hours of delivery. Take clear photos and a short unboxing video showing the issue, then submit a claim through your account or email support@coralhub.com. We'll process the refund or replacement within 24 hours.",
            },
            {
                q: "What does the guarantee NOT cover?",
                a: "The guarantee doesn't cover losses due to improper acclimation, incompatible tank conditions, refused delivery, incorrect shipping address provided by the buyer, or specimens that die after successful delivery and acclimation.",
            },
        ],
    },
    {
        category: "Payments & Refunds",
        icon: "💳",
        questions: [
            {
                q: "What payment methods do you accept?",
                a: "We accept all major credit and debit cards (Visa, Mastercard, American Express, Discover) through our secure payment processor Stripe. We also support Apple Pay and Google Pay for faster checkout.",
            },
            {
                q: "Is my payment information secure?",
                a: "Yes. We use industry-standard SSL/TLS encryption and never store your full card details on our servers. All transactions are processed through Stripe, which is PCI-DSS Level 1 certified.",
            },
            {
                q: "How do refunds work?",
                a: "Refunds for non-living products are processed within 5–10 business days back to your original payment method. Live Arrival claims are processed within 24 hours once approved.",
            },
            {
                q: "Can I cancel an order?",
                a: "You can cancel an order within 1 hour of placing it, before the seller ships. After that, you'll need to wait for delivery and process a return (only available for non-living products).",
            },
        ],
    },
    {
        category: "Selling on CoralHub",
        icon: "🏪",
        questions: [
            {
                q: "How do I become a seller?",
                a: "Sign up for an account, then go to your dashboard and click 'Become a Seller'. Fill out the application with your business information and reef experience. Our team reviews applications within 2–3 business days.",
            },
            {
                q: "What's the seller commission?",
                a: "CoralHub charges a 10% commission on each completed sale. This includes payment processing, platform maintenance, and customer support. No listing fees, no monthly fees.",
            },
            {
                q: "What can I sell on CoralHub?",
                a: "You can sell live corals (frags and colonies), saltwater fish, invertebrates, dry goods, equipment (lighting, filtration, etc.), food, supplements, and aquarium decorations. CITES-protected species are NOT allowed.",
            },
        ],
    },
    {
        category: "Account & Privacy",
        icon: "🔒",
        questions: [
            {
                q: "How do I change my password?",
                a: "Go to 'Profile Settings' in your account dashboard, then click 'Change Password'. Enter your current password and choose a new one (minimum 8 characters with at least one number).",
            },
            {
                q: "How can I delete my account?",
                a: "You can request account deletion from 'Profile Settings' → 'Privacy' → 'Delete Account'. Note that this action is permanent and all your data, orders, and listings will be removed within 30 days.",
            },
            {
                q: "Is my personal information shared with sellers?",
                a: "Only your shipping address and first name are shared with sellers to fulfill orders. We never share your email, phone, or payment information. Read our full Privacy Policy for details.",
            },
        ],
    },
];

export const Faq = () => {
    const [openItem, setOpenItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleItem = (categoryIndex, questionIndex) => {
        const key = `${categoryIndex}-${questionIndex}`;
        setOpenItem(openItem === key ? null : key);
    };

    // Filter questions by search term
    const filteredData = faqData
        .map((cat) => ({
            ...cat,
            questions: cat.questions.filter(
                (item) =>
                    item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    item.a.toLowerCase().includes(searchTerm.toLowerCase())
            ),
        }))
        .filter((cat) => cat.questions.length > 0);

    return (
        <div className="faq-page">
            {/* ===== HERO ===== */}
            <section className="faq-hero">
                <div className="container">
                    <Link to="/" className="legal-back about-back">
                        <i className="fas fa-arrow-left"></i> Back to home
                    </Link>
                    <span className="about-eyebrow">Help Center</span>
                    <h1 className="about-title">
                        Frequently Asked <span className="highlight">Questions</span>
                    </h1>
                    <p className="about-lead">
                        Find answers to the most common questions about CoralHub. Can't find
                        what you're looking for? Contact our support team.
                    </p>

                    {/* Search bar */}
                    <div className="faq-search-wrapper">
                        <i className="fas fa-search faq-search-icon"></i>
                        <input
                            type="text"
                            className="faq-search-input"
                            placeholder="Search for a question..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* ===== FAQ CONTENT ===== */}
            <section className="faq-content-section">
                <div className="container">
                    {filteredData.length === 0 ? (
                        <div className="faq-empty">
                            <div className="faq-empty-icon">🤔</div>
                            <h3>No results found</h3>
                            <p>
                                We couldn't find any questions matching "{searchTerm}". Try a
                                different search or{" "}
                                <Link to="/contact">contact our support team</Link>.
                            </p>
                        </div>
                    ) : (
                        filteredData.map((category, catIdx) => (
                            <div key={catIdx} className="faq-category">
                                <div className="faq-category-header">
                                    <span className="faq-category-icon">{category.icon}</span>
                                    <h2>{category.category}</h2>
                                </div>

                                <div className="faq-list">
                                    {category.questions.map((item, qIdx) => {
                                        const key = `${catIdx}-${qIdx}`;
                                        const isOpen = openItem === key;

                                        return (
                                            <div
                                                key={qIdx}
                                                className={`faq-item ${isOpen ? "open" : ""}`}
                                            >
                                                <button
                                                    className="faq-question"
                                                    onClick={() => toggleItem(catIdx, qIdx)}
                                                >
                                                    <span>{item.q}</span>
                                                    <i
                                                        className={`fas fa-chevron-${isOpen ? "up" : "down"
                                                            }`}
                                                    ></i>
                                                </button>
                                                {isOpen && <div className="faq-answer">{item.a}</div>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* ===== STILL NEED HELP CTA ===== */}
            <section className="faq-cta">
                <div className="container">
                    <div className="faq-cta-box">
                        <div className="faq-cta-icon">💬</div>
                        <h2>Still need help?</h2>
                        <p>
                            Our support team is ready to help you with anything you need. We
                            respond within 24 hours on business days.
                        </p>
                        <Link to="/contact" className="about-btn about-btn-primary">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};