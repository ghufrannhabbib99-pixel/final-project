import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./Favorites.css";

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

        const favoriteList = Array.isArray(favoritesResponse)
          ? favoritesResponse
          : [];

        const productList = Array.isArray(productsResponse)
          ? productsResponse
          : [];

        setFavorites(favoriteList);
        setProducts(productList);
      } catch (err) {
        console.error("Failed to load favorites:", err);

        setError(
          err.message || "Failed to load your favorites."
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
      console.error("Failed to remove favorite:", err);

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
      <main className="favorites-page favorites-loading-page">
        <div className="favorites-orb favorites-orb-one" />
        <div className="favorites-orb favorites-orb-two" />

        <div className="favorites-container">
          <div className="favorites-loading-header">
            <div className="favorites-skeleton skeleton-small" />
            <div className="favorites-skeleton skeleton-title" />
            <div className="favorites-skeleton skeleton-text" />
          </div>

          <div className="favorites-skeleton-count" />

          <div className="favorites-grid">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="favorite-skeleton-card"
              >
                <div className="favorite-skeleton-image" />

                <div className="favorite-skeleton-content">
                  <div className="favorite-skeleton-line small" />
                  <div className="favorite-skeleton-line medium" />
                  <div className="favorite-skeleton-line price" />
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
      <main className="favorites-page favorites-error-page">
        <div className="favorites-orb favorites-orb-one" />
        <div className="favorites-orb favorites-orb-two" />

        <div className="favorites-container">
          <section className="favorites-message-card">
            <div className="favorites-message-icon">♡</div>

            <span className="favorites-kicker">
              ALHERFA COLLECTION
            </span>

            <h1>Favorites</h1>

            <p>{error}</p>

            <Link
              to="/login"
              className="favorites-primary-button"
            >
              Login
              <span>→</span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="favorites-page">
      <div className="favorites-orb favorites-orb-one" />
      <div className="favorites-orb favorites-orb-two" />
      <div className="favorites-cuneiform">𒀭</div>

      <section className="favorites-hero">
        <div className="favorites-pattern favorites-pattern-one" />
        <div className="favorites-pattern favorites-pattern-two" />

        <div className="favorites-hero-content">
          <div className="favorites-kicker">
            <span className="favorites-kicker-line" />
            ALHERFA COLLECTION
            <span className="favorites-kicker-line" />
          </div>

          <h1>
            My
            <span> Favorites</span>
          </h1>

          <div className="favorites-title-decoration">
            <span />
            <b>♥</b>
            <span />
          </div>

          <p>
            Keep the handcrafted pieces you love
            close and discover them whenever you want.
          </p>
        </div>
      </section>

      <section className="favorites-content-section">
        <div className="favorites-container">

          <div className="favorites-toolbar">
            <div className="favorites-toolbar-left">
              <span className="favorites-section-label">
                YOUR COLLECTION
              </span>

              <h2>Saved Products</h2>
            </div>

            <div className="favorites-count">
              <span>♥</span>

              <strong>
                {favoriteProducts.length}
              </strong>

              <small>
                {favoriteProducts.length === 1
                  ? "Favorite"
                  : "Favorites"}
              </small>
            </div>
          </div>

          {favoriteProducts.length === 0 ? (
            <section className="favorites-empty-card">
              <div className="favorites-empty-icon">
                ♡
              </div>

              <span className="favorites-empty-kicker">
                YOUR COLLECTION IS WAITING
              </span>

              <h2>No favorites yet</h2>

              <p>
                Start exploring our handmade products
                and save the pieces that speak to you.
              </p>

              <Link
                to="/products"
                className="favorites-primary-button"
              >
                Explore Products
                <span>→</span>
              </Link>

              <div className="favorites-empty-symbol">
                𒀭
              </div>
            </section>
          ) : (
            <div className="favorites-grid">
              {favoriteProducts.map((product, index) => {
                const imageSrc =
                  productImages[product.id] ||
                  product.image?.trim() ||
                  null;

                const categoryName =
                  product.category_name ||
                  product.category ||
                  "Handmade";

                const formattedPrice =
                  Number(product.price || 0).toLocaleString(
                    "en-US"
                  );

                const isRemoving =
                  Number(removingId) ===
                  Number(product.id);

                return (
                  <article
                    key={product.id}
                    className={`favorite-card ${
                      isRemoving
                        ? "favorite-card-removing"
                        : ""
                    }`}
                    style={{
                      animationDelay: `${index * 0.08}s`,
                    }}
                  >
                    <div className="favorite-image-wrapper">

                      <Link
                        to={`/products/${product.id}`}
                        className="favorite-image-link"
                      >
                        <div className="favorite-image">

                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={
                                product.name ||
                                "Handmade product"
                              }
                            />
                          ) : (
                            <div className="favorite-image-fallback">
                              𒀭
                            </div>
                          )}

                          <div className="favorite-image-overlay">
                            <span>View Product</span>
                          </div>
                        </div>
                      </Link>

                      <span className="favorite-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          removeFavorite(product.id)
                        }
                        disabled={isRemoving}
                        aria-label="Remove from favorites"
                        title="Remove from favorites"
                        className="favorite-remove-button"
                      >
                        {isRemoving ? (
                          <span className="favorite-spinner" />
                        ) : (
                          "♥"
                        )}
                      </button>
                    </div>

                    <div className="favorite-card-content">

                      <div className="favorite-category-row">
                        <span>{categoryName}</span>
                        <span>HANDMADE</span>
                      </div>

                      <Link
                        to={`/products/${product.id}`}
                        className="favorite-product-link"
                      >
                        <h3>{product.name}</h3>
                      </Link>

                      <div className="favorite-card-footer">
                        <div className="favorite-price">
                          <small>PRICE</small>
                          <strong>
                            {formattedPrice} IQD
                          </strong>
                        </div>

                        <Link
                          to={`/products/${product.id}`}
                          className="favorite-view-button"
                        >
                          View
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="favorites-bottom-banner">
            <div className="favorites-banner-symbol">
              𒀭
            </div>

            <div>
              <span>ALHERFA COLLECTION</span>
              <p>
                Every saved piece supports Iraqi
                craftsmanship and local creativity.
              </p>
            </div>

            <Link to="/products">
              Continue Exploring
              <span>→</span>
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}

export default Favorites;