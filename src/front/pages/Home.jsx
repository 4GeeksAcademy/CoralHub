import React, { useEffect } from "react"
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import heroFish from "../assets/img/mandarin_goby.png";
// import CoralIcon from "../assets/img/Coral-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { RecentlyAdded } from "../components/RecentlyAdded";



export const Home = () => {

	const { store, dispatch } = useGlobalReducer()
	const navigate = useNavigate();
	
	const handleSellProduct = () => {

		const token = localStorage.getItem("token");

		if (token) {

			navigate("/addproduct");

		} else {

			navigate("/login", {
				state: { from: "/addproduct" }
			});

		}
	};

	const loadMessage = async () => {
		try {
			const backendUrl = import.meta.env.VITE_BACKEND_URL

			if (!backendUrl) throw new Error("VITE_BACKEND_URL is not defined in .env file")

			const response = await fetch(backendUrl + "/api/hello")
			const data = await response.json()

			if (response.ok) dispatch({ type: "set_hello", payload: data.message })

			return data

		} catch (error) {
			if (error.message) throw new Error(
				`Could not fetch the message from the backend.
				Please check if the backend is running and the backend port is public.`
			);
		}

	}

	useEffect(() => {
		loadMessage()
	}, [])

	return (
		<div>

			<section className="hero-section position-relative overflow-hidden">

				<div className="container coralhub-container py-5">

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

								<Link to="/catalog">

									<button className="btn hero-btn-outline">

										Explore listings →

									</button>

								</Link>

								<button
									className="btn hero-btn-solid"
									onClick={handleSellProduct}
								>

									Sell your products →

								</button>

							</div>

							{/* FEATURES */}

							<div className="row g-4">

								<div className="col-md-4">

									<div className="hero-feature">

										<h3 className="hero-feature-title">

											<i className="fas fa-shield-alt"></i> Safe Transactions

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

											<i className="fas fa-user-friends"></i>Trusted Community
										</h3>


										<div className="hero-feature-line"></div>

										<p className="hero-feature-text">

											Verified users and real reviews

										</p>

									</div>

								</div>

								<div className="col-md-4">

									<div className="hero-feature feature-border">

										<h3 className="hero-feature-title">

											<i className="fa-solid fa-headset"></i> Support

										</h3>
										<div className="hero-feature-line"></div>

										<p className="hero-feature-text">

											We're here to help when you need it

										</p>

									</div>

								</div>

							</div>

						</div>



						{/* RIGHT SIDE */}

						<div className="col-lg-6 text-center">

							<div className="hero-image-wrapper mx-auto">

									<img
										src={heroFish}
										alt="Marine aquarium fish"
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
			<RecentlyAdded />
		</div>

		
	);
}; 