import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Pencil,
  Trash2,
  Package,
  ArrowRight,
  Search,
  RefreshCw,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

import productImages from "../../data/productImages";

import "./MyProducts.css";

const API_URL = "http://localhost:5000/api";

const normalizeArray = (response) => {
  if (Array.isArray(response)) return response;

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  return [];
};

const getStoredUser = () => {
  try {
    const raw = localStorage.getItem("user");

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);

    return parsed?.user || parsed;
  } catch (error) {
    console.error("Failed to read stored user:", error);
    return null;
  }
};

const getToken = () => {
  return (
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    ""
  );
};

const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
};

const getProductImage = (product) => {
  if (product?.image) {
    return product.image;
  }

  if (product?.image_url) {
    return product.image_url;
  }

  if (product?.imageUrl) {
    return product.imageUrl;
  }

  if (product?.name && productImages?.[product.name]) {
    return productImages[product.name];
  }

  return null;
};

const getProductPrice = (product) => {
  const price = Number(product?.price);

  if (!Number.isFinite(price)) {
    return "0";
  }

  return price.toLocaleString("en-US");
};

export default function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [artisan, setArtisan] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const storedUser = getStoredUser();

      if (!storedUser?.id) {
        navigate("/login");
        return;
      }

      // Get all artisans
      const artisansResponse = await apiRequest("/artisans");

      const artisans = normalizeArray(artisansResponse);

      // Find artisan connected to logged-in user
      const currentArtisan = artisans.find(
        (item) =>
          String(item?.user_id ?? item?.userId) ===
          String(storedUser.id)
      );

      if (!currentArtisan) {
        setArtisan(null);
        setProducts([]);

        setError(
          "No artisan profile was found for this account."
        );

        return;
      }

      setArtisan(currentArtisan);

      // Get artisan products
      const productsResponse = await apiRequest(
        `/products/artisan/${currentArtisan.id}`
      );

      setProducts(normalizeArray(productsResponse));
    } catch (err) {
      console.error("My products error:", err);

      setError(
        err?.message ||
          "Failed to load your products."
      );
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      loadProducts();
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [loadProducts]);

  const filteredProducts = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const name = String(
        product?.name || ""
      ).toLowerCase();

      const description = String(
        product?.description || ""
      ).toLowerCase();

      return (
        name.includes(value) ||
        description.includes(value)
      );
    });
  }, [products, search]);

  const handleDelete = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(productId);
      setError("");

      await apiRequest(
        `/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      setProducts((current) =>
        current.filter(
          (product) => product.id !== productId
        )
      );
    } catch (err) {
      console.error("Delete product error:", err);

      setError(
        err?.message ||
          "Failed to delete the product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="my-products-page">
        <div className="my-products-orb my-products-orb-one" />
        <div className="my-products-orb my-products-orb-two" />

        <div className="my-products-container">
          <div className="products-loading-header">
            <div className="loading-line loading-title" />
            <div className="loading-line loading-subtitle" />
          </div>

          <div className="products-loading-grid">
            {[1, 2, 3].map((item) => (
              <div
                className="product-loading-card"
                key={item}
              >
                <div className="loading-image" />

                <div className="loading-content">
                  <div className="loading-line" />
                  <div className="loading-line short" />
                  <div className="loading-line medium" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-products-page">
      <div className="my-products-orb my-products-orb-one" />
      <div className="my-products-orb my-products-orb-two" />

      <main className="my-products-container">
        <header className="my-products-header">
          <div>
            <Link
              to="/artisan/dashboard"
              className="products-back-link"
            >
              <ArrowRight size={17} />

              <span>
                Back to dashboard
              </span>
            </Link>

            <div className="products-kicker">
              <Package size={16} />

              <span>
                Artisan workspace
              </span>
            </div>

            <h1>
              My Products
            </h1>

            <p>
              Manage your handmade products,
              update details, and keep your
              collection organized.
            </p>

            {artisan && (
              <div className="artisan-mini-badge">
                <span className="artisan-status-dot" />

                {artisan.craft_name ||
                  artisan.craftName ||
                  "Artisan account"}
              </div>
            )}
          </div>

          <Link
            to="/artisan/products/add"
            className="add-product-main-btn"
          >
            <Plus size={19} />

            <span>
              Add Product
            </span>
          </Link>
        </header>

        {error && (
          <div className="products-alert">
            <AlertCircle size={20} />

            <span>
              {error}
            </span>

            <button
              type="button"
              onClick={loadProducts}
            >
              <RefreshCw size={16} />

              Retry
            </button>
          </div>
        )}

        <section className="products-toolbar">
          <div className="products-count">
            <div className="products-count-icon">
              <ShoppingBag size={19} />
            </div>

            <div>
              <strong>
                {products.length}
              </strong>

              <span>
                Products in your collection
              </span>
            </div>
          </div>

          <div className="products-search">
            <Search size={18} />

            <input
              type="text"
              placeholder="Search your products..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </section>

        {!error &&
        products.length === 0 ? (
          <section className="products-empty">
            <div className="products-empty-icon">
              <Package size={34} />
            </div>

            <h2>
              Your collection is empty
            </h2>

            <p>
              Start adding your handmade
              products and showcase your
              work on AlHerfa.
            </p>

            <Link
              to="/artisan/products/add"
              className="empty-add-btn"
            >
              <Plus size={18} />

              Add your first product
            </Link>
          </section>
        ) : filteredProducts.length === 0 ? (
          <section className="products-empty search-empty">
            <div className="products-empty-icon">
              <Search size={32} />
            </div>

            <h2>
              No products found
            </h2>

            <p>
              Try searching with a different
              product name.
            </p>

            <button
              type="button"
              className="empty-add-btn secondary"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          </section>
        ) : (
          <section className="my-products-grid">
            {filteredProducts.map(
              (product, index) => {
                const image =
                  getProductImage(product);

                return (
                  <article
                    className="my-product-card"
                    key={product.id}
                    style={{
                      "--card-delay":
                        `${index * 70}ms`,
                    }}
                  >
                    <div className="my-product-image-wrap">
                      {image ? (
                        <img
                          src={image}
                          alt={
                            product.name ||
                            "Product"
                          }
                          className="my-product-image"
                        />
                      ) : (
                        <div className="my-product-image-placeholder">
                          <Package size={38} />

                          <span>
                            No image
                          </span>
                        </div>
                      )}

                      <div className="product-image-overlay" />

                      {product.stock !==
                        undefined && (
                        <span className="stock-badge">
                          {Number(
                            product.stock
                          ) > 0
                            ? `${product.stock} in stock`
                            : "Out of stock"}
                        </span>
                      )}
                    </div>

                    <div className="my-product-content">
                      <div className="my-product-top">
                        <span className="product-small-label">
                          Handmade
                        </span>

                        <strong className="my-product-price">
                          {getProductPrice(
                            product
                          )}{" "}
                          IQD
                        </strong>
                      </div>

                      <h2>
                        {product.name ||
                          "Untitled product"}
                      </h2>

                      <p>
                        {product.description ||
                          "A handmade product crafted with care."}
                      </p>

                      <div className="my-product-actions">
                        <button
                          type="button"
                          className="product-edit-btn"
                          onClick={() =>
                            navigate(
                              `/artisan/products/edit/${product.id}`
                            )
                          }
                        >
                          <Pencil size={16} />

                          Edit
                        </button>

                        <button
                          type="button"
                          className="product-delete-btn"
                          disabled={
                            deletingId ===
                            product.id
                          }
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                        >
                          {deletingId ===
                          product.id ? (
                            <span className="mini-spinner" />
                          ) : (
                            <Trash2 size={16} />
                          )}

                          {deletingId ===
                          product.id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </section>
        )}
      </main>
    </div>
  );
}