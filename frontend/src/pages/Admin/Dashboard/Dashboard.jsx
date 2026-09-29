import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Users",
      value: "0",
      icon: "♙",
      className: "admin-stat-blue",
    },
    {
      title: "Artisans",
      value: "0",
      icon: "♢",
      className: "admin-stat-red",
    },
    {
      title: "Products",
      value: "0",
      icon: "▣",
      className: "admin-stat-gold",
    },
    {
      title: "Orders",
      value: "0",
      icon: "◷",
      className: "admin-stat-green",
    },
  ];

  return (
    <div className="admin-dashboard">
      <div className="admin-decoration admin-decoration-one" />
      <div className="admin-decoration admin-decoration-two" />
      <div className="admin-cuneiform admin-cuneiform-one">
        𒀭
      </div>
      <div className="admin-cuneiform admin-cuneiform-two">
        𒂗
      </div>

      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-top">
            <div>
              <div className="admin-kicker">
                <span />
                ALHERFA ADMIN
                <span />
              </div>

              <h1>Welcome back, Admin</h1>

              <p>
                Manage your marketplace and keep track of
                everything from one place.
              </p>
            </div>

            <div className="admin-header-symbol">
              <span>𒀭</span>
            </div>
          </div>

          <div className="admin-header-line">
            <span />
            <b>✦</b>
            <span />
          </div>
        </header>

        {/* Statistics */}
        <section className="admin-stats">
          {stats.map((stat, index) => (
            <article
              key={stat.title}
              className={`admin-stat-card ${stat.className}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="admin-stat-top">
                <span className="admin-stat-label">
                  {stat.title}
                </span>

                <div className="admin-stat-icon">
                  {stat.icon}
                </div>
              </div>

              <div className="admin-stat-bottom">
                <strong>{stat.value}</strong>

                <span className="admin-stat-status">
                  Current
                </span>
              </div>

              <div className="admin-stat-shine" />
            </article>
          ))}
        </section>

        {/* Orders */}
        <section className="admin-orders">
          <div className="admin-orders-header">
            <div>
              <span className="admin-section-kicker">
                OVERVIEW
              </span>

              <h2>Recent Orders</h2>

              <p>
                Keep track of the latest marketplace activity.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="admin-view-all"
            >
              View All
              <span>→</span>
            </Link>
          </div>

          <div className="admin-orders-content">
            <div className="admin-empty-icon">
              ◷
            </div>

            <span className="admin-empty-label">
              ORDER ACTIVITY
            </span>

            <h3>No orders available yet</h3>

            <p>
              Orders will appear here once customers start
              making purchases.
            </p>

            <Link
              to="/admin/orders"
              className="admin-empty-button"
            >
              Go to Orders
              <span>→</span>
            </Link>
          </div>
        </section>

        {/* Bottom info */}
        <section className="admin-bottom-banner">
          <div className="admin-banner-symbol">
            𒀭
          </div>

          <div>
            <span>ALHERFA MARKETPLACE</span>
            <h3>
              Supporting Iraqi craftsmanship
            </h3>
          </div>

          <div className="admin-banner-decoration">
            ✦
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;