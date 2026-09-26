import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import productImages from "../../data/productImages";

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

        const [productResponse, categoriesResponse] =
          await Promise.all([
            api.products.getById(id),
            api.categories.getAll(),
          ]);

        const product =
          productResponse.data || productResponse;

        const categoryList =
          categoriesResponse.data || categoriesResponse || [];

        setCategories(categoryList);

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock_quantity: product.stock_quantity ?? "",
          image: product.image || "",
          category_id: product.category_id ?? "",
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
        stock_quantity: Number(formData.stock_quantity),
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
      <main className="min-h-screen bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse">
            <div className="h-5 w-40 rounded bg-[#780000]/20" />

            <div className="mt-4 h-12 w-80 rounded bg-[#003049]/15" />

            <div className="mt-8 h-[700px] rounded-3xl bg-white/70" />
          </div>
        </div>
      </main>
    );
  }

  if (error && !formData.name) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-5xl">⚠️</div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[#669BBC]">
            {error}
          </p>

          <Link
            to="/artisan/products"
            className="mt-6 inline-block rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:bg-[#C1121F]"
          >
            Back to My Products
          </Link>
        </div>
      </main>
    );
  }

  const previewImage =
    formData.image ||
    productImages[formData.name] ||
    null;

  return (
    <main className="min-h-screen bg-[#FDF0D5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            to="/artisan/products"
            className="inline-flex items-center gap-2 font-semibold text-[#780000] transition-colors hover:text-[#C1121F]"
          >
            ← Back to My Products
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
            Artisan Workspace
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#003049] sm:text-5xl">
            Edit Product
          </h1>

          <p className="mt-3 max-w-2xl text-lg leading-8 text-[#669BBC]">
            Update your product information, price, stock, category,
            or image.
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="mb-6 rounded-2xl border border-green-200 bg-green-50 px-5 py-4 font-semibold text-green-700">
            ✓ {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 font-semibold text-red-700">
            ⚠️ {error}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl bg-white p-6 shadow-xl sm:p-8"
          >
            {/* Product Name */}
            <div>
              <label className="block text-sm font-bold text-[#003049]">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="mt-2 w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              />
            </div>

            {/* Description */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-[#003049]">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe your handmade product..."
                className="mt-2 w-full resize-none rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              />
            </div>

            {/* Price + Stock */}
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-[#003049]">
                  Price (IQD)
                </label>

                <input
                  type="number"
                  name="price"
                  min="0.01"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="25000"
                  className="mt-2 w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#003049]">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stock_quantity"
                  min="0"
                  step="1"
                  value={formData.stock_quantity}
                  onChange={handleChange}
                  placeholder="10"
                  className="mt-2 w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-[#003049]">
                Category
              </label>

              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="mt-2 w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Image */}
            <div className="mt-6">
              <label className="block text-sm font-bold text-[#003049]">
                Image URL
              </label>

              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="/images/products/..."
                className="mt-2 w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3 text-[#003049] outline-none transition focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              />

              <p className="mt-2 text-xs text-[#669BBC]">
                You can enter an image URL or leave it empty.
              </p>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={saving || deleting}
                className="flex-1 rounded-xl bg-[#780000] px-6 py-3.5 font-bold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

              <Link
                to="/artisan/products"
                className="flex-1 rounded-xl border border-[#003049]/15 bg-white px-6 py-3.5 text-center font-bold text-[#003049] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                Cancel
              </Link>
            </div>

            {/* Delete */}
            <div className="mt-10 border-t border-[#669BBC]/15 pt-8">
              <h3 className="font-bold text-[#003049]">
                Danger Zone
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#669BBC]">
                Deleting this product will permanently remove it from
                your products.
              </p>

              <button
                type="button"
                onClick={handleDelete}
                disabled={saving || deleting}
                className="mt-4 rounded-xl border border-[#780000]/30 bg-white px-6 py-3 font-bold text-[#780000] transition-all duration-300 hover:bg-[#780000] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </form>

          {/* Preview */}
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-xl lg:sticky lg:top-6">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#780000]">
              Preview
            </p>

            <div className="mt-4 overflow-hidden rounded-2xl bg-[#FDF0D5]">
              <div className="h-64">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt={formData.name || "Product preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl">🧶</div>

                      <p className="mt-3 text-sm font-semibold text-[#669BBC]">
                        Product Preview
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                  {categories.find(
                    (category) =>
                      Number(category.id) ===
                      Number(formData.category_id)
                  )?.name || "Handmade"}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003049]">
                  {formData.name || "Product Name"}
                </h2>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#669BBC]">
                  {formData.description ||
                    "Product description will appear here."}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#669BBC]/15 pt-4">
                  <div>
                    <p className="text-xs text-[#669BBC]">
                      Price
                    </p>

                    <p className="mt-1 font-bold text-[#780000]">
                      {formData.price
                        ? `${Number(formData.price).toLocaleString()} IQD`
                        : "0 IQD"}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-[#669BBC]">
                      Stock
                    </p>

                    <p className="mt-1 font-bold text-[#003049]">
                      {formData.stock_quantity || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default EditProduct;