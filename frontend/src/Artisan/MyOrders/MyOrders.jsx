import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./MyOrders.css";

const statusLabels = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

const statusSteps = [
  "pending",
  "processing",
  "shipped",
  "completed",
];

const formatPrice = (price) =>
  `${Number(price || 0).toLocaleString("en-US")} IQD`;

const formatDate = (date) => {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case "completed":
      return "status completed";

    case "cancelled":
      return "status cancelled";

    case "shipped":
      return "status shipped";

    case "processing":
      return "status processing";

    default:
      return "status pending";
  }
};

const getStatusStep = (status) => {
  const index = statusSteps.indexOf(status);

  return index === -1 ? 0 : index;
};

const normalizeArrayResponse = (response) => {
  if (Array.isArray(response)) {
    return response;
  }

  if (Array.isArray(response?.data?.data)) {
    return response.data.data;
  }

  if (Array.isArray(response?.data)) {
    return response.data;
  }

  if (Array.isArray(response?.data?.items)) {
    return response.data.items;
  }

  if (Array.isArray(response?.items)) {
    return response.items;
  }

  return [];
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        setError("");

        // --------------------------------
        // Get logged-in user
        // --------------------------------
        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          throw new Error("Please login first.");
        }

        let parsedUser;

        try {
          parsedUser = JSON.parse(storedUser);
        } catch {
          throw new Error("Invalid user data. Please login again.");
        }

        const user = parsedUser?.user || parsedUser;

        if (!user?.id) {
          throw new Error("Invalid user data. Please login again.");
        }

        if (user.role !== "artisan") {
          throw new Error("This page is for artisans only.");
        }

        // --------------------------------
        // Get all artisans
        // --------------------------------
        const artisansResponse = await api.artisans.getAll();

        const artisansData = normalizeArrayResponse(
          artisansResponse
        );

        console.log("Logged user:", user);
console.log(
  "FIRST ARTISAN FULL DATA:",
  JSON.stringify(artisansData[0], null, 2)
);
console.log(
  "ALL ARTISANS FULL DATA:",
  JSON.stringify(artisansData, null, 2)
);

        // --------------------------------
        // Find current artisan
        // --------------------------------
        const currentArtisan = artisansData.find((item) => {
          const itemUserId =
            item?.user_id ??
            item?.userId ??
            item?.user?.id ??
            item?.user?.user_id;

          return Number(itemUserId) === Number(user.id);
        });

        if (!currentArtisan) {
          console.error(
            "Could not find artisan profile for logged user.",
            {
              loggedUser: user,
              artisans: artisansData,
            }
          );

          throw new Error(
            "No artisan profile was found for this account."
          );
        }

        setArtisan(currentArtisan);

        // --------------------------------
        // Get artisan orders
        // --------------------------------
        const ordersResponse =
          await api.orders.getByArtisan(currentArtisan.id);

        const ordersData = normalizeArrayResponse(
          ordersResponse
        );

        setOrders(ordersData);
      } catch (err) {
        console.error("Artisan orders error:", err);

        setError(
          err?.response?.data?.message ||
            err?.message ||
            "Something went wrong while loading orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // --------------------------------
  // Statistics
  // --------------------------------
  const stats = useMemo(() => {
    const total = orders.length;

    const completed = orders.filter(
      (order) => order.status === "completed"
    ).length;

    const active = orders.filter(
      (order) =>
        !["completed", "cancelled"].includes(order.status)
    ).length;

    const cancelled = orders.filter(
      (order) => order.status === "cancelled"
    ).length;

    return {
      total,
      completed,
      active,
      cancelled,
    };
  }, [orders]);

  // --------------------------------
  // Loading
  // --------------------------------
  if (loading) {
    return (
      <div className="artisan-orders-page">
        <div className="artisan-orders-orb artisan-orders-orb-one" />
        <div className="artisan-orders-orb artisan-orders-orb-two" />

        <div className="orders-container">
          <div className="orders-loading">
            <div className="orders-loading-icon">◷</div>

            <div className="orders-loading-content">
              <div className="orders-skeleton orders-skeleton-title" />
              <div className="orders-skeleton orders-skeleton-text" />
              <div className="orders-skeleton orders-skeleton-card" />
              <div className="orders-skeleton orders-skeleton-card" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------
  // Error
  // --------------------------------
  if (error) {
    return (
      <div className="artisan-orders-page">
        <div className="artisan-orders-orb artisan-orders-orb-one" />
        <div className="artisan-orders-orb artisan-orders-orb-two" />

        <div className="orders-container">
          <div className="orders-error-card">
            <div className="orders-error-icon">!</div>

            <span className="orders-kicker">
              Artisan Workspace
            </span>

            <h1>Unable to Load Orders</h1>

            <p>{error}</p>

            <div className="orders-error-actions">
              <button
                type="button"
                className="orders-retry-button"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>

              <Link
                to="/artisan/dashboard"
                className="orders-back-button"
              >
                Back to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="artisan-orders-page" dir="ltr">
      {/* Decorative elements */}
      <div className="artisan-orders-orb artisan-orders-orb-one" />
      <div className="artisan-orders-orb artisan-orders-orb-two" />

      <div className="artisan-orders-symbol artisan-orders-symbol-one">
        𒀭
      </div>

      <div className="artisan-orders-symbol artisan-orders-symbol-two">
        ◇
      </div>

      <div className="orders-container">
        {/* ================================
            HEADER
        ================================= */}
        <header className="orders-header">
          <div className="orders-header-content">
            <span className="orders-kicker">
              Artisan Workspace
            </span>

            <h1>My Orders</h1>

            <p>
              Manage and track orders placed for your
              handcrafted products.
            </p>
          </div>

          <div className="orders-header-actions">
            <Link
              to="/artisan/dashboard"
              className="orders-dashboard-button"
            >
              <span>←</span>
              Dashboard
            </Link>
          </div>
        </header>

        <div className="orders-header-line" />

        {/* ================================
            ARTISAN INFO
        ================================= */}
        {artisan && (
          <section className="artisan-info-card">
            <div className="artisan-info-avatar">
              {artisan.profile_image ||
              artisan.image ||
              artisan.profileImage ? (
                <img
                  src={
                    artisan.profile_image ||
                    artisan.image ||
                    artisan.profileImage
                  }
                  alt={
                    artisan.name ||
                    artisan.full_name ||
                    "Artisan"
                  }
                />
              ) : (
                <span>
                  {(artisan.name ||
                    artisan.full_name ||
                    "A")
                    .charAt(0)
                    .toUpperCase()}
                </span>
              )}
            </div>

            <div className="artisan-info-content">
              <span>Welcome back</span>

              <h2>
                {artisan.name ||
                  artisan.full_name ||
                  artisan.username ||
                  "Artisan"}
              </h2>

              {artisan.craft_name && (
                <p>{artisan.craft_name}</p>
              )}
            </div>

            <div className="artisan-info-badge">
              <span className="artisan-info-dot" />
              Artisan Account
            </div>
          </section>
        )}

        {/* ================================
            STATS
        ================================= */}
        <section className="orders-stats-grid">
          <div className="order-stat-card order-stat-blue">
            <div className="stat-icon">
              <span>▣</span>
            </div>

            <div className="stat-content">
              <span>Total Orders</span>
              <strong>{stats.total}</strong>
            </div>
          </div>

          <div className="order-stat-card order-stat-gold">
            <div className="stat-icon">
              <span>◷</span>
            </div>

            <div className="stat-content">
              <span>Active Orders</span>
              <strong>{stats.active}</strong>
            </div>
          </div>

          <div className="order-stat-card order-stat-green">
            <div className="stat-icon">
              <span>✓</span>
            </div>

            <div className="stat-content">
              <span>Completed</span>
              <strong>{stats.completed}</strong>
            </div>
          </div>

          <div className="order-stat-card order-stat-red">
            <div className="stat-icon">
              <span>×</span>
            </div>

            <div className="stat-content">
              <span>Cancelled</span>
              <strong>{stats.cancelled}</strong>
            </div>
          </div>
        </section>

        {/* ================================
            ORDERS SECTION
        ================================= */}
        <section className="orders-section">
          <div className="orders-section-heading">
            <div>
              <span className="orders-section-kicker">
                Recent Activity
              </span>

              <h2>Order Management</h2>
            </div>

            <span className="orders-count-pill">
              {orders.length}{" "}
              {orders.length === 1 ? "Order" : "Orders"}
            </span>
          </div>

          {orders.length === 0 ? (
            <div className="orders-empty-card">
              <div className="orders-empty-icon">
                <span>◷</span>
              </div>

              <span className="orders-empty-kicker">
                No Orders Yet
              </span>

              <h3>Your orders will appear here</h3>

              <p>
                Once customers purchase your handmade
                products, their orders will be displayed
                in this workspace.
              </p>

              <Link
                to="/artisan/products"
                className="orders-empty-button"
              >
                Manage Products
                <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => {
                const status = order.status || "pending";

                const currentStep =
                  getStatusStep(status);

                const progress =
                  status === "cancelled"
                    ? 0
                    : ((currentStep + 1) /
                        statusSteps.length) *
                      100;

                return (
                  <article
                    key={
                      order.id ||
                      order.order_id ||
                      `order-${index}`
                    }
                    className="order-card"
                    style={{
                      "--order-index": index,
                    }}
                  >
                    {/* Order top */}
                    <div className="order-card-top">
                      <div className="order-card-number">
                        <span>ORDER</span>

                        <strong>
                          #
                          {order.id ||
                            order.order_id ||
                            "—"}
                        </strong>
                      </div>

                      <div
                        className={getStatusClass(status)}
                      >
                        <span className="status-dot" />

                        {statusLabels[status] ||
                          status}
                      </div>
                    </div>

                    {/* Order information */}
                    <div className="order-information">
                      <div className="order-meta">
                        <span className="meta-label">
                          Date
                        </span>

                        <strong>
                          {formatDate(
                            order.created_at ||
                              order.createdAt ||
                              order.date
                          )}
                        </strong>
                      </div>

                      <div className="order-meta">
                        <span className="meta-label">
                          Total
                        </span>

                        <strong className="order-total">
                          {formatPrice(
                            order.total_amount ??
                              order.total ??
                              0
                          )}
                        </strong>
                      </div>

                      {order.customer_name && (
                        <div className="order-meta">
                          <span className="meta-label">
                            Customer
                          </span>

                          <strong>
                            {order.customer_name}
                          </strong>
                        </div>
                      )}

                      {order.customer_email && (
                        <div className="order-meta">
                          <span className="meta-label">
                            Email
                          </span>

                          <strong>
                            {order.customer_email}
                          </strong>
                        </div>
                      )}
                    </div>

                    {/* Progress */}
                    {status !== "cancelled" && (
                      <div className="order-progress">
                        <div className="progress-labels">
                          {statusSteps.map((step) => (
                            <span
                              key={step}
                              className={
                                statusSteps.indexOf(
                                  step
                                ) <= currentStep
                                  ? "active"
                                  : ""
                              }
                            >
                              {statusLabels[step]}
                            </span>
                          ))}
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: `${progress}%`,
                            }}
                          />

                          {statusSteps.map(
                            (step, stepIndex) => (
                              <span
                                key={step}
                                className={`progress-dot ${
                                  stepIndex <=
                                  currentStep
                                    ? "active"
                                    : ""
                                }`}
                                style={{
                                  left: `${
                                    (stepIndex /
                                      (statusSteps.length -
                                        1)) *
                                    100
                                  }%`,
                                }}
                              />
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Cancelled */}
                    {status === "cancelled" && (
                      <div className="cancelled-message">
                        <span>×</span>

                        <p>
                          This order has been
                          cancelled.
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>

        {/* ================================
            FOOTER CTA
        ================================= */}
        <section className="orders-bottom-banner">
          <div className="orders-bottom-pattern">
            𒀭 ◇ ✦ 𒂗
          </div>

          <div className="orders-bottom-content">
            <span>AlHerfa Marketplace</span>

            <h3>
              Keep creating. Keep the heritage alive.
            </h3>

            <p>
              Your craftsmanship helps preserve the
              beauty of Iraqi handmade art.
            </p>
          </div>

          <Link
            to="/artisan/products"
            className="orders-products-button"
          >
            View My Products
            <span>→</span>
          </Link>
        </section>
      </div>
    </div>
  );
}