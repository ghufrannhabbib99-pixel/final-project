import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

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

  // Check whether this product is already in favorites
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      return;
    }

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
    <article className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">

      {/* Product Image */}
      <div className="relative">

        <Link to={`/products/${product.id}`}>
          <div className="aspect-square overflow-hidden bg-[#FDF0D5]">

            {imageSrc ? (
              <img
                src={imageSrc}
                alt={
                  product.name ||
                  "Handmade product"
                }
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center text-[#780000]">
                <span className="text-5xl">
                  𒀭
                </span>

                <span className="mt-3 text-sm font-medium text-[#003049]/60">
                  Handmade Product
                </span>
              </div>
            )}

          </div>
        </Link>

        {/* Favorite Button */}
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
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-2xl shadow-md backdrop-blur-sm transition duration-300 hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span
            className={
              isFavorite
                ? "text-[#780000]"
                : "text-[#003049]"
            }
          >
            {favoriteLoading
              ? "…"
              : isFavorite
              ? "♥"
              : "♡"}
          </span>
        </button>

      </div>

      {/* Product Info */}
      <div className="p-5">

        <p className="text-xs font-medium uppercase tracking-wider text-[#780000]">
          {categoryName}
        </p>

        <Link
          to={`/products/${product.id}`}
        >
          <h3 className="mt-2 text-lg font-semibold text-[#003049] transition hover:text-[#780000]">
            {product.name}
          </h3>
        </Link>

        <div className="mt-4 flex items-center justify-between">

          <p className="font-semibold text-[#003049]">
            {formattedPrice} IQD
          </p>

          <Link
            to={`/products/${product.id}`}
            className="rounded-full bg-[#003049] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#780000]"
          >
            View
          </Link>

        </div>

      </div>
    </article>
  );
}

export default ProductCard;