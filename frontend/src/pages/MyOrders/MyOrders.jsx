import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import "./MyOrders.css";

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
        return "status-completed";
      case "shipped":
        return "status-shipped";
      case "confirmed":
        return "status-confirmed";
      case "pending":
        return "status-pending";
      case "cancelled":
        return "status-cancelled";
      default:
        return "status-default";
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
      <main className="orders-page orders-loading-page">
        <div className="orders-orb orders-orb-one" />
        <div className="orders-orb orders-orb-two" />

        <div className="orders-container">
          <div className="orders-loading-header">
            <div className="orders-skeleton orders-skeleton-small" />
            <div className="orders-skeleton orders-skeleton-title" />
            <div className="orders-skeleton orders-skeleton-text" />
          </div>

          <div className="orders-stats-grid">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="orders-skeleton orders-skeleton-stat"
              />
            ))}
          </div>

          <div className="orders-loading-list">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="orders-skeleton orders-skeleton-order"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="orders-page">
        <div className="orders-orb orders-orb-one" />
        <div className="orders-orb orders-orb-two" />

        <div className="orders-container">
          <section className="orders-error-card">
            <div className="orders-error-icon">!</div>

            <span className="orders-kicker">
              ALHERFA COLLECTION
            </span>

            <h1>Something went wrong</h1>

            <p>{error}</p>

            <Link
              to="/products"
              className="orders-primary-button"
            >
              Continue Shopping
              <span>→</span>
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <div className="orders-orb orders-orb-one" />
      <div className="orders-orb orders-orb-two" />
      <div className="orders-cuneiform">𒀭</div>

      <div className="orders-container">
        {/* Header */}
        <header className="orders-header">
          <div className="orders-header-content">
            <span className="orders-kicker">
              ALHERFA COLLECTION
            </span>

            <h1>
              My
              <span> Orders</span>
            </h1>

            <p>
              Track and manage all your handcrafted orders
              in one place.
            </p>
          </div>

          <Link
            to="/products"
            className="orders-shopping-button"
          >
            Continue Shopping
            <span>→</span>
          </Link>
        </header>

        {/* Decorative line */}
        <div className="orders-header-line">
          <span />
        </div>

        {/* Stats */}
        <section className="orders-stats-grid">
          <article className="order-stat-card order-stat-blue">
            <div className="stat-icon">✦</div>

            <div className="stat-content">
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>

            <div className="stat-symbol">01</div>
          </article>

          <article className="order-stat-card order-stat-gold">
            <div className="stat-icon">𒀭</div>

            <div className="stat-content">
              <span>Completed</span>
              <strong>{completedOrders}</strong>
            </div>

            <div className="stat-symbol">02</div>
          </article>

          <article className="order-stat-card order-stat-red">
            <div className="stat-icon">◇</div>

            <div className="stat-content">
              <span>Active Orders</span>
              <strong>{activeOrders}</strong>
            </div>

            <div className="stat-symbol">03</div>
          </article>
        </section>

        {/* Orders section */}
        <section className="orders-section">
          <div className="orders-section-heading">
            <div>
              <span>YOUR PURCHASE HISTORY</span>

              <h2>Your Orders</h2>
            </div>

            <div className="orders-count-pill">
              {orders.length}{" "}
              {orders.length === 1 ? "ORDER" : "ORDERS"}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="orders-empty-card">
              <div className="orders-empty-icon">
                🛍️
              </div>

              <span>YOUR COLLECTION</span>

              <h2>No orders yet</h2>

              <p>
                Start shopping from our talented Iraqi
                artisans and discover something special.
              </p>

              <Link
                to="/products"
                className="orders-primary-button"
              >
                Explore Products
                <span>→</span>
              </Link>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map((order, index) => {
                const progress = getProgress(order.status);

                return (
                  <article
                    key={order.id}
                    className="order-card"
                    style={{
                      animationDelay: `${index * 120}ms`,
                    }}
                  >
                    <div className="order-card-number">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Top */}
                    <div className="order-card-top">
                      <div className="order-meta">
                        <span>ORDER</span>

                        <h3>#{order.id}</h3>

                        <p>
                          {order.created_at
                            ? new Date(
                                order.created_at
                              ).toLocaleDateString()
                            : "Date unavailable"}
                        </p>
                      </div>

                      <span
                        className={`order-status ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        <span className="status-dot" />
                        {getStatusText(order.status)}
                      </span>
                    </div>

                    {/* Information */}
                    <div className="order-information">
                      <div className="order-information-block">
                        <span>Total Amount</span>

                        <strong>
                          {Number(
                            order.total_amount || 0
                          ).toLocaleString()}{" "}
                          IQD
                        </strong>
                      </div>

                      <div className="order-information-divider" />

                      <div className="order-information-block">
                        <span>Order Status</span>

                        <strong className="order-status-text">
                          {getStatusText(order.status)}
                        </strong>
                      </div>
                    </div>

                    {/* Progress */}
                    {order.status !== "cancelled" && (
                      <div className="order-progress">
                        <div className="progress-labels">
                          <span
                            className={
                              order.status !== "pending"
                                ? "progress-active"
                                : ""
                            }
                          >
                            Pending
                          </span>

                          <span
                            className={
                              ["confirmed", "shipped", "completed"].includes(
                                order.status
                              )
                                ? "progress-active"
                                : ""
                            }
                          >
                            Confirmed
                          </span>

                          <span
                            className={
                              ["shipped", "completed"].includes(
                                order.status
                              )
                                ? "progress-active"
                                : ""
                            }
                          >
                            Shipped
                          </span>

                          <span
                            className={
                              order.status === "completed"
                                ? "progress-active"
                                : ""
                            }
                          >
                            Completed
                          </span>
                        </div>

                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: progress,
                            }}
                          >
                            <span />
                          </div>
                        </div>
                      </div>
                    )}

                    {order.status === "cancelled" && (
                      <div className="cancelled-message">
                        <span>×</span>

                        <div>
                          <strong>Order Cancelled</strong>
                          <p>
                            This order has been cancelled.
                          </p>
                        </div>
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