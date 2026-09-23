import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const artisanId = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/artisan/${artisanId}`
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-4 w-40 rounded bg-[#780000]/20" />
            <div className="mt-4 h-12 w-72 rounded bg-[#003049]/15" />
            <div className="mt-3 h-5 w-96 max-w-full rounded bg-[#669BBC]/15" />
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[460px] animate-pulse rounded-3xl bg-white/70 shadow-md"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
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
            to="/artisan/dashboard"
            className="mt-6 inline-block rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5]">
      {/* Header */}
      <section className="relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
                Artisan Workspace
              </p>

              <h1 className="mt-3 text-4xl font-bold text-[#003049] sm:text-5xl">
                My Products
              </h1>

              <p className="mt-3 max-w-2xl text-lg leading-8 text-[#669BBC]">
                Manage your handmade products, update their details, and
                control your available stock.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/artisan/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-[#003049]/15 bg-white px-5 py-3 font-semibold text-[#003049] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <span>←</span>
                Dashboard
              </Link>

              <button
                type="button"
                onClick={() => navigate("/artisan/products/add")}
                className="inline-flex items-center gap-2 rounded-xl bg-[#780000] px-5 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
              >
                <span className="text-xl">+</span>
                Add Product
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF0D5] text-2xl">
                  🧺
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                    Total Products
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#003049]">
                    {products.length}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF0D5] text-2xl">
                  ✓
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                    In Stock
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#003049]">
                    {
                      products.filter(
                        (product) =>
                          Number(product.stock_quantity) > 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FDF0D5] text-2xl">
                  !
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-[#669BBC]">
                    Out of Stock
                  </p>

                  <p className="mt-1 text-2xl font-bold text-[#780000]">
                    {
                      products.filter(
                        (product) =>
                          Number(product.stock_quantity) <= 0
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {products.length === 0 ? (
            <div className="rounded-3xl bg-white px-6 py-20 text-center shadow-md">
              <div className="mb-5 text-7xl">🧺</div>

              <h2 className="text-3xl font-bold text-[#003049]">
                No products yet
              </h2>

              <p className="mx-auto mt-3 max-w-md leading-7 text-[#669BBC]">
                Start building your collection by adding your first handmade
                product.
              </p>

              <button
                type="button"
                onClick={() => navigate("/artisan/products/add")}
                className="mt-7 rounded-xl bg-[#780000] px-7 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
              >
                Add Your First Product
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => {
                const stock = Number(product.stock_quantity) || 0;
                const isOutOfStock = stock <= 0;

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  >
                    {/* Image */}
                    <div className="relative h-60 overflow-hidden bg-gradient-to-br from-[#FDF0D5] to-[#669BBC]/20">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name || "Product"}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#669BBC]/20 to-[#FDF0D5]">
                          <div className="text-center">
                            <div className="text-6xl">🧶</div>

                            <p className="mt-3 text-sm font-semibold text-[#669BBC]">
                              Handmade Product
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Stock Badge */}
                      <div
                        className={`absolute right-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold shadow-md ${
                          isOutOfStock
                            ? "bg-[#003049] text-white"
                            : "bg-white/90 text-[#780000] backdrop-blur-sm"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : `${stock} in stock`}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                        Handmade
                      </p>

                      <h2 className="mt-2 line-clamp-2 min-h-[56px] text-xl font-bold text-[#003049]">
                        {product.name}
                      </h2>

                      <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-[#669BBC]">
                        {product.description ||
                          "No description available for this product."}
                      </p>

                      {/* Price & Stock */}
                      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-[#669BBC]/15 pt-4">
                        <div>
                          <p className="text-xs text-[#669BBC]">
                            Price
                          </p>

                          <p className="mt-1 font-bold text-[#780000]">
                            {Number(product.price).toLocaleString()} IQD
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-[#669BBC]">
                            Stock
                          </p>

                          <p className="mt-1 font-bold text-[#003049]">
                            {stock}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-5 grid grid-cols-2 gap-3">
                        <Link
                          to={`/artisan/products/edit/${product.id}`}
                          className="rounded-xl border border-[#003049]/15 bg-white px-4 py-3 text-center text-sm font-semibold text-[#003049] transition-all duration-300 hover:-translate-y-1 hover:border-[#003049] hover:shadow-md"
                        >
                          Edit
                        </Link>

                        <button
                          type="button"
                          onClick={() => deleteProduct(product.id)}
                          className="rounded-xl bg-[#780000] px-4 py-3 text-sm font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      {products.length > 0 && (
        <section className="px-4 pb-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl bg-[#003049] p-7 shadow-xl sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#669BBC]">
                  Keep Creating
                </p>

                <h2 className="mt-2 text-2xl font-bold text-[#FDF0D5] sm:text-3xl">
                  Add another handmade creation
                </h2>

                <p className="mt-2 max-w-2xl leading-7 text-[#FDF0D5]/70">
                  Share more of your craftsmanship with customers through
                  Alherfa.
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/artisan/products/add")}
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
              >
                <span className="text-xl">+</span>
                Add Product
              </button>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default MyProducts;