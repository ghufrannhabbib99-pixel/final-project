import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./ProductCard.css";

const productImages = {
  19: "/images/products/copper/copper-tray.jpg",
  20: "/images/products/copper/iraqi-copper-dallah.jpg",
  21: "/images/products/copper/copper-lantern.jpg",

  2: "/images/products/ceramics/cup.jpg",
  3: "/images/products/ceramics/vase.jpg",
  4: "/images/products/ceramics/vase.jpg",
  5: "/images/products/ceramics/cup.jpg",
  6: "/images/products/ceramics/plate.jpg",

  7: "/images/products/wood/wooden-box.jpg",
  8: "/images/products/wood/wooden-shelf.jpg",
  9: "/images/products/wood/small-table.jpg",

  10: "/images/products/sewing/embroidered-cloth.jpg",
  11: "/images/products/sewing/embroidered-bag.jpg",
  12: "/images/products/sewing/traditional-shawl.jpg",
  16: "/images/products/sewing/iraqi-embroidery.jpg",
  17: "/images/products/sewing/handmade-embroidered-bag.jpg",
  18: "/images/products/sewing/embroidered-pillow.jpg",

  13: "/images/products/palm/palm-basket.jpg",
  14: "/images/products/palm/palm-mat.jpg",
  15: "/images/products/palm/palm-storage-basket.jpg",
};

function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const imageSrc =
    productImages[product.id] ||
    product.image?.trim() ||
    null;

  const categoryName =
    product.category_name ||
    product.category ||
    "Handmade";

  const formattedPrice = Number(
    product.price || 0
  ).toLocaleString("en-US");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    const checkFavorite = async () => {
      try {
        const favorites = await api.favorites.getAll();

        const favoriteList = Array.isArray(favorites)
          ? favorites
          : [];

        const exists = favoriteList.some(
          (favorite) =>
            Number(
              favorite.product_id ??
                favorite.productId ??
                favorite.product?.id
            ) === Number(product.id)
        );

        setIsFavorite(exists);
      } catch (error) {
        console.error(
          "Failed to load favorite status:",
          error
        );
      }
    };

    checkFavorite();
  }, [product.id]);

  const toggleFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to add products to favorites.");
      return;
    }

    if (favoriteLoading) return;

    try {
      setFavoriteLoading(true);

      if (isFavorite) {
        await api.favorites.remove(product.id);
        setIsFavorite(false);
      } else {
        await api.favorites.add({
          product_id: product.id,
        });

        setIsFavorite(true);
      }
    } catch (error) {
      console.error(
        "Failed to update favorite:",
        error
      );

      alert(
        error.message ||
          "Failed to update favorites."
      );
    } finally {
      setFavoriteLoading(false);
    }
  };

  return (
    <article className="product-card group">

      {/* Image */}
      <div className="product-card-image-wrapper">

        <Link to={`/products/${product.id}`}>
          <div className="product-card-image">

            {imageSrc ? (
              <img
                src={imageSrc}
                alt={product.name || "Handmade product"}
              />
            ) : (
              <div className="product-card-no-image">
                <span>𒀭</span>
                <p>Handmade Product</p>
              </div>
            )}

            <div className="product-card-image-overlay" />
          </div>
        </Link>

        {/* Category */}
        <div className="product-card-category">
          {categoryName}
        </div>

        {/* Favorite */}
        <button
          type="button"
          onClick={toggleFavorite}
          disabled={favoriteLoading}
          aria-label={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          title={
            isFavorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
          className="product-card-favorite"
        >
          {favoriteLoading
            ? "…"
            : isFavorite
            ? "♥"
            : "♡"}
        </button>
      </div>

      {/* Content */}
      <div className="product-card-content">

        <Link to={`/products/${product.id}`}>
          <h3 className="product-card-title">
            {product.name || "Handmade Product"}
          </h3>
        </Link>

        {product.description && (
          <p className="product-card-description">
            {product.description}
          </p>
        )}

        <div className="product-card-divider" />

        <div className="product-card-bottom">

          <div>
            <span className="product-card-price-label">
              Price
            </span>

            <p className="product-card-price">
              {formattedPrice}
              <span> IQD</span>
            </p>
          </div>

          <Link
            to={`/products/${product.id}`}
            className="product-card-view"
          >
            View
            <span>→</span>
          </Link>

        </div>
      </div>
    </article>
  );
}

export default ProductCard;