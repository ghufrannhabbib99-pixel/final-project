import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import productImages from "../../data/productImages";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
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
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [
          productResponse,
          categoriesResponse,
        ] = await Promise.all([
          api.products.getById(id),
          api.categories.getAll(),
        ]);

        const product =
          productResponse?.data || productResponse;

        const categoryList =
          categoriesResponse?.data ||
          categoriesResponse ||
          [];

        setCategories(
          Array.isArray(categoryList)
            ? categoryList
            : []
        );

        setFormData({
          name: product?.name || "",
          description: product?.description || "",
          price: product?.price || "",
          stock_quantity:
            product?.stock_quantity ?? "",
          image: product?.image || "",
          category_id:
            product?.category_id ?? "",
        });
      } catch (error) {
        console.error(error);

        setError(
          error.message || "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setSuccess("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) <= 0
    ) {
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

      await api.products.update(id, {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: Number(formData.price),
        stock_quantity: Number(
          formData.stock_quantity
        ),
        image: formData.image.trim(),
        category_id: formData.category_id
          ? Number(formData.category_id)
          : null,
      });

      setSuccess("Product updated successfully!");

      setTimeout(() => {
        navigate("/artisan/products");
      }, 800);
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await api.products.remove(id);

      alert("Product deleted successfully!");

      navigate("/artisan/products");
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to delete product."
      );
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <main className="artisan-edit-loading">
        <div className="artisan-edit-loading-card">
          <div className="artisan-edit-loading-icon">
            ✦
          </div>

          <div className="artisan-edit-loading-line large" />
          <div className="artisan-edit-loading-line small" />

          <div className="artisan-edit-loading-box" />
        </div>
      </main>
    );
  }

  if (error && !formData.name) {
    return (
      <main className="artisan-edit-error-page">
        <div className="artisan-edit-error-card">
          <div className="artisan-edit-error-icon">
            ⚠️
          </div>

          <h1>Something went wrong</h1>

          <p>{error}</p>

          <Link
            to="/artisan/products"
            className="artisan-edit-primary"
          >
            ← Back to My Products
          </Link>
        </div>
      </main>
    );
  }

  const previewImage =
    formData.image ||
    productImages[formData.name] ||
    null;

  const selectedCategory =
    categories.find(
      (category) =>
        Number(category.id) ===
        Number(formData.category_id)
    )?.name || "Handmade";

  return (
    <main className="artisan-edit-page">
      <div className="artisan-edit-decoration artisan-edit-decoration-one">
        𒀭
      </div>

      <div className="artisan-edit-decoration artisan-edit-decoration-two">
        ✧
      </div>

      <section className="artisan-edit-header">
        <div className="artisan-edit-header-inner">
          <div>
            <Link
              to="/artisan/products"
              className="artisan-edit-back"
            >
              ← Back to My Products
            </Link>

            <p className="artisan-edit-kicker">
              Artisan Workspace
            </p>

            <h1 className="artisan-edit-title">
              Edit Product
            </h1>

            <p className="artisan-edit-description">
              Update your product information, price,
              stock, category, or image.
            </p>
          </div>
        </div>
      </section>

      <section className="artisan-edit-content">
        {success && (
          <div className="artisan-edit-success">
            <span>✓</span>
            {success}
          </div>
        )}

        {error && (
          <div className="artisan-edit-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <div className="artisan-edit-layout">
          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="artisan-edit-form-card"
          >
            <div className="artisan-edit-form-heading">
              <p>Product Information</p>

              <h2>Update your creation</h2>

              <span>
                Keep your product details accurate so customers
                know exactly what they are buying.
              </span>
            </div>

            <div className="artisan-edit-form">
              <div className="artisan-edit-field">
                <label>Product Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter product name"
                />
              </div>

              <div className="artisan-edit-field">
                <label>Description</label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Describe your handmade product..."
                />
              </div>

              <div className="artisan-edit-two-columns">
                <div className="artisan-edit-field">
                  <label>Price (IQD)</label>

                  <input
                    type="number"
                    name="price"
                    min="0.01"
                    step="0.01"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="25000"
                  />
                </div>

                <div className="artisan-edit-field">
                  <label>Stock Quantity</label>

                  <input
                    type="number"
                    name="stock_quantity"
                    min="0"
                    step="1"
                    value={formData.stock_quantity}
                    onChange={handleChange}
                    placeholder="10"
                  />
                </div>
              </div>

              <div className="artisan-edit-field">
                <label>Category</label>

                <select
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
              </div>

              <div className="artisan-edit-field">
                <label>Image URL</label>

                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/images/products/..."
                />

                <small>
                  You can enter an image URL or leave it empty.
                </small>
              </div>

              <div className="artisan-edit-actions">
                <button
                  type="submit"
                  disabled={saving || deleting}
                  className="artisan-edit-primary"
                >
                  {saving
                    ? "Saving..."
                    : "Save Changes"}
                </button>

                <Link
                  to="/artisan/products"
                  className="artisan-edit-secondary"
                >
                  Cancel
                </Link>
              </div>

              <div className="artisan-edit-danger">
                <div>
                  <p>Danger Zone</p>

                  <h3>Delete this product</h3>

                  <span>
                    Deleting this product will permanently
                    remove it from your products.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={saving || deleting}
                  className="artisan-edit-delete"
                >
                  {deleting
                    ? "Deleting..."
                    : "Delete Product"}
                </button>
              </div>
            </div>
          </form>

          {/* Preview */}
          <aside className="artisan-edit-preview-card">
            <div className="artisan-edit-preview-heading">
              <p>Live Preview</p>
              <h2>Product Preview</h2>
            </div>

            <div className="artisan-edit-preview-image">
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
                  <p>Product Preview</p>
                </div>
              )}
            </div>

            <div className="artisan-edit-preview-body">
              <p className="artisan-edit-preview-category">
                {selectedCategory}
              </p>

              <h3>
                {formData.name || "Product Name"}
              </h3>

              <p className="artisan-edit-preview-description">
                {formData.description ||
                  "Product description will appear here."}
              </p>

              <div className="artisan-edit-preview-meta">
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
          </aside>
        </div>
      </section>
    </main>
  );
}

export default EditProduct;