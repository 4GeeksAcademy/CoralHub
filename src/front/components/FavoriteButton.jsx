export const FavoriteButton = ({
    isFavorite = false,
    onClick,
    className = ""
}) => {
    return (
        <button
            type="button"
            className={`favorite-btn ${isFavorite ? "active" : ""} ${className}`}
            onClick={onClick}
        >
            <i
                className={`${isFavorite ? "fa-solid" : "fa-regular"} fa-heart`}
            />
        </button>
    );
};