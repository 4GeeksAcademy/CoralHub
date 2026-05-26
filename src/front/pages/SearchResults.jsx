import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export const SearchResults = () => {

    const [searchParams] = useSearchParams();

    const query = searchParams.get("q");

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <p className="text-white p-5">Loading...</p>;
    }

    return (

        <div className="container py-5 text-white">

            <h2 className="mb-4">
                Search results for: "{query}"
            </h2>

            <div className="row">

                {
                    products.length > 0 ? (

                        products.map((product) => (

                            <div
                                className="col-md-4 mb-4"
                                key={product.id}
                            >

                                <div className="card bg-dark text-white h-100">

                                    <img
                                        src={product.image_url}
                                        className="card-img-top"
                                        alt={product.name}
                                    />

                                    <div className="card-body">

                                        <h5>{product.name}</h5>

                                        <p>${product.price}</p>

                                        <Link
                                            to={`/product/${product.id}`}
                                            className="btn btn-primary"
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
    );
};