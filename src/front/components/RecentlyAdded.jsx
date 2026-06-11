import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FavoriteButton } from "./FavoriteButton";

export const RecentlyAdded = () => {

	const [products, setProducts] = useState([]);
	const [favoriteIds, setFavoriteIds] = useState([]);

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

	useEffect(() => {

		const token = localStorage.getItem("token");

		if (!token) return;

		fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then((response) => response.json())
			.then((data) => {

				const ids = data.map(
					favorite => favorite.product_id
				);

				setFavoriteIds(ids);

			})
			.catch((error) => console.error(error));

	}, []);

	const handleFavorite = async (productId) => {

		const token = localStorage.getItem("token");

		if (!token) {

			alert("You need to sign in first");

			return;
		}

		const isAlreadyFavorite =
			favoriteIds.includes(productId);

		try {

			if (!isAlreadyFavorite) {

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/favorites`,
					{
						method: "POST",
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`
						},
						body: JSON.stringify({
							product_id: productId
						})
					}
				);

				if (response.ok) {

					setFavoriteIds([
						...favoriteIds,
						productId
					]);
				}

			} else {

				const response = await fetch(
					`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${productId}`,
					{
						method: "DELETE",
						headers: {
							Authorization: `Bearer ${token}`
						}
					}
				);

				if (response.ok) {

					setFavoriteIds(
						favoriteIds.filter(
							id => id !== productId
						)
					);
				}
			}

		} catch (error) {

			console.error(error);

		}
	};

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

								<div className="listing-image-wrapper">

									<img
										src={product.image_url}
										alt={product.name}
										className="listing-image"
									/>

								</div>

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

								<div className="d-flex align-items-center gap-3">

									<div className="listing-price">
										${product.price}
									</div>

									<FavoriteButton
										isFavorite={favoriteIds.includes(product.id)}
										onClick={() => handleFavorite(product.id)}
									/>

								</div>

								<div className="d-flex gap-2">

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