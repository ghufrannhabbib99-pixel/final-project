import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import productImages from "../../data/productImages";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: "",
    category_id: "",
  });

  const [categories, setCategories] = useState([]);
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const storedUser = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        const currentUser = storedUser?.user || storedUser;

        if (!currentUser?.id) {
          setError("Please login first.");
          return;
        }

        const [artisansResponse, categoriesResponse] =
          await Promise.all([
            api.artisans.getAll(),
            api.categories.getAll(),
          ]);

        const artisans = Array.isArray(artisansResponse)
          ? artisansResponse
          : artisansResponse?.data || [];

        const loadedCategories = Array.isArray(
          categoriesResponse
        )
          ? categoriesResponse
          : categoriesResponse?.data || [];

        const currentArtisan = artisans.find(
          (item) =>
            Number(item.user_id) === Number(currentUser.id) ||
            Number(item.userId) === Number(currentUser.id)
        );

        if (!currentArtisan) {
          setError(
            "Your artisan profile could not be found. Please make sure your account is registered as an artisan."
          );
          return;
        }

        setArtisan(currentArtisan);
        setCategories(loadedCategories);
      } catch (err) {
        console.error(
          "Failed to load add product data:",
          err
        );

        setError(
          err.message ||
            "Failed to load artisan information."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setError("");
  };

  const previewImage =
    formData.image.trim() ||
    productImages[formData.name.trim()] ||
    null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!artisan?.id) {
      setError("Artisan profile was not found.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (
      formData.stock_quantity === "" ||
      Number(formData.stock_quantity) < 0
    ) {
      setError("Stock quantity cannot be negative.");
      return;
    }

    try {
      setSaving(true);

      await api.products.create({
        artisan_id: Number(artisan.id),

        category_id: formData.category_id
          ? Number(formData.category_id)
          : null,

        name: formData.name.trim(),

        description: formData.description.trim(),

        price: Number(formData.price),

        stock_quantity: Number(
          formData.stock_quantity
        ),

        image:
          formData.image.trim() ||
          productImages[formData.name.trim()] ||
          "",
      });

      alert("Product added successfully!");

      navigate("/artisan/products");
    } catch (err) {
      console.error(
        "Failed to add product:",
        err
      );

      setError(
        err.message || "Failed to add product."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="artisan-add-loading">
        <div className="artisan-add-loading-card">
          <div className="artisan-add-loading-icon">
            🧺
          </div>

          <div className="artisan-add-loading-line large" />
          <div className="artisan-add-loading-line small" />
        </div>
      </main>
    );
  }

  return (
    <main className="artisan-add-page">
      <div className="artisan-add-decoration artisan-add-decoration-one">
        𒀭
      </div>

      <div className="artisan-add-decoration artisan-add-decoration-two">
        ◇
      </div>

      {/* Header */}
      <section className="artisan-add-header">
        <div className="artisan-add-header-inner">
          <div>
            <p className="artisan-add-kicker">
              Artisan Workspace
            </p>

            <h1 className="artisan-add-title">
              Add Product
            </h1>

            <p className="artisan-add-description">
              Add a new handmade product to your marketplace
              collection.
            </p>

            {artisan && (
              <div className="artisan-add-artisan-badge">
                Artisan:{" "}
                {artisan.artisan_name ||
                  artisan.name ||
                  artisan.craft_name ||
                  `#${artisan.id}`}
              </div>
            )}
          </div>

          <Link
            to="/artisan/products"
            className="artisan-add-back"
          >
            <span>←</span>
            My Products
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="artisan-add-content">
        <div className="artisan-add-layout">
          {/* Form */}
          <div className="artisan-add-form-card">
            <div className="artisan-add-form-heading">
              <p>Product Details</p>

              <h2>Create a new product</h2>

              <span>
                Fill in the information below to publish your
                handmade product.
              </span>
            </div>

            {error && (
              <div className="artisan-add-error">
                <span>⚠️</span>

                <div>
                  <strong>Unable to add product</strong>
                  <p>{error}</p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="artisan-add-form"
            >
              <div className="artisan-add-field">
                <label htmlFor="name">
                  Product Name
                </label>

                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div className="artisan-add-field">
                <label htmlFor="description">
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your handmade product..."
                  rows={5}
                />
              </div>

              <div className="artisan-add-two-columns">
                <div className="artisan-add-field">
                  <label htmlFor="price">
                    Price
                  </label>

                  <div className="artisan-add-input-suffix">
                    <input
                      id="price"
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="25000"
                      min="1"
                      step="0.01"
                      required
                    />

                    <span>IQD</span>
                  </div>
                </div>

                <div className="artisan-add-field">
                  <label htmlFor="stock_quantity">
                    Stock Quantity
                  </label>

                  <input
                    id="stock_quantity"
                    type="number"
                    name="stock_quantity"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    placeholder="10"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="artisan-add-field">
                <label htmlFor="category_id">
                  Category
                </label>

                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                >
                  <option value="">
                    Select a category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                    >
                      {category.name ||
                        category.category_name ||
                        `Category ${category.id}`}
                    </option>
                  ))}
                </select>

                <small>
                  Category is optional.
                </small>
              </div>

              <div className="artisan-add-field">
                <label htmlFor="image">
                  Image URL
                </label>

                <input
                  id="image"
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/product-image.jpg"
                />

                <small>
                  Leave empty to use the default product image.
                </small>
              </div>

              <div className="artisan-add-actions">
                <Link
                  to="/artisan/products"
                  className="artisan-add-cancel"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={saving}
                  className="artisan-add-submit"
                >
                  {saving
                    ? "Adding Product..."
                    : "Add Product"}
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="artisan-add-sidebar">
            {/* Preview */}
            <div className="artisan-add-preview-card">
              <div className="artisan-add-preview-heading">
                <p>Preview</p>
                <h3>Product Preview</h3>
              </div>

              <div className="artisan-add-preview-image">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={
                      formData.name ||
                      "Product preview"
                    }
                  />
                ) : (
                  <div>
                    <span>🧶</span>
                    <p>Product Image</p>
                  </div>
                )}
              </div>

              <div className="artisan-add-preview-body">
                <p className="artisan-add-preview-label">
                  Handmade
                </p>

                <h4>
                  {formData.name || "Product Name"}
                </h4>

                <p>
                  {formData.description ||
                    "Your product description will appear here."}
                </p>

                <div className="artisan-add-preview-meta">
                  <div>
                    <small>Price</small>
                    <strong>
                      {formData.price
                        ? `${Number(
                            formData.price
                          ).toLocaleString()} IQD`
                        : "0 IQD"}
                    </strong>
                  </div>

                  <div>
                    <small>Stock</small>
                    <strong>
                      {formData.stock_quantity || 0}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="artisan-add-tips">
              <div className="artisan-add-tips-icon">
                🧺
              </div>

              <h2>Product Tips</h2>

              <div className="artisan-add-tip-list">
                <div>
                  <span>✓</span>
                  <p>
                    Use a clear and descriptive product name.
                  </p>
                </div>

                <div>
                  <span>✓</span>
                  <p>
                    Describe the materials and craftsmanship.
                  </p>
                </div>

                <div>
                  <span>✓</span>
                  <p>
                    Set an accurate price and stock quantity.
                  </p>
                </div>

                <div>
                  <span>✓</span>
                  <p>
                    Use a high-quality product image.
                  </p>
                </div>
              </div>
            </div>

            {/* Help */}
            <div className="artisan-add-help">
              <p>Need Help?</p>

              <h3>Manage your products</h3>

              <span>
                After adding your product, you can edit or
                delete it from your products page.
              </span>

              <Link to="/artisan/products">
                Go to My Products →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

export default AddProduct;