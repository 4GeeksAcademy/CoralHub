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

			const response = await fetch(backendUrl + "/api/hello");

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

			{/* CATEGORIES SECTION */}

			<section className="categories-section py-5">

				<div className="container py-5">

					{/* TITLE */}

					<div className="text-center mb-5">

						<div className="categories-coral-icon mb-4">

							<img
								src={CoralIcon}
								alt="CoralHub coral icon"
								className="section-coral-icon"
							/>

						</div>

						<h2 className="categories-title mb-4">
							Browse Popular <span>Categories</span>
						</h2>

						<p className="categories-subtitle">
							Find everything you need for your reef tank,
							all in one place.
						</p>

					</div>



					{/* CATEGORIES */}

					<div className="row g-4 justify-content-center">

						{/* CORALS */}

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



						{/* EQUIPMENT */}

						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card equipment-category"
								type="button"
							>

								<div className="category-icon">
									<Wrench size={54} strokeWidth={1.8} />
								</div>

								<h3>Equipment</h3>

								<span className="category-line"></span>

							</button>

						</div>



						{/* AQUARIUMS */}

						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card aquarium-category"
								type="button"
							>

								<div className="category-icon">
									<Fish size={54} strokeWidth={1.8} />
								</div>

								<h3>Aquariums</h3>

								<span className="category-line"></span>

							</button>

						</div>



						{/* LIGHTING */}

						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card lighting-category"
								type="button"
							>

								<div className="category-icon">
									<Lightbulb size={54} strokeWidth={1.8} />
								</div>

								<h3>Lighting</h3>

								<span className="category-line"></span>

							</button>

						</div>



						{/* USED */}

						<div className="col-6 col-md-4 col-lg">

							<button
								className="category-card used-category"
								type="button"
							>

								<div className="category-icon">
									<Recycle size={54} strokeWidth={1.8} />
								</div>

								<h3>Used</h3>

								<span className="category-line"></span>

							</button>

						</div>

					</div>

				</div>

			</section>

		</div>

	);
};