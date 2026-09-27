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

const formatPrice = (price) => {
  return `${Number(price || 0).toLocaleString("en-US")} IQD`;
};

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

        const storedUser = localStorage.getItem("user");

        if (!storedUser) {
          throw new Error("Please login first.");
        }

        const parsedUser = JSON.parse(storedUser);
        const user = parsedUser?.user || parsedUser;

        if (!user?.id) {
          throw new Error("Invalid user data.");
        }

        if (user.role !== "artisan") {
          throw new Error("This page is for artisans only.");
        }

        const artisansResponse = await api.artisans.getAll();

        const artisansData =
          artisansResponse?.data ||
          artisansResponse ||
          [];

        const currentArtisan = artisansData.find(
          (item) =>
            Number(item.user_id) === Number(user.id)
        );

        if (!currentArtisan) {
          throw new Error(
            "No artisan profile was found for this account."
          );
        }

        setArtisan(currentArtisan);

        const ordersResponse =
          await api.orders.getByArtisan(
            currentArtisan.id
          );

        const ordersData =
          ordersResponse?.data ||
          ordersResponse ||
          [];

        setOrders(
          Array.isArray(ordersData)
            ? ordersData
            : []
        );
      } catch (err) {
        console.error(err);

        setError(
          err.message ||
            "Something went wrong while loading orders."
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const stats = useMemo(() => {
    const total = orders.length;

    const completed = orders.filter(
      (order) => order.status === "completed"
    ).length;

    const active = orders.filter(
      (order) =>
        !["completed", "cancelled"].includes(
          order.status
        )
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

  if (loading) {
    return (
      <div className="artisan-orders-page">
        <div className="artisan-orders-loading">
          <div className="loading-spinner" />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="artisan-orders-page">
        <div className="artisan-orders-error">
          <h2>Unable to Load Orders</h2>

          <p>{error}</p>

          <Link to="/artisan/dashboard">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="artisan-orders-page"
      dir="ltr"
    >
      <div className="orders-container">

        {/* Header */}

        <div className="orders-header">

          <div className="orders-heading">

            <span className="orders-eyebrow">
              ARTISAN WORKSPACE
            </span>

            <h1>My Orders</h1>

            <p>
              Track and manage orders containing
              your products.
            </p>

            {artisan?.craft_name && (
              <span className="artisan-name">
                {artisan.craft_name}
              </span>
            )}

          </div>

          <Link
            to="/artisan/dashboard"
            className="back-dashboard"
          >
            Back to Dashboard
          </Link>

        </div>

        {/* Stats */}

        <div className="orders-stats">

          <div className="stat-card">
            <span className="stat-label">
              Total Orders
            </span>

            <strong>
              {stats.total}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">
              Active Orders
            </span>

            <strong>
              {stats.active}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">
              Completed
            </span>

            <strong>
              {stats.completed}
            </strong>
          </div>

          <div className="stat-card">
            <span className="stat-label">
              Cancelled
            </span>

            <strong>
              {stats.cancelled}
            </strong>
          </div>

        </div>

        {/* Orders */}

        <div className="orders-section-header">

          <div>
            <span>
              YOUR ORDERS
            </span>

            <h2>
              Recent Orders
            </h2>
          </div>

          <div className="orders-count">
            {orders.length} Orders
          </div>

        </div>

        {orders.length === 0 ? (

          <div className="orders-empty">

            <div className="empty-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              When someone purchases one of
              your products, the order will
              appear here.
            </p>

            <Link to="/artisan/products">
              View My Products
            </Link>

          </div>

        ) : (

          <div className="orders-list">

            {orders.map((order) => {

              const currentStep =
                getStatusStep(order.status);

              return (

                <article
                  className="order-card"
                  key={order.id}
                >

                  {/* Order Header */}

                  <div className="order-top">

                    <div>

                      <span className="order-number">
                        Order #{order.id}
                      </span>

                      <span className="order-date">
                        {formatDate(
                          order.created_at
                        )}
                      </span>

                    </div>

                    <span
                      className={getStatusClass(
                        order.status
                      )}
                    >
                      {statusLabels[
                        order.status
                      ] || order.status}
                    </span>

                  </div>

                  {/* Customer */}

                  <div className="customer-box">

                    <div className="customer-info">

                      <span>
                        CUSTOMER
                      </span>

                      <strong>
                        {order.customer_name ||
                          "Unknown Customer"}
                      </strong>

                    </div>

                    {order.customer_email && (

                      <div className="customer-info">

                        <span>
                          EMAIL
                        </span>

                        <strong>
                          {order.customer_email}
                        </strong>

                      </div>

                    )}

                  </div>

                  {/* Products */}

                  <div className="order-items">

                    <h3>
                      Order Items
                    </h3>

                    {Array.isArray(order.items) &&
                      order.items.map((item) => (

                        <div
                          className="order-item"
                          key={item.id}
                        >

                          <div className="item-info">

                            <strong>
                              {item.product_name}
                            </strong>

                            <span>
                              Quantity:{" "}
                              {item.quantity}
                            </span>

                          </div>

                          <strong className="item-price">
                            {formatPrice(
                              Number(item.price) *
                                Number(item.quantity)
                            )}
                          </strong>

                        </div>

                      ))}

                  </div>

                  {/* Progress */}

                  {order.status !==
                    "cancelled" && (

                    <div className="order-progress">

                      {statusSteps.map(
                        (step, index) => (

                          <div
                            key={step}
                            className={
                              index <=
                              currentStep
                                ? "progress-step active"
                                : "progress-step"
                            }
                          >

                            <div className="step-dot">
                              {index + 1}
                            </div>

                            <span>
                              {statusLabels[step]}
                            </span>

                          </div>

                        )
                      )}

                    </div>

                  )}

                  {/* Bottom */}

                  <div className="order-bottom">

                    <div>

                      <span>
                        TOTAL AMOUNT
                      </span>

                      <strong>
                        {formatPrice(
                          order.total_amount
                        )}
                      </strong>

                    </div>

                    <span className="order-id">
                      Order ID: #{order.id}
                    </span>

                  </div>

                </article>

              );
            })}

          </div>

        )}

      </div>
    </div>
  );
}