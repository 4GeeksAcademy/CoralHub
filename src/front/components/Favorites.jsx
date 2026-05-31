import React, { useState } from "react";
import { FavoriteButton } from "./FavoriteButton";

export const Favorites = () => {

	const [isFavorite, setIsFavorite] = useState(false);



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

							<FavoriteButton
								className="favorite-btn-card"
								isFavorite={isFavorite}
								onClick={() => setIsFavorite(!isFavorite)}
							/>

						</div>

						<div className="favorite-content">

							<div className="favorite-tag coral-tag">
								Corals
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

						</div>

					</div>

				</div>

				{/* CARD 2 */}

				<div className="col-12 col-md-6 col-xl-3">

					<div className="favorite-card">

						<div className="favorite-image-wrapper">

							<img
								src="https://images.unsplash.com/photo-1520301255226-bf5f144451c1?q=80&w=1200&auto=format&fit=crop"
								alt="Blood Parrot"
								className="favorite-image"
							/>

							<FavoriteButton
								className="favorite-btn-card"
								isFavorite={false}
								onClick={() => { }}
							/>

						</div>

						<div className="favorite-content">

							<div className="favorite-tag fish-tag">
								Fish
							</div>

							<h3 className="favorite-name">
								Blood Parrotfish
							</h3>

							<p className="favorite-author">
								by AquaWorld
							</p>

							<div className="favorite-stats">

								<span>⭐ 4.8 (97)</span>

								<span>❤ 1.8k favorites</span>

							</div>
						</div>

					</div>

				</div>

				{/* CARD 3 */}

				<div className="col-12 col-md-6 col-xl-3">

					<div className="favorite-card">

						<div className="favorite-image-wrapper">

							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdmt8JkhK3EG47mL42uZk8ncxZlY7eFz6JBA&s"
								alt="Red Sea Reefer"
								className="favorite-image"
							/>

							<FavoriteButton
								className="favorite-btn-card"
								isFavorite={false}
								onClick={() => { }}
							/>
						</div>

						<div className="favorite-content">

							<div className="favorite-tag equipment-tag">
								Equipment
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
						</div>

					</div>

				</div>


				{/* CARD 4 */}

				<div className="col-12 col-md-6 col-xl-3">

					<div className="favorite-card">

						<div className="favorite-image-wrapper">

							<img
								src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Zebrasoma_flavescens_Luc_Viatour.jpg"
								alt="Yellow Tang"
								className="favorite-image"
							/>
							<FavoriteButton
								className="favorite-btn-card"
								isFavorite={false}
								onClick={() => { }}
							/>

						</div>

						<div className="favorite-content">

							<div className="favorite-tag fish-tag">
								Fish
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
						</div>

					</div>

				</div>

			</div>

		</div>

	</section>

	);
};