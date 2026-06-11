import React from "react";
import { Link } from "react-router-dom";
import coralHubLogo from "../assets/img/CoralHub_logo.png";

export const Footer = () => {
	const currentYear = new Date().getFullYear();
	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};


	return (
		<footer className="coral-footer">
			<div className="container py-5">
				<div className="row g-4">
					{/* COLUMN 1: Logo + description */}
					<div className="col-lg-4 col-md-12">
						<Link to="/" className="footer-brand-link">
							<img
								src={coralHubLogo}
								alt="CoralHub"
								className="footer-logo"
							/>
						</Link>
						<p className="footer-description">
							The #1 marketplace for aquarists. We connect ocean lovers with
							the finest corals, fish, and accessories from the community.
						</p>
						<div className="footer-socials">
							<a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
								<i className="fab fa-instagram"></i>
							</a>
							<a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
								<i className="fab fa-facebook-f"></i>
							</a>
							<a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
								<i className="fab fa-twitter"></i>
							</a>
							<a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
								<i className="fab fa-youtube"></i>
							</a>
						</div>
					</div>

					{/* COLUMN 2: Marketplace */}
					<div className="col-lg-2 col-md-4 col-6">
						<h5 className="footer-title">Marketplace</h5>
						<ul className="footer-links">
							<li><Link to="/category/coralas" onClick={scrollToTop}>Corals</Link></li>
							<li><Link to="/category/equipment" onClick={scrollToTop}>Equipment</Link></li>
							<li><Link to="/category/aquariums" onClick={scrollToTop}>Aquariums</Link></li>
							<li><Link to="/category/lighting" onClick={scrollToTop}>Lighting</Link></li>
							<li><Link to="/category/used" onClick={scrollToTop}>Used</Link></li>
						</ul>
					</div>

					{/* COLUMN 3: Support */}
					<div className="col-lg-3 col-md-4 col-6">
						<h5 className="footer-title">Support</h5>
						<ul className="footer-links">
							<li><Link to="/faq">FAQ</Link></li>
							<li><Link to="/contact">Contact Us</Link></li>
							<li><Link to="/shipping">Shipping & Delivery</Link></li>
							<li><Link to="/returns">Returns</Link></li>
							<li><Link to="/help">Help Center</Link></li>
						</ul>
					</div>

					{/* COLUMN 4: Legal */}
					<div className="col-lg-3 col-md-4 col-12">
						<h5 className="footer-title">Legal</h5>
						<ul className="footer-links">
							<li><Link to="/privacy">Privacy Policy</Link></li>
							<li><Link to="/terms">Terms & Conditions</Link></li>
							<li><Link to="/cookies">Cookie Policy</Link></li>
							<li><Link to="/about">About Us</Link></li>
						</ul>
					</div>
				</div>

				{/* Bottom bar */}
				<div className="footer-bottom">
					<p className="footer-copy">
						© {currentYear} CoralHub. All rights reserved.
					</p>
					<p>
						Made with <i className="fa fa-heart text-danger" /> by{" "}
						<a href="http://www.4geeksacademy.com">4Geeks Academy</a>
					</p>
				</div>
			</div>
		</footer>
	);
};