import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FavoriteButton } from "../components/FavoriteButton";
import {
    successAlert,
    errorAlert,
    warningAlert
} from "../utils/alerts";

export const SearchResults = () => {

    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [favoriteIds, setFavoriteIds] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState([]);

    const [maxPrice, setMaxPrice] = useState(5000);

    const [sortBy, setSortBy] = useState("relevance");

    useEffect(() => {

        fetch(`${import.meta.env.VITE_BACKEND_URL}/api/products/search?q=${query}`)
                .then((response) => response.json())
                .then((data) => {

                setProducts(data);

                setLoading(false);
            })

            .catch((error) => {

                console.error(error);

                setLoading(false);
            });

    }, [query]);

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
                const ids = data.map((favorite) => favorite.product_id);
                setFavoriteIds(ids);
            })
            .catch((error) => console.error(error));
    }, []);


    if (loading) {
        return <p className="text-white p-5">Loading...</p>;
    }


    const handleFavorite = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            warningAlert(
                "Sign In Required",
                "You need to sign in first."
            );
            return;
        }

        const isAlreadyFavorite = favoriteIds.includes(productId);

        try {
            if (!isAlreadyFavorite) {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        product_id: productId
                    })
                });

                if (response.ok) {
                    setFavoriteIds([...favoriteIds, productId]);
                }
            } else {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/favorites/${productId}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    setFavoriteIds(favoriteIds.filter((id) => id !== productId));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCategoryChange = (category) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((item) => item !== category)
                : [...prev, category]
        );
    };
    const categories = [...new Set(products.map((product) => product.category))];

    let filteredProducts = [...products];

    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter((product) =>
            selectedCategories.includes(product.category)
        );
    }

    filteredProducts = filteredProducts.filter((product) =>
        Number(product.price) <= maxPrice
    );

    switch (sortBy) {
        case "price-low":
            filteredProducts.sort((a, b) => Number(a.price) - Number(b.price));
            break;

        case "price-high":
            filteredProducts.sort((a, b) => Number(b.price) - Number(a.price));
            break;

        case "newest":
            filteredProducts.sort(
                (a, b) => new Date(b.created_at) - new Date(a.created_at)
            );
            break;

        default:
            break;
    }

    console.log(categories);

    return (

        <div className="container py-5 text-white">

            {/* HEADER */}

            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5">

                <div>

                    <h1 className="search-page-title">

                        Search results for:
                        <span> "{query}" </span>

                    </h1>

                    <p className="search-page-subtitle">

                        {filteredProducts.length} result found

                    </p>

                </div>

                <select
                    className="search-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="relevance">Sort by: Relevance</option>
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>

            </div>



            <div className="row g-4">

                {/* FILTERS */}

                <div className="col-lg-3">

                    <div className="search-filters-card">

                        <div className="d-flex justify-content-between align-items-center mb-4">

                            <h2 className="filters-title mb-0">

                                Filters

                            </h2>

                            <button
                                className="clear-filters-btn"
                                onClick={() => {
                                    setSelectedCategories([]);
                                    setMaxPrice(5000);
                                    setSortBy("relevance");
                                }}
                            >
                                Clear all
                            </button>

                        </div>


                        {/* CATEGORIES */}

                        <div className="filter-group">

                            <h3 className="filter-group-title">

                                Categories

                            </h3>

                            <div className="filter-options">

                                {categories.map((category) => (
                                    <label
                                        className="filter-option"
                                        key={category}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategoryChange(category)}
                                        />

                                        <span>{category}</span>
                                    </label>
                                ))}

                            </div>

                        </div>


                        {/* PRICE */}

                        <div className="filter-group">

                            <h3 className="filter-group-title">

                                Price Range

                            </h3>

                            <input
                                type="range"
                                min="0"
                                max="5000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(Number(e.target.value))}
                                className="form-range custom-price-range"
                            />

                            <div className="d-flex justify-content-between price-labels">

                                <span>$0</span>
                                <span>${maxPrice}</span>

                            </div>

                        </div>

                    </div>

                </div>



                {/* PRODUCTS */}

                <div className="col-lg-9">

                    <div className="row g-4">

                        {

                            filteredProducts.length > 0 ? (

                                filteredProducts.map((product) => (

                                    <div
                                        className="col-md-6 col-xl-4"
                                        key={product.id}
                                    >

                                        <div className="search-product-card">

                                            <div className="search-product-image-wrapper">

                                                <img
                                                    src={product.image_url}
                                                    className="search-product-image"
                                                    alt={product.name}
                                                />

                                                <FavoriteButton
                                                    className="favorite-btn-card"
                                                    isFavorite={favoriteIds.includes(product.id)}
                                                    onClick={() => handleFavorite(product.id)}
                                                />

                                            </div>

                                            <div className="search-product-body">

                                                <div className="search-category-badge">

                                                    {product.category}

                                                </div>

                                                <h3 className="search-product-title">

                                                    {product.name}

                                                </h3>

                                                <div className="search-product-price">

                                                    ${product.price}

                                                </div>

                                                <Link
                                                    to={`/product/${product.id}`}
                                                    className="search-product-btn"
                                                >

                                                    View Product

                                                </Link>

                                            </div>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <p>No products found.</p>

                            )

                        }

                    </div>

                </div>

            </div>

        </div>
    );
};