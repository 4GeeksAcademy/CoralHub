import React from "react";
import { Link } from "react-router-dom";

export const Community = () => {

	return (

		<section className="community-section py-5 position-relative overflow-hidden">

			<div className="container py-4 py-md-5">

				<div className="community-card">

					<div className="row align-items-center g-4 g-lg-5">

						<div className="col-lg-8">

							<div className="community-content">

								<div className="community-icon">

									<span>👥</span>

								</div>

								<div className="community-copy">

									<h2 className="community-title mb-3">
										Join the <span>Reef</span> Community
									</h2>

									<p className="community-text mb-0">
										Connect with hobbyists, share knowledge,
										and grow the reef together.
									</p>

								</div>

							</div>

						</div>

						<div className="col-lg-4">

							<div className="community-action">

								<Link to="/signup" className="community-btn">
									Join CoralHub →
								</Link>

							</div>

						</div>

					</div>

				</div>

			</div>

			<svg
				className="community-wave"
				viewBox="0 0 1440 120"
				preserveAspectRatio="none"
			>

				<path
					d="M0 62C170 95 330 35 500 42C680 50 760 105 940 76C1090 52 1235 28 1440 66"
					stroke="#4EC7C1"
					strokeWidth="1.5"
					strokeLinecap="round"
					fill="none"
					opacity="0.8"
				/>

			</svg>

		</section>

	);
};