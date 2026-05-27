import logoWhite from "../assets/img/logo CoralHub_White.png";

export const Footer = () => (
	<footer className="footer-section">
		<div className="container">
			<div className="row justify-content-between gy-5">

				{/* LOGO + DESCRIPTION */}
				<div className="col-lg-3">
					<img
						src={logoWhite}
						alt="CoralHub Logo"
						className="footer-logo mb-4"
					/>

					<p className="footer-description">
						The trusted marketplace for
						<br />
						marine aquarium enthusiasts
					</p>
				</div>

				{/* MARKETPLACE */}
				<div className="col-6 col-md-3 col-lg-2">
					<h5 className="footer-title">Marketplace</h5>

					<ul className="list-unstyled footer-links">
						<li><a href="#" className="footer-link">All Listing</a></li>
						<li><a href="#" className="footer-link">Corals</a></li>
						<li><a href="#" className="footer-link">Equipments</a></li>
						<li><a href="#" className="footer-link">Aquariums</a></li>
						<li><a href="#" className="footer-link">Used Equipment</a></li>
					</ul>
				</div>

				{/* COMMUNITY */}
				<div className="col-6 col-md-3 col-lg-2">
					<h5 className="footer-title">Community</h5>

					<ul className="list-unstyled footer-links">
						<li><a href="#" className="footer-link">Top Sellers</a></li>
						<li><a href="#" className="footer-link">Reviews</a></li>
						<li><a href="#" className="footer-link">Contact us</a></li>
					</ul>
				</div>

				{/* SUPPORT */}
				<div className="col-6 col-md-3 col-lg-2">
					<h5 className="footer-title">Support</h5>

					<ul className="list-unstyled footer-links">
						<li><a href="#" className="footer-link">Help Center</a></li>
						<li><a href="#" className="footer-link">Return Policy</a></li>
					</ul>
				</div>

				{/* PRIVACY + SOCIAL */}
				<div className="col-6 col-md-3 col-lg-2">
					<h5 className="footer-title">Privacy Policy</h5>

					<div className="mt-5">
						<p className="footer-follow">Follow Us:</p>

						<div className="d-flex gap-3 mt-3">

							<a href="#" className="social-link">
								<i className="fab fa-facebook"></i>
							</a>

							<a href="#" className="social-link">
								<i className="fab fa-instagram"></i>
							</a>

							<a href="#" className="social-link">
								<i className="fab fa-tiktok"></i>
							</a>

						</div>
					</div>
				</div>

			</div>
		</div>
	</footer>
);
