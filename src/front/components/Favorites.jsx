import React, { useState, useEffect } from "react";
import { FavoriteButton } from "./FavoriteButton";
import { Link } from "react-router-dom";

export const Favorites = () => {

	// const [isFavorite, setIsFavorite] = useState(false);
	const [topProducts, setTopProducts] = useState([]);

	useEffect(() => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/top`)
			.then((response) => response.json())
			.then((data) => setTopProducts(data))
			.catch((error) => console.error(error));

	}, []);

	const getCategoryClass = (category) => {

		switch (category) {

			case "Corals":
				return "coral-tag";

			case "Eqipment":
				return "Equipment-tag";

			case "Lights":
				return "lights-tag";

			case "Used":
				return "used-tag";

			default:
				return "";
		}
	};

	return (<section className="favorites-section py-5 position-relative overflow-hidden">

		<div className="container py-5">

			{/* HEADER */}

			<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

				<div>

					<h2 className="favorites-title mb-2">
						Most <span>favorited</span>
					</h2>

					<p className="favorites-subtitle mb-0">
						The products reef keepers are loving the most.
					</p>

				</div>

				<Link
					to="/favorites"
					className="favorites-view-btn"
				>
					View All →
				</Link>

			</div>

			{/* CARDS */}

			<div className="row g-4">

				{topProducts.map((product) => (

					<div
						key={product.id}
						className="col-12 col-md-6 col-xl-3"
					>

						<div className="favorite-card">

							<div className="favorite-image-wrapper">

								<img
									src={product.image_url}
									alt={product.name}
									className="favorite-image"
								/>

							</div>

							<div className="favorite-content">

								<div
									className={`favorite-tag ${getCategoryClass(product.category)}`}
								>
									{product.category}
								</div>

								<h3 className="favorite-name">
									{product.name}
								</h3>

								<p className="favorite-author">
									by {product.seller_name}
								</p>

								<div className="favorite-stats">

									<span>
										❤️ {product.favorites_count} favorites
									</span>
								</div>

								<div>
									<Link
										to={`/product/${product.id}`}
										className="view-product-btn"
									>
										View Product
									</Link>
								</div>

							</div>

						</div>

					</div>

				))}

			</div>

		</div>

	</section>

	);
};