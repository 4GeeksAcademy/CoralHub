import logoWhite from "../assets/img/logo CoralHub_White.png";

export const Footer = () => (
	<footer className="footer-section mt-5">
		<div className="container">
			<div className="row gy-4">

				{/* BRAND */}
				<div className="col-lg-4 footer-brand">
					<img
						src={logoWhite}
						alt="CoralHub logo"
						className="footer-logo mb-3"
					/>
					<p className="footer-text">
						Buy and sell aquarium products with a modern marketplace experience.
					</p>
				</div>

				{/* LINKS */}
				<div className="col-6 col-lg-2">
					<h5 className="footer-title">Explore</h5>
					<ul className="list-unstyled">
						<li><a href="#" className="footer-link">Home</a></li>
						<li><a href="#" className="footer-link">Catalog</a></li>
						<li><a href="#" className="footer-link">Dashboard</a></li>
					</ul>
				</div>

				{/* SUPPORT */}
				<div className="col-6 col-lg-2">
					<h5 className="footer-title">Support</h5>
					<ul className="list-unstyled">
						<li><a href="#" className="footer-link">Contact</a></li>
						<li><a href="#" className="footer-link">Help Center</a></li>
						<li><a href="#" className="footer-link">Privacy</a></li>
					</ul>
				</div>

				{/* NEWSLETTER */}
				<div className="col-lg-4">
					<h5 className="footer-title">Stay Updated</h5>

					<div className="d-flex gap-2 mt-3">
						<input
							type="email"
							className="form-control footer-input"
							placeholder="Enter your email"
						/>

						<button className="btn footer-btn">
							Subscribe
						</button>
					</div>
				</div>

			</div>

			{/* BOTTOM */}
			<div className="footer-bottom text-center mt-5 pt-4">
				<p className="mb-0">
					© 2026 CoralHub. All rights reserved.
				</p>
			</div>
		</div>
	</footer>
);
