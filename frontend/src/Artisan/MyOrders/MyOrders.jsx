import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DEMO_MODE = true;

const demoOrders = [
  {
    id: 1001,
    status: "completed",
    total: 85000,
    createdAt: "2026-09-20T10:30:00",
  },
  {
    id: 1002,
    status: "shipped",
    total: 45000,
    createdAt: "2026-09-21T14:15:00",
  },
  {
    id: 1003,
    status: "confirmed",
    total: 120000,
    createdAt: "2026-09-22T09:45:00",
  },
  {
    id: 1004,
    status: "pending",
    total: 30000,
    createdAt: "2026-09-23T16:20:00",
  },
  {
    id: 1005,
    status: "cancelled",
    total: 60000,
    createdAt: "2026-09-24T11:10:00",
  },
];

function MyOrders() {
  const [orders, setOrders] = useState(() => (DEMO_MODE ? demoOrders : []));
  const [loading, setLoading] = useState(!DEMO_MODE);
  const [error, setError] = useState("");

  const userId = 1;

  useEffect(() => {
    if (DEMO_MODE) {
      return;
    }

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");

        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`,
          {
            headers: token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {},
          }
        );

        const ordersData =
          response.data?.data ||
          response.data?.orders ||
          response.data ||
          [];

        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load your orders. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed";

      case "shipped":
        return "Shipped";

      case "confirmed":
        return "Confirmed";

      case "pending":
        return "Pending";

      case "cancelled":
        return "Cancelled";

      default:
        return status || "Unknown";
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "confirmed":
        return "bg-yellow-100 text-yellow-700";

      case "pending":
        return "bg-orange-100 text-orange-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getProgress = (status) => {
    switch (status) {
      case "pending":
        return 25;

      case "confirmed":
        return 50;

      case "shipped":
        return 75;

      case "completed":
        return 100;

      case "cancelled":
        return 100;

      default:
        return 0;
    }
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "completed" && order.status !== "cancelled"
  ).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDF0D5]">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-10">
            <div className="h-10 w-56 animate-pulse rounded-xl bg-white/70" />
            <div className="mt-3 h-5 w-80 animate-pulse rounded-lg bg-white/60" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-3xl bg-white shadow-lg"
              />
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-48 animate-pulse rounded-3xl bg-white shadow-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0D5]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <Link
            to="/artisans"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[#003049] transition hover:text-[#C1121F]"
          >
            ← Continue Shopping
          </Link>

          <h1 className="text-4xl font-black text-[#003049] sm:text-5xl">
            My Orders
          </h1>

          <p className="mt-3 text-gray-600">
            Track and manage all your orders in one place.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total Orders */}
          <div className="rounded-3xl bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Orders
                </p>

                <p className="mt-2 text-4xl font-black text-[#003049]">
                  {totalOrders}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF0D5] text-2xl">
                📦
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="rounded-3xl bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Completed
                </p>

                <p className="mt-2 text-4xl font-black text-green-600">
                  {completedOrders}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-2xl">
                ✓
              </div>
            </div>
          </div>

          {/* Active */}
          <div className="rounded-3xl bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Active Orders
                </p>

                <p className="mt-2 text-4xl font-black text-[#C1121F]">
                  {activeOrders}
                </p>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-2xl">
                🚚
              </div>
            </div>
          </div>
        </div>

        {/* Orders */}
        <div className="mt-10">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#003049]">
              Your Orders
            </h2>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#003049] shadow">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            /* Empty Orders */
            <div className="rounded-3xl bg-white p-10 text-center shadow-xl sm:p-12">
              {/* Lottie Empty Box */}
              <div className="mx-auto h-40 w-40">
                <DotLottieReact
                  src="/animations/empty-box.lottie"
                  loop
                  autoplay
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                />
              </div>

              <h2 className="mt-4 text-2xl font-black text-[#003049]">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-600">
                Start shopping from our talented artisans.
              </p>

              <Link
                to="/artisans"
                className="mt-6 inline-flex rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#00263a]"
              >
                Explore Artisans
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const progress = getProgress(order.status);

                return (
                  <article
                    key={order.id}
                    className="rounded-3xl bg-white p-6 shadow-xl transition duration-300 hover:-translate-y-1"
                  >
                    {/* Top */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-500">
                          Order #{order.id}
                        </p>

                        <h3 className="mt-1 text-xl font-black text-[#003049]">
                          {Number(order.total || 0).toLocaleString()} IQD
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          {formatDate(
                            order.createdAt ||
                              order.created_at ||
                              order.date
                          )}
                        </p>
                      </div>

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-sm font-bold ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    {/* Progress */}
                    {order.status !== "cancelled" && (
                      <div className="mt-7">
                        <div className="mb-2 flex items-center justify-between text-xs font-semibold text-gray-500">
                          <span>Order Progress</span>

                          <span>{progress}%</span>
                        </div>

                        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-[#003049] transition-all duration-700"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>

                        <div className="mt-2 flex justify-between text-xs text-gray-400">
                          <span>Pending</span>
                          <span>Confirmed</span>
                          <span>Shipped</span>
                          <span>Completed</span>
                        </div>
                      </div>
                    )}

                    {/* Cancelled */}
                    {order.status === "cancelled" && (
                      <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
                        This order has been cancelled.
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyOrders;