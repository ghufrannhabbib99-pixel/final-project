import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import productImages from "../../data/productImages";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart"));

      if (Array.isArray(savedCart)) {
        return savedCart;
      }

      if (savedCart) {
        return [savedCart];
      }

      return [];
    } catch {
      return [];
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * Number(item.quantity),
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity),
    0
  );

  const createOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login before placing your order.");
        setLoading(false);
        return;
      }

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          total_amount: total,
          status: "pending",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.removeItem("cart");

      alert("Order placed successfully!");

      navigate("/my-orders");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        setError("Your session has expired. Please login again.");
      } else {
        setError(
          error.response?.data?.message ||
            "Failed to place the order. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDF0D5] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-bold tracking-[0.3em] text-[#780000]">
            ALHERFA
          </p>

          <h1 className="text-4xl font-bold text-[#003049] sm:text-5xl">
            Checkout
          </h1>

          <p className="mt-3 text-[#669BBC]">
            Review your order before placing it.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-red-300 bg-red-100 px-5 py-4 text-center font-medium text-red-700">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="mx-auto max-w-xl rounded-3xl bg-white/70 p-10 text-center shadow-xl">
            <div className="mb-5 text-6xl">🛒</div>

            <h2 className="text-2xl font-bold text-[#003049]">
              Your cart is empty
            </h2>

            <p className="mt-3 text-[#669BBC]">
              Add some handmade products before checking out.
            </p>

            <button
              type="button"
              onClick={() => navigate("/artisans")}
              className="mt-7 rounded-xl bg-[#780000] px-7 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
            {/* Order Items */}
            <section className="space-y-5">
              <div className="rounded-3xl bg-white/70 p-6 shadow-md">
                <h2 className="text-2xl font-bold text-[#003049]">
                  Order Details
                </h2>

                <p className="mt-1 text-[#669BBC]">
                  {totalItems} item{totalItems !== 1 ? "s" : ""}
                </p>
              </div>

              {cartItems.map((item) => {
                const productImage =
                  item.image || productImages[item.name] || null;

                return (
                  <article
                    key={item.id}
                    className="flex flex-col gap-5 rounded-2xl bg-white/70 p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:flex-row sm:items-center"
                  >
                    {/* Product Image */}
                    <div className="h-28 w-full shrink-0 overflow-hidden rounded-xl bg-[#669BBC] sm:w-28">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span className="text-lg font-bold text-[#FDF0D5]">
                            Alherfa
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[#003049]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-[#669BBC]">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-2 font-semibold text-[#780000]">
                        {Number(item.price).toLocaleString()} IQD each
                      </p>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right">
                      <p className="text-sm text-[#669BBC]">
                        Subtotal
                      </p>

                      <p className="mt-1 text-lg font-bold text-[#003049]">
                        {(
                          Number(item.price) * Number(item.quantity)
                        ).toLocaleString()}{" "}
                        IQD
                      </p>
                    </div>
                  </article>
                );
              })}
            </section>

            {/* Summary */}
            <aside className="h-fit rounded-3xl bg-[#003049] p-7 text-[#FDF0D5] shadow-xl lg:sticky lg:top-6">
              <h2 className="text-2xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 flex justify-between text-[#669BBC]">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>

              <div className="my-5 h-px bg-[#FDF0D5]/20" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span>
                  {total.toLocaleString()} IQD
                </span>
              </div>

              <button
                type="button"
                onClick={createOrder}
                disabled={loading}
                className="mt-7 w-full rounded-xl bg-[#780000] px-5 py-3 font-bold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>

              <button
                type="button"
                onClick={() => navigate("/cart")}
                disabled={loading}
                className="mt-3 w-full rounded-xl border border-[#669BBC] px-5 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:bg-[#669BBC] hover:text-[#003049]"
              >
                Back to Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}

export default Checkout;