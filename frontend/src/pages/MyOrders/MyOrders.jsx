import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const userData = JSON.parse(
          localStorage.getItem("user") || "null"
        );

        if (!userData?.id) {
          setError("Please login to view your orders.");
          return;
        }

        const response = await api.orders.getByUser(userData.id);

        console.log("MY ORDERS:", response);

        setOrders(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setError(err.message || "Failed to load your orders.");
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
      case "confirmed":
        return "33%";
      case "shipped":
        return "66%";
      case "completed":
        return "100%";
      default:
        return "0%";
    }
  };

  const completedOrders = orders.filter(
    (order) => order.status === "completed"
  ).length;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "completed" &&
      order.status !== "cancelled"
  ).length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-3xl bg-white shadow"
              />
            ))}
          </div>

          <div className="mt-8 space-y-5">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-56 animate-pulse rounded-3xl bg-white shadow"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-6 py-12">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <h1 className="text-3xl font-black text-[#780000]">
            Something went wrong
          </h1>

          <p className="mt-4 text-gray-600">
            {error}
          </p>

          <Link
            to="/products"
            className="mt-7 inline-flex rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:-translate-y-1"
          >
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-[#669BBC]">
              Customer Workspace
            </p>

            <h1 className="mt-2 text-4xl font-black text-[#003049]">
              My Orders
            </h1>

            <p className="mt-2 text-gray-600">
              Track and manage all your orders in one place.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex w-fit rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#780000]"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-4xl font-black text-[#003049]">
              {orders.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-4xl font-black text-green-600">
              {completedOrders}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Active Orders
            </p>

            <p className="mt-2 text-4xl font-black text-[#C1121F]">
              {activeOrders}
            </p>
          </div>

        </div>

        {/* Orders */}
        <section className="mt-10">

          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-2xl font-black text-[#003049]">
              Your Orders
            </h2>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-[#003049] shadow">
              {orders.length} Orders
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="text-6xl">
                🛍️
              </div>

              <h2 className="mt-5 text-2xl font-black text-[#003049]">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-600">
                Start shopping from our talented artisans.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex rounded-xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:-translate-y-1"
              >
                Explore Products
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

                    {/* Order top */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                      <div>
                        <p className="text-sm font-semibold text-gray-500">
                          Order #{order.id}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {order.created_at
                            ? new Date(
                                order.created_at
                              ).toLocaleDateString()
                            : "Date unavailable"}
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

                    {/* Order info */}
                    <div className="mt-6 grid gap-4 border-y border-gray-100 py-5 sm:grid-cols-2">

                      <div>
                        <p className="text-sm text-gray-500">
                          Total Amount
                        </p>

                        <p className="mt-1 text-2xl font-black text-[#780000]">
                          {Number(
                            order.total_amount || 0
                          ).toLocaleString()}{" "}
                          IQD
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500">
                          Order Status
                        </p>

                        <p className="mt-1 font-bold text-[#003049]">
                          {getStatusText(order.status)}
                        </p>
                      </div>

                    </div>

                    {/* Progress */}
                    {order.status !== "cancelled" && (
                      <div className="mt-5">

                        <div className="flex justify-between text-xs font-semibold text-gray-500">
                          <span>Pending</span>
                          <span>Confirmed</span>
                          <span>Shipped</span>
                          <span>Completed</span>
                        </div>

                        <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                          <div
                            className="h-full rounded-full bg-[#780000] transition-all duration-700"
                            style={{
                              width: progress,
                            }}
                          />
                        </div>

                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="mt-5 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                        This order has been cancelled.
                      </div>
                    )}

                  </article>
                );
              })}

            </div>
          )}

        </section>
      </div>
    </main>
  );
}

export default MyOrders;