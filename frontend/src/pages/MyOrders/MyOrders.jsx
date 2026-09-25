import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );

        const data = Array.isArray(response.data)
          ? response.data
          : response.data?.data || [];

        setOrders(data);
      } catch (error) {
        console.error("Failed to load orders:", error);

        // إذا ماكو طلبات أو الـ backend ما رجع بيانات
        // نخلي الصفحة فارغة بدل رسالة خطأ
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";

      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";

      case "confirmed":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";

      case "pending":
        return "bg-gray-100 text-gray-700 border-gray-200";

      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";

      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

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
        return status;
    }
  };

  const getProgressWidth = (status) => {
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
      <div className="min-h-screen bg-[#FDF0D5] px-6 py-10">
        <div className="mx-auto max-w-6xl">

          <div className="h-10 w-64 animate-pulse rounded-lg bg-gray-200" />

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-3xl bg-white shadow-lg"
              />
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-3xl bg-white shadow-lg"
              />
            ))}
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF0D5] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#669BBC]">
              Customer Workspace
            </p>

            <h1 className="mt-2 text-4xl font-bold text-[#003049]">
              My Orders
            </h1>

            <p className="mt-2 text-gray-600">
              Track and manage all your orders in one place.
            </p>
          </div>

          <Link
            to="/artisans"
            className="inline-flex w-fit items-center rounded-xl bg-[#003049] px-6 py-3 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:bg-[#00263b]"
          >
            ← Continue Shopping
          </Link>

        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>

            <p className="mt-2 text-4xl font-bold text-[#003049]">
              {orders.length}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Completed
            </p>

            <p className="mt-2 text-4xl font-bold text-green-600">
              {completedOrders}
            </p>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <p className="text-sm font-medium text-gray-500">
              Active Orders
            </p>

            <p className="mt-2 text-4xl font-bold text-[#669BBC]">
              {activeOrders}
            </p>
          </div>

        </div>

        {/* Orders */}
        <div className="mt-8 space-y-6">

          {orders.length === 0 ? (

            /* Empty Orders */
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">

              {/* Lottie Empty Box */}
              <div className="mx-auto h-32 w-32">
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

              <h2 className="mt-5 text-2xl font-bold text-[#003049]">
                No orders yet
              </h2>

              <p className="mt-2 text-gray-600">
                Start shopping from our talented artisans.
              </p>

              <Link
                to="/artisans"
                className="mt-6 inline-block rounded-xl bg-[#003049] px-6 py-3 font-semibold text-white transition hover:-translate-y-1"
              >
                Explore Artisans
              </Link>

            </div>

          ) : (

            /* Orders List */
            orders.map((order) => (

              <div
                key={order.id}
                className="rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1"
              >

                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 pb-5 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm text-gray-500">
                      Order
                    </p>

                    <h2 className="text-2xl font-bold text-[#003049]">
                      #{order.id}
                    </h2>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-4 py-2 text-sm font-bold ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>

                </div>

                {/* Order Info */}
                <div className="grid gap-5 py-6 sm:grid-cols-2">

                  <div>
                    <p className="text-sm text-gray-500">
                      Total Amount
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#780000]">
                      {Number(order.total_amount).toLocaleString()} IQD
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">
                      Created At
                    </p>

                    <p className="mt-1 font-semibold text-[#003049]">
                      {new Date(
                        order.created_at
                      ).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        order.created_at
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                </div>

                {/* Progress */}
                {order.status !== "cancelled" && (
                  <div className="pt-2">

                    <div className="mb-3 flex justify-between text-xs font-semibold text-gray-500">
                      <span>Pending</span>
                      <span>Confirmed</span>
                      <span>Shipped</span>
                      <span>Completed</span>
                    </div>

                    <div className="relative h-2 rounded-full bg-gray-200">

                      <div
                        className="absolute left-0 top-0 h-2 rounded-full bg-[#669BBC] transition-all duration-500"
                        style={{
                          width: getProgressWidth(order.status),
                        }}
                      />

                    </div>

                  </div>
                )}

                {/* Cancelled */}
                {order.status === "cancelled" && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                    This order has been cancelled.
                  </div>
                )}

              </div>

            ))
          )}

        </div>

      </div>
    </div>
  );
}

export default MyOrders;