import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  return (
    <main className="artisan-dashboard">
      {/* Decorative background */}
      <div className="artisan-dashboard-orb artisan-dashboard-orb-one" />
      <div className="artisan-dashboard-orb artisan-dashboard-orb-two" />

      <div className="artisan-dashboard-symbol symbol-one">𒀭</div>
      <div className="artisan-dashboard-symbol symbol-two">𒂗</div>

      {/* Header */}
      <section className="artisan-dashboard-hero">
        <div className="artisan-dashboard-hero-inner">
          <div className="artisan-dashboard-kicker">
            <span />
            Artisan Workspace
          </div>

          <div className="artisan-dashboard-heading">
            <div>
              <h1>Artisan Dashboard</h1>

              <p>
                Manage your profile, products, and orders from one place.
              </p>
            </div>

            <Link
              to="/artisans"
              className="artisan-marketplace-btn"
            >
              <span>←</span>
              View Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="artisan-dashboard-content">
        <div className="artisan-dashboard-container">

          {/* Main Navigation Cards */}
          <div className="artisan-dashboard-grid">

            {/* Profile */}
            <Link
              to="/artisan/profile"
              className="artisan-dashboard-card"
            >
              <div className="artisan-card-image-wrap">
                <img
                  src="/images/artisans/potter.jpg"
                  alt="Artisan Profile"
                />

                <div className="artisan-card-image-overlay" />
              </div>

              <div className="artisan-card-content">
                <span className="artisan-card-number">01</span>

                <h2>My Profile</h2>

                <p>
                  View and manage your artisan information, bio,
                  location, and experience.
                </p>

                <div className="artisan-card-link">
                  Manage Profile
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Products */}
            <Link
              to="/artisan/products"
              className="artisan-dashboard-card"
            >
              <div className="artisan-card-image-wrap">
                <img
                  src="/images/products/ceramics/vase.jpg"
                  alt="Products"
                />

                <div className="artisan-card-image-overlay" />
              </div>

              <div className="artisan-card-content">
                <span className="artisan-card-number">02</span>

                <h2>My Products</h2>

                <p>
                  Add new handmade products and manage your existing
                  products.
                </p>

                <div className="artisan-card-link">
                  Manage Products
                  <span>→</span>
                </div>
              </div>
            </Link>

            {/* Orders */}
            <Link
              to="/artisan/orders"
              className="artisan-dashboard-card"
            >
              <div className="artisan-card-image-wrap">
                <img
                  src="/images/products/copper/copper-tray.jpg"
                  alt="Orders"
                />

                <div className="artisan-card-image-overlay" />
              </div>

              <div className="artisan-card-content">
                <span className="artisan-card-number">03</span>

                <h2>My Orders</h2>

                <p>
                  Follow your orders and keep track of the latest
                  order activity.
                </p>

                <div className="artisan-card-link">
                  View Orders
                  <span>→</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <section className="artisan-quick-actions">
            <div className="quick-actions-pattern">𒀭</div>

            <div className="quick-actions-content">
              <span>Quick Actions</span>

              <h2>
                Ready to add something new?
              </h2>

              <p>
                Add a handmade product and make it available to
                customers in the marketplace.
              </p>
            </div>

            <Link
              to="/artisan/products/add"
              className="add-product-btn"
            >
              <span>+</span>
              Add Product
            </Link>
          </section>

          {/* Helpful Links */}
          <section className="artisan-explore">
            <div className="artisan-section-heading">
              <div>
                <span>Discover</span>
                <h2>Explore</h2>
              </div>

              <div className="heading-line" />
            </div>

            <div className="artisan-explore-grid">

              {/* Browse Artisans */}
              <Link
                to="/artisans"
                className="artisan-explore-card"
              >
                <div className="explore-card-left">
                  <div className="explore-image">
                    <img
                      src="/images/artisans/embroiderer.jpg"
                      alt="Browse Artisans"
                    />
                  </div>

                  <div>
                    <h3>Browse Artisans</h3>

                    <p>
                      Explore the marketplace
                    </p>
                  </div>
                </div>

                <span className="explore-arrow">
                  →
                </span>
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/cart"
                className="artisan-explore-card"
              >
                <div className="explore-card-left">
                  <div className="explore-image">
                    <img
                      src="/images/products/palm/palm-basket.jpg"
                      alt="Shopping Cart"
                    />
                  </div>

                  <div>
                    <h3>Shopping Cart</h3>

                    <p>
                      View your cart
                    </p>
                  </div>
                </div>

                <span className="explore-arrow">
                  →
                </span>
              </Link>

            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;