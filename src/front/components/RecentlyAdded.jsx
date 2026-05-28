import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const RecentlyAdded = () => {

	const [products, setProducts] = useState([]);

	useEffect(() => {

		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products`)
			.then((response) => response.json())
			.then((data) => {

				// Últimos productos agregados
				const recentProducts = data
					.slice(-4)
					.reverse();

				setProducts(recentProducts);

			})
			.catch((error) => console.error(error));

	}, []);

	return (

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

					<Link
						to="/catalog"
						className="recent-view-btn text-decoration-none"
					>
						View all listings →
					</Link>

				</div>

				<div className="d-flex flex-column gap-4">

					{products.map((product) => (

						<div
							key={product.id}
							className="listing-card"
						>

							<div className="listing-left">

								<img
									src={product.image_url}
									alt={product.name}
									className="listing-image"
								/>

								<div className="listing-content">

									<div className="listing-tag coral-tag">
										{product.category || "Corals"}
									</div>

									<h3 className="listing-name">
										{product.name}
									</h3>

									<p className="listing-author">
										by {product.seller_name}
									</p>

									<div className="listing-meta">

										<span>⭐ 4.8</span>

										<span>👁 86 views</span>

										<span>🕒 Recently added</span>

									</div>

								</div>

							</div>

							<div className="listing-right">

								<div className="listing-price">
									${product.price}
								</div>

								<div className="d-flex gap-2">

									<button className="wishlist-btn">
										♡
									</button>

									<Link
										to={`/product/${product.id}`}
										className="hero-btn-solid text-decoration-none"
									>
										View
									</Link>

								</div>

							</div>

						</div>

					))}

				</div>

			</div>

		</section>

	);
};