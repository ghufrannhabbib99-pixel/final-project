import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1;

  // =========================
  // Fetch Orders
  // =========================
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );

        setOrders(response.data);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
            "Failed to load orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // =========================
  // Update Order Status
  // =========================
  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          status,
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);

      alert("Failed to update order status");
    }
  };

  // =========================
  // Status Style
  // =========================
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-blue-100 text-[#003049] border-blue-200";

      case "shipped":
        return "bg-[#669BBC]/15 text-[#003049] border-[#669BBC]/30";

      case "completed":
        return "bg-green-100 text-green-700 border-green-200";

      case "cancelled":
        return "bg-red-100 text-[#780000] border-red-200";

      case "pending":
      default:
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
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

          <div className="grid gap-6">
            <div className="h-56 animate-pulse rounded-3xl bg-white shadow-xl" />

            <div className="h-56 animate-pulse rounded-3xl bg-white shadow-xl" />

            <div className="h-56 animate-pulse rounded-3xl bg-white shadow-xl" />
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
                My Orders
              </h1>

              <p className="mt-3 max-w-2xl text-base leading-7 text-[#669BBC] sm:text-lg">
                Manage customer orders and keep track of their
                progress from confirmation to completion.
              </p>
            </div>

            <Link
              to="/artisan/dashboard"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#003049]/15 bg-white px-5 py-3 font-semibold text-[#003049] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-lg">←</span>
              Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT
      ========================= */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">

        <div className="mx-auto max-w-6xl">

          <div className="grid gap-8 lg:grid-cols-3">

            {/* =========================
                ORDERS
            ========================= */}
            <div className="lg:col-span-2">

              {/* Error */}
              {error && (
                <div className="mb-6 rounded-2xl border border-[#780000]/20 bg-[#780000]/5 p-5">
                  <div className="flex items-start gap-3">

                    <span className="text-xl">
                      ⚠️
                    </span>

                    <div>
                      <p className="font-semibold text-[#780000]">
                        Unable to load orders
                      </p>

                      <p className="mt-1 text-sm text-[#780000]/80">
                        {error}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Header */}
              <div className="mb-6 flex items-center justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#780000]">
                    Orders
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-[#003049]">
                    Customer Orders
                  </h2>
                </div>

                <div className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-[#003049] shadow-sm">
                  {orders.length}{" "}
                  {orders.length === 1
                    ? "Order"
                    : "Orders"}
                </div>
              </div>

              {/* Empty */}
              {orders.length === 0 ? (
                <div className="rounded-3xl bg-white px-6 py-16 text-center shadow-xl">

                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#FDF0D5] text-4xl">
                    📦
                  </div>

                  <h2 className="mt-6 text-2xl font-bold text-[#003049]">
                    No Orders Found
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#669BBC]">
                    You don't have any customer orders yet.
                    Orders will appear here when customers
                    purchase your products.
                  </p>

                  <Link
                    to="/artisan/products"
                    className="mt-6 inline-flex rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
                  >
                    View My Products
                  </Link>
                </div>
              ) : (
                <div className="space-y-5">

                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      {/* Order Header */}
                      <div className="border-b border-[#669BBC]/15 px-6 py-5 sm:px-7">

                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                          <div>
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                              Order
                            </p>

                            <h3 className="mt-1 text-2xl font-bold text-[#003049]">
                              #{order.id}
                            </h3>
                          </div>

                          <span
                            className={`w-fit rounded-full border px-4 py-2 text-xs font-bold capitalize ${getStatusStyle(
                              order.status
                            )}`}
                          >
                            {order.status || "pending"}
                          </span>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="px-6 py-6 sm:px-7">

                        <div className="grid gap-5 sm:grid-cols-2">

                          {/* Total */}
                          <div className="rounded-2xl bg-[#FDF0D5]/60 p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#669BBC]">
                              Total Amount
                            </p>

                            <p className="mt-2 text-2xl font-extrabold text-[#780000]">
                              {Number(
                                order.total_amount || 0
                              ).toLocaleString()}{" "}
                              <span className="text-sm font-bold">
                                IQD
                              </span>
                            </p>
                          </div>

                          {/* Date */}
                          <div className="rounded-2xl bg-[#FDF0D5]/60 p-5">
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#669BBC]">
                              Created At
                            </p>

                            <p className="mt-2 font-semibold text-[#003049]">
                              {new Date(
                                order.created_at
                              ).toLocaleDateString()}
                            </p>

                            <p className="mt-1 text-sm text-[#669BBC]">
                              {new Date(
                                order.created_at
                              ).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>

                        {/* Status Controls */}
                        <div className="mt-6">

                          <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-[#669BBC]">
                            Update Order Status
                          </p>

                          <div className="flex flex-wrap gap-3">

                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  "confirmed"
                                )
                              }
                              disabled={
                                order.status ===
                                "confirmed"
                              }
                              className="rounded-xl bg-[#003049] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#669BBC] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Confirm
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  "shipped"
                                )
                              }
                              disabled={
                                order.status ===
                                "shipped"
                              }
                              className="rounded-xl bg-[#669BBC] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#003049] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Shipped
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  "completed"
                                )
                              }
                              disabled={
                                order.status ===
                                "completed"
                              }
                              className="rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Completed
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                updateOrderStatus(
                                  order.id,
                                  "cancelled"
                                )
                              }
                              disabled={
                                order.status ===
                                "cancelled"
                              }
                              className="rounded-xl bg-[#780000] px-4 py-2.5 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#C1121F] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* =========================
                SIDEBAR
            ========================= */}
            <aside className="space-y-6">

              {/* Quick Navigation */}
              <div className="rounded-3xl bg-white p-7 shadow-xl">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
                  Navigation
                </p>

                <h3 className="mt-2 text-xl font-bold text-[#003049]">
                  Artisan Workspace
                </h3>

                <div className="mt-5 space-y-3">

                  <Link
                    to="/artisan/dashboard"
                    className="flex items-center justify-between rounded-xl bg-[#FDF0D5] px-4 py-3 font-semibold text-[#003049] transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span>Dashboard</span>
                    <span>→</span>
                  </Link>

                  <Link
                    to="/artisan/profile"
                    className="flex items-center justify-between rounded-xl bg-[#FDF0D5] px-4 py-3 font-semibold text-[#003049] transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <span>My Profile</span>
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

              {/* Order Status Guide */}
              <div className="rounded-3xl bg-[#003049] p-7 text-[#FDF0D5] shadow-xl">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#780000] text-3xl">
                  📦
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  Order Status
                </h2>

                <div className="mt-5 space-y-4 text-sm">

                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-yellow-400" />
                    <span className="text-[#FDF0D5]/80">
                      Pending
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-blue-400" />
                    <span className="text-[#FDF0D5]/80">
                      Confirmed
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#669BBC]" />
                    <span className="text-[#FDF0D5]/80">
                      Shipped
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="text-[#FDF0D5]/80">
                      Completed
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full bg-[#C1121F]" />
                    <span className="text-[#FDF0D5]/80">
                      Cancelled
                    </span>
                  </div>
                </div>
              </div>

              {/* Tip */}
              <div className="rounded-3xl bg-white p-7 shadow-md">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0D5] text-2xl">
                  💡
                </div>

                <h3 className="mt-5 text-xl font-bold text-[#003049]">
                  Helpful Tip
                </h3>

                <p className="mt-3 text-sm leading-6 text-[#669BBC]">
                  Keep your order status updated so customers
                  always know what is happening with their
                  purchases.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

export default MyOrders;