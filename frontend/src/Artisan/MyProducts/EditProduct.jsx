import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // Get Product
  // =========================
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        const product = response.data.data || response.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock_quantity: product.stock_quantity ?? "",
          image: product.image || "",
          category_id: product.category_id || "",
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================
  // Submit
  // =========================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (Number(formData.price) <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    if (Number(formData.stock_quantity) < 0) {
      setError("Stock quantity cannot be negative.");
      return;
    }

    try {
      setSaving(true);

      await axios.patch(
        `http://localhost:5000/api/products/${id}`,
        {
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: Number(formData.price),
          stock_quantity: Number(formData.stock_quantity),
          image: formData.image.trim(),
          category_id: formData.category_id
            ? Number(formData.category_id)
            : null,
        }
      );

      alert("Product updated successfully!");

      navigate("/artisan/products");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Failed to update product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 animate-pulse">
            <div className="h-4 w-32 rounded bg-[#669BBC]/20" />

            <div className="mt-4 h-12 w-72 rounded bg-[#003049]/20" />

            <div className="mt-3 h-5 w-96 max-w-full rounded bg-[#669BBC]/20" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="h-[650px] animate-pulse rounded-3xl bg-white shadow-xl lg:col-span-2" />

            <div className="h-80 animate-pulse rounded-3xl bg-[#003049]/20 shadow-xl" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5]">

      {/* =========================
          HEADER
      ========================= */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />

        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="relative mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
                Artisan Workspace
              </p>

              <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#003049] sm:text-5xl">
                Edit Product
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#669BBC] sm:text-lg">
                Update your handmade product information and keep
                your marketplace listing up to date.
              </p>
            </div>

            <Link
              to="/artisan/products"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#003049]/15 bg-white px-5 py-3 font-semibold text-[#003049] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-lg">←</span>
              My Products
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          MAIN
      ========================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-3">

            {/* =========================
                FORM
            ========================= */}
            <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-9 lg:col-span-2">

              <div className="mb-8 border-b border-[#669BBC]/15 pb-6">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#780000]">
                  Product Details
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#003049]">
                  Update your product
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#669BBC]">
                  Modify the information below and save your changes.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-2xl border border-[#780000]/20 bg-[#780000]/5 p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">⚠️</span>

                    <div>
                      <p className="font-semibold text-[#780000]">
                        Unable to update product
                      </p>

                      <p className="mt-1 text-sm text-[#780000]/80">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >

                {/* Product Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-bold text-[#003049]"
                  >
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
                    className="w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-bold text-[#003049]"
                  >
                    Description
                  </label>

                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your handmade product..."
                    rows={5}
                    className="w-full resize-none rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                  />
                </div>

                {/* Price + Stock */}
                <div className="grid gap-6 sm:grid-cols-2">

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="mb-2 block text-sm font-bold text-[#003049]"
                    >
                      Price
                    </label>

                    <div className="relative">
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
                        className="w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 pr-16 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                      />

                      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[#669BBC]">
                        IQD
                      </span>
                    </div>
                  </div>

                  {/* Stock */}
                  <div>
                    <label
                      htmlFor="stock_quantity"
                      className="mb-2 block text-sm font-bold text-[#003049]"
                    >
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
                      className="w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label
                    htmlFor="category_id"
                    className="mb-2 block text-sm font-bold text-[#003049]"
                  >
                    Category ID
                  </label>

                  <input
                    id="category_id"
                    type="number"
                    name="category_id"
                    value={formData.category_id}
                    onChange={handleChange}
                    placeholder="Enter category ID"
                    min="1"
                    className="w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                  />

                  <p className="mt-2 text-xs text-[#669BBC]">
                    Category is optional.
                  </p>
                </div>

                {/* Image */}
                <div>
                  <label
                    htmlFor="image"
                    className="mb-2 block text-sm font-bold text-[#003049]"
                  >
                    Image URL
                  </label>

                  <input
                    id="image"
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/product-image.jpg"
                    className="w-full rounded-xl border border-[#669BBC]/25 bg-[#FDF0D5]/30 px-4 py-3.5 text-[#003049] outline-none transition duration-300 placeholder:text-[#669BBC]/60 focus:border-[#780000] focus:bg-white focus:ring-4 focus:ring-[#780000]/10"
                  />

                  <p className="mt-2 text-xs text-[#669BBC]">
                    You can update the product image URL here.
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col-reverse gap-3 border-t border-[#669BBC]/15 pt-6 sm:flex-row sm:justify-end">

                  <Link
                    to="/artisan/products"
                    className="rounded-xl border border-[#003049]/15 bg-white px-6 py-3 text-center font-semibold text-[#003049] transition duration-300 hover:-translate-y-1 hover:border-[#003049] hover:shadow-md"
                  >
                    Cancel
                  </Link>

                  <button
                    type="submit"
                    disabled={saving}
                    className={`rounded-xl px-7 py-3 font-semibold transition duration-300 ${
                      saving
                        ? "cursor-not-allowed bg-[#780000]/50 text-[#FDF0D5]"
                        : "bg-[#780000] text-[#FDF0D5] hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
                    }`}
                  >
                    {saving ? "Saving Changes..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            {/* =========================
                SIDEBAR
            ========================= */}
            <aside className="space-y-6">

              {/* Preview */}
              <div className="overflow-hidden rounded-3xl bg-white shadow-xl">

                <div className="border-b border-[#669BBC]/15 px-6 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                    Preview
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[#003049]">
                    Product Preview
                  </h3>
                </div>

                <div className="p-6">

                  {/* Image */}
                  <div className="flex h-48 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#FDF0D5] to-[#669BBC]/20">

                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt={
                          formData.name ||
                          "Product preview"
                        }
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <div className="text-6xl">
                          🧶
                        </div>

                        <p className="mt-2 text-sm font-semibold text-[#669BBC]">
                          Product Image
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Product info */}
                  <div className="mt-5">

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                      Handmade
                    </p>

                    <h4 className="mt-2 line-clamp-2 text-xl font-bold text-[#003049]">
                      {formData.name || "Product Name"}
                    </h4>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#669BBC]">
                      {formData.description ||
                        "Your product description will appear here."}
                    </p>

                    <div className="mt-5 flex items-center justify-between border-t border-[#669BBC]/15 pt-4">

                      <div>
                        <p className="text-xs text-[#669BBC]">
                          Price
                        </p>

                        <p className="mt-1 font-bold text-[#780000]">
                          {formData.price
                            ? `${Number(
                                formData.price
                              ).toLocaleString()} IQD`
                            : "0 IQD"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#669BBC]">
                          Stock
                        </p>

                        <p className="mt-1 font-semibold text-[#003049]">
                          {formData.stock_quantity || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tips */}
              <div className="rounded-3xl bg-[#003049] p-7 text-[#FDF0D5] shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#780000] text-3xl">
                  ✨
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  Update Tips
                </h2>

                <div className="mt-5 space-y-4 text-sm leading-6 text-[#FDF0D5]/75">

                  <div className="flex gap-3">
                    <span className="text-[#669BBC]">
                      ✓
                    </span>

                    <p>
                      Keep your product information accurate.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#669BBC]">
                      ✓
                    </span>

                    <p>
                      Update stock whenever your inventory changes.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#669BBC]">
                      ✓
                    </span>

                    <p>
                      Use a clear image that represents your product.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <span className="text-[#669BBC]">
                      ✓
                    </span>

                    <p>
                      Make sure the price is correct before saving.
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="rounded-3xl bg-white p-7 shadow-md">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                  Navigation
                </p>

                <div className="mt-4 space-y-3">

                  <Link
                    to="/artisan/dashboard"
                    className="flex items-center justify-between rounded-xl bg-[#FDF0D5] px-4 py-3 font-semibold text-[#003049] transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span>Dashboard</span>
                    <span>→</span>
                  </Link>

                  <Link
                    to="/artisan/products"
                    className="flex items-center justify-between rounded-xl bg-[#FDF0D5] px-4 py-3 font-semibold text-[#003049] transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span>My Products</span>
                    <span>→</span>
                  </Link>

                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EditProduct;