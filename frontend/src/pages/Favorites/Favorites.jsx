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

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadFavorites = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login to view your favorites.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [favoritesResponse, productsResponse] =
          await Promise.all([
            api.favorites.getAll(),
            api.products.getAll(),
          ]);

        console.log("FAVORITES:", favoritesResponse);
        console.log("PRODUCTS:", productsResponse);

        const favoriteList = Array.isArray(favoritesResponse)
          ? favoritesResponse
          : [];

        const productList = Array.isArray(productsResponse)
          ? productsResponse
          : [];

        setFavorites(favoriteList);
        setProducts(productList);
      } catch (err) {
        console.error(
          "Failed to load favorites:",
          err
        );

        setError(
          err.message ||
            "Failed to load your favorites."
        );
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const favoriteProducts = favorites
    .map((favorite) => {
      const productId =
        favorite.product_id ??
        favorite.productId ??
        favorite.product?.id;

      return products.find(
        (product) =>
          Number(product.id) === Number(productId)
      );
    })
    .filter(Boolean);

  const removeFavorite = async (productId) => {
    if (removingId !== null) return;

    try {
      setRemovingId(productId);

      await api.favorites.remove(productId);

      setFavorites((currentFavorites) =>
        currentFavorites.filter((favorite) => {
          const favoriteProductId =
            favorite.product_id ??
            favorite.productId ??
            favorite.product?.id;

          return (
            Number(favoriteProductId) !==
            Number(productId)
          );
        })
      );
    } catch (err) {
      console.error(
        "Failed to remove favorite:",
        err
      );

      alert(
        err.message ||
          "Failed to remove from favorites."
      );
    } finally {
      setRemovingId(null);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="mx-auto h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mx-auto mt-3 h-5 w-80 animate-pulse rounded bg-gray-200" />

          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl bg-white shadow"
              >
                <div className="aspect-square animate-pulse bg-gray-200" />

                <div className="space-y-3 p-5">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="h-5 w-40 animate-pulse rounded bg-gray-200" />
                  <div className="h-8 w-full animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8">
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-10 text-center shadow-xl">

          <div className="text-6xl">
            ♡
          </div>

          <h1 className="mt-5 text-3xl font-black text-[#003049]">
            Favorites
          </h1>

          <p className="mt-3 text-gray-600">
            {error}
          </p>

          <Link
            to="/login"
            className="mt-7 inline-flex rounded-xl bg-[#003049] px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#780000]"
          >
            Login
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <section className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
            Alherfa
          </p>

          <h1 className="mt-2 text-4xl font-black text-[#003049] md:text-5xl">
            My Favorites
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-[#003049]/60">
            Your favorite handmade products, all in one place.
          </p>

        </section>

        {/* Count */}
        <div className="mt-8 flex justify-center">
          <div className="rounded-full bg-white px-6 py-3 font-bold text-[#003049] shadow-md">
            ♥ {favoriteProducts.length}{" "}
            {favoriteProducts.length === 1
              ? "Favorite"
              : "Favorites"}
          </div>
        </div>

        {/* Empty */}
        {favoriteProducts.length === 0 ? (
          <div className="mx-auto mt-10 max-w-2xl rounded-3xl bg-white p-12 text-center shadow-xl">

            <div className="text-7xl text-[#780000]">
              ♡
            </div>

            <h2 className="mt-6 text-2xl font-black text-[#003049]">
              No favorites yet
            </h2>

            <p className="mt-3 text-gray-500">
              Start exploring our handmade products
              and save the ones you love.
            </p>

            <Link
              to="/products"
              className="mt-7 inline-flex rounded-xl bg-[#003049] px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#780000]"
            >
              Explore Products
            </Link>

          </div>
        ) : (

          /* Products */
          <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {favoriteProducts.map((product) => {

              const imageSrc =
                productImages[product.id] ||
                product.image?.trim() ||
                null;

              const categoryName =
                product.category_name ||
                product.category ||
                "Handmade";

              const formattedPrice =
                Number(
                  product.price || 0
                ).toLocaleString("en-US");

              const isRemoving =
                Number(removingId) ===
                Number(product.id);

              return (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >

                  {/* Image */}
                  <div className="relative">

                    <Link
                      to={`/products/${product.id}`}
                    >
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
                          <div className="flex h-full w-full items-center justify-center text-5xl text-[#780000]">
                            𒀭
                          </div>
                        )}

                      </div>
                    </Link>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() =>
                        removeFavorite(product.id)
                      }
                      disabled={isRemoving}
                      aria-label="Remove from favorites"
                      title="Remove from favorites"
                      className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-2xl text-[#780000] shadow-md backdrop-blur-sm transition hover:scale-110 hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isRemoving ? "…" : "♥"}
                    </button>

                  </div>

                  {/* Info */}
                  <div className="p-5">

                    <p className="text-xs font-medium uppercase tracking-wider text-[#780000]">
                      {categoryName}
                    </p>

                    <Link
                      to={`/products/${product.id}`}
                    >
                      <h2 className="mt-2 text-lg font-semibold text-[#003049] transition hover:text-[#780000]">
                        {product.name}
                      </h2>
                    </Link>

                    <div className="mt-4 flex items-center justify-between gap-3">

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
            })}

          </div>
        )}

      </div>
    </main>
  );
}

export default Favorites;