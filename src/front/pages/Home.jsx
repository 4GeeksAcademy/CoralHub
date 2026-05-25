import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

import CoralIcon from "../assets/img/Coral-icon.svg";

import {
	Wrench,
	Fish,
	Lightbulb,
	Recycle
} from "lucide-react";

import "../index.css";

export const Home = () => {

	const { store, dispatch } = useGlobalReducer();

	const loadMessage = async () => {

		try {

			const backendUrl = import.meta.env.VITE_BACKEND_URL;

			if (!backendUrl) {
				throw new Error("VITE_BACKEND_URL is not defined");
			}

			const response = await fetch(
				backendUrl + "/api/hello"
			);

			const data = await response.json();

			if (response.ok) {

				dispatch({
					type: "set_hello",
					payload: data.message
				});

			}

		} catch (error) {

			console.error(error);

		}
	};

	useEffect(() => {
		loadMessage();
	}, []);

	return (

		<div>

			<section className="hero-section position-relative overflow-hidden">

				<div className="container py-5">

					<div className="row align-items-center g-5">

						{/* LEFT SIDE */}

						<div className="col-lg-6">

							{/* BADGE */}

							<div className="hero-badge mb-4">

								Welcome to <span>CoralHub</span>

							</div>

							{/* TITLE */}

							<h1 className="hero-title mb-4">

								The Marketplace for
								<span> Marine Aquarium </span>
								Lovers

							</h1>

							{/* TEXT */}

							<p className="hero-description mb-5">

								Buy and sell corals, lights and equipments
								with a trusted community of reef keepers.

							</p>

							{/* BUTTONS */}

							<div className="d-flex flex-wrap gap-3 mb-5">

								<button className="btn hero-btn-outline">

									Explore listings →

								</button>

								<button className="btn hero-btn-solid">

									Sell your products →

								</button>

							</div>

							{/* FEATURES */}

							<div className="row g-4">

								<div className="col-md-4">

									<div className="hero-feature">

										<h3 className="hero-feature-title">

											🛡 Safe Transactions

										</h3>

										<div className="hero-feature-line"></div>

										<p className="hero-feature-text">

											Secure payments
											and data protection

										</p>

									</div>

								</div>

								<div className="col-md-4">

									<div className="hero-feature feature-border">

										<h3 className="hero-feature-title">

											👥 Trusted Community

										</h3>

										<div className="hero-feature-line"></div>

										<p className="hero-feature-text">

											Secure payments
											and data protection

										</p>

									</div>

								</div>

								<div className="col-md-4">

									<div className="hero-feature feature-border">

										<h3 className="hero-feature-title">

											🎧 Support

										</h3>

										<div className="hero-feature-line"></div>

										<p className="hero-feature-text">

											Secure payments
											and data protection

										</p>

									</div>

								</div>

							</div>

						</div>



						{/* RIGHT SIDE */}

						<div className="col-lg-6 text-center">

							<div className="hero-image-wrapper mx-auto">

								<img
									src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=1200&auto=format&fit=crop"
									alt="Mandarin fish"
									className="img-fluid hero-image"
								/>

							</div>

						</div>

					</div>

				</div>



				{/* WAVE */}

				<svg
					className="hero-wave"
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

			{/* =========================
			   CATEGORIES SECTION
			========================= */}

			<section className="categories-section py-5">

				<div className="container py-5">

					<div className="text-center mb-5">

						<h2 className="categories-title mb-4">
							Browse Popular <span>Categories</span>
						</h2>

						<p className="categories-subtitle">
							Find everything you need for your reef tank,
							all in one place.
						</p>

					</div>



					<div className="row g-4 justify-content-center">

						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card coral-category"
								type="button"
							>

								<div className="category-icon">

									<img
										src={CoralIcon}
										alt="Corals category"
										className="custom-category-icon"
									/>

								</div>

								<h3>Corals</h3>

								<span className="category-line"></span>

							</button>

						</div>



						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card equipment-category"
								type="button"
							>

								<div className="category-icon">

									<Wrench
										size={54}
										strokeWidth={1.8}
									/>

								</div>

								<h3>Equipment</h3>

								<span className="category-line"></span>

							</button>

						</div>



						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card aquarium-category"
								type="button"
							>

								<div className="category-icon">

									<Fish
										size={54}
										strokeWidth={1.8}
									/>

								</div>

								<h3>Aquariums</h3>

								<span className="category-line"></span>

							</button>

						</div>



						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card lighting-category"
								type="button"
							>

								<div className="category-icon">

									<Lightbulb
										size={54}
										strokeWidth={1.8}
									/>

								</div>

								<h3>Lighting</h3>

								<span className="category-line"></span>

							</button>

						</div>



						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card used-category"
								type="button"
							>

								<div className="category-icon">

									<Recycle
										size={54}
										strokeWidth={1.8}
									/>

								</div>

								<h3>Used</h3>

								<span className="category-line"></span>

							</button>

						</div>

					</div>

				</div>

			</section>



			{/* =========================
			   RECENTLY ADDED
			========================= */}

			<section className="recent-section py-5 position-relative overflow-hidden">

				<div className="container py-5">

					<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

						<div>

							<h2 className="recent-title mb-2">
								Recently <span>Added</span>
							</h2>

							<p className="recent-subtitle mb-0">
								Fresh listings from the community.
							</p>

						</div>

						<button className="recent-view-btn">
							View all listings →
						</button>

					</div>



					<div className="d-flex flex-column gap-4">

						{/* ITEM 1 */}

						<div className="listing-card">

							<div className="listing-left">

								<img
									src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1200&auto=format&fit=crop"
									alt="Purple Montipora Coral"
									className="listing-image"
								/>

								<div className="listing-content">

									<div className="listing-tag coral-tag">
										🪸 Corals
									</div>

									<h3 className="listing-name">
										Purple Montipora Coral
									</h3>

									<p className="listing-author">
										by CoralFan
									</p>

									<div className="listing-meta">

										<span>⭐ 4.8 (32)</span>

										<span>👁 86 views</span>

										<span>🕒 2h ago</span>

									</div>

								</div>

							</div>

							<div className="listing-right">

								<div className="listing-price">
									$35.00
								</div>

								<button className="wishlist-btn">
									♡
								</button>

							</div>

						</div>



						{/* ITEM 2 */}

						<div className="listing-card">

							<div className="listing-left">

								<img
									src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=1200&auto=format&fit=crop"
									alt="Yellow Tang"
									className="listing-image"
								/>

								<div className="listing-content">

									<div className="listing-tag fish-tag">
										🐠 Fish
									</div>

									<h3 className="listing-name">
										Yellow Tang
									</h3>

									<p className="listing-author">
										by ReefKeeper
									</p>

									<div className="listing-meta">

										<span>⭐ 4.9 (18)</span>

										<span>👁 124 views</span>

										<span>🕒 4h ago</span>

									</div>

								</div>

							</div>

							<div className="listing-right">

								<div className="listing-price">
									$75.00
								</div>

								<button className="wishlist-btn">
									♡
								</button>

							</div>

						</div>

					</div>

				</div>

			</section>

			<section className="sellers-section py-5">

				<div className="container py-5">

					<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

						<div>

							<h2 className="sellers-title">
								Top rated <span>sellers</span>
							</h2>

						</div>

						<button className="sellers-view-btn">
							View all →
						</button>

					</div>



					<div className="row g-4">

						{/* CARD 1 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="seller-card">

								<div className="seller-avatar">
									👤
								</div>

								<h3 className="seller-name">
									ReefMaster
								</h3>

								<p className="seller-rating">
									⭐ 4.9 (128)
								</p>

								<p className="seller-sales">
									542 sales
								</p>

								<button className="seller-btn">
									View Store
								</button>

							</div>

						</div>



						{/* CARD 2 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="seller-card">

								<div className="seller-avatar">
									👤
								</div>

								<h3 className="seller-name">
									Coral Pro
								</h3>

								<p className="seller-rating">
									⭐ 4.8 (97)
								</p>

								<p className="seller-sales">
									376 sales
								</p>

								<button className="seller-btn">
									View Store
								</button>

							</div>

						</div>



						{/* CARD 3 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="seller-card">

								<div className="seller-avatar">
									👤
								</div>

								<h3 className="seller-name">
									Reef Tech
								</h3>

								<p className="seller-rating">
									⭐ 4.7 (62)
								</p>

								<p className="seller-sales">
									281 sales
								</p>

								<button className="seller-btn">
									View Store
								</button>

							</div>

						</div>



						{/* CARD 4 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="seller-card">

								<div className="seller-avatar">
									👤
								</div>

								<h3 className="seller-name">
									AquaWorld
								</h3>

								<p className="seller-rating">
									⭐ 5.0 (156)
								</p>

								<p className="seller-sales">
									712 sales
								</p>

								<button className="seller-btn">
									View Store
								</button>

							</div>

						</div>

					</div>

				</div>

			</section>

			<section className="favorites-section py-5 position-relative overflow-hidden">

				<div className="container py-5">

					{/* HEADER */}

					<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

						<div>

							<h2 className="favorites-title mb-2">
								<span className="favorites-heart">♡</span>
								Most <span>favorited</span>
							</h2>

							<p className="favorites-subtitle mb-0">
								The products reef keepers are loving the most.
							</p>

						</div>

						<button className="favorites-view-btn">
							View all →
						</button>

					</div>



					{/* CARDS */}

					<div className="row g-4">

						{/* CARD 1 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="favorite-card">

								<div className="favorite-image-wrapper">

									<img
										src="https://images.unsplash.com/photo-1546026423-cc4642628d2b?q=80&w=1200&auto=format&fit=crop"
										alt="Purple Acropora Coral"
										className="favorite-image"
									/>

									<button className="favorite-like-btn">
										♡
									</button>

								</div>

								<div className="favorite-content">

									<div className="favorite-tag coral-tag">
										🪸 Corals
									</div>

									<h3 className="favorite-name">
										Purple Acropora
									</h3>

									<p className="favorite-author">
										by ReefMaster
									</p>

									<div className="favorite-stats">

										<span>⭐ 4.9 (128)</span>

										<span>❤ 2.4k favorites</span>

									</div>

									<button className="favorite-btn">
										View Listing
									</button>

								</div>

							</div>

						</div>



						{/* CARD 2 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="favorite-card">

								<div className="favorite-image-wrapper">

									<img
										src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=1200&auto=format&fit=crop"
										alt="Yellow Tang"
										className="favorite-image"
									/>

									<button className="favorite-like-btn">
										♡
									</button>

								</div>

								<div className="favorite-content">

									<div className="favorite-tag fish-tag">
										🐠 Fish
									</div>

									<h3 className="favorite-name">
										Yellow Tang
									</h3>

									<p className="favorite-author">
										by AquaWorld
									</p>

									<div className="favorite-stats">

										<span>⭐ 4.8 (97)</span>

										<span>❤ 1.8k favorites</span>

									</div>

									<button className="favorite-btn">
										View Listing
									</button>

								</div>

							</div>

						</div>



						{/* CARD 3 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="favorite-card">

								<div className="favorite-image-wrapper">

									<img
										src="https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1200&auto=format&fit=crop"
										alt="Red Sea Reefer"
										className="favorite-image"
									/>

									<button className="favorite-like-btn">
										♡
									</button>

								</div>

								<div className="favorite-content">

									<div className="favorite-tag equipment-tag">
										⚙ Equipment
									</div>

									<h3 className="favorite-name">
										Red Sea Reefer 250
									</h3>

									<p className="favorite-author">
										by CoralTech
									</p>

									<div className="favorite-stats">

										<span>⭐ 4.7 (62)</span>

										<span>❤ 1.2k favorites</span>

									</div>

									<button className="favorite-btn">
										View Listing
									</button>

								</div>

							</div>

						</div>



						{/* CARD 4 */}

						<div className="col-12 col-md-6 col-xl-3">

							<div className="favorite-card">

								<div className="favorite-image-wrapper">

									<img
										src="https://images.unsplash.com/photo-1520637836862-4d197d17c55a?q=80&w=1200&auto=format&fit=crop"
										alt="AI Prime 16HD"
										className="favorite-image"
									/>

									<button className="favorite-like-btn">
										♡
									</button>

								</div>

								<div className="favorite-content">

									<div className="favorite-tag lighting-tag">
										💡 Lighting
									</div>

									<h3 className="favorite-name">
										AI Prime 16HD
									</h3>

									<p className="favorite-author">
										by SaltLife
									</p>

									<div className="favorite-stats">

										<span>⭐ 4.9 (156)</span>

										<span>❤ 980 favorites</span>

									</div>

									<button className="favorite-btn">
										View Listing
									</button>

								</div>

							</div>

						</div>

					</div>

				</div>

			</section>

			<section className="community-section py-5 position-relative overflow-hidden">

				<div className="container py-5">

					<div className="community-card">

						<div className="row align-items-center g-5">

							{/* LEFT SIDE */}

							<div className="col-lg-8">

								<div className="d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">

									{/* ICON */}

									<div className="community-icon">

										<span>👥</span>

									</div>



									{/* TEXT */}

									<div className="text-center text-md-start">

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



							{/* RIGHT SIDE */}

							<div className="col-lg-4 text-center text-lg-end">

								<button className="community-btn">
									Join CoralHub →
								</button>

							</div>

						</div>

					</div>

				</div>



				{/* WAVE */}

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

		</div>

	);
};