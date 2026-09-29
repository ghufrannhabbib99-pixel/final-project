import { useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

function Profile() {
  const [user] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Failed to read user data:", error);
      }
    }

    return null;
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const userName =
    user?.name ||
    user?.full_name ||
    user?.username ||
    "User";

  const userEmail = user?.email || "Email not available";

  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <main className="profile-page">
      {/* Decorative background */}
      <div className="profile-orb profile-orb-one" />
      <div className="profile-orb profile-orb-two" />
      <div className="profile-cuneiform">𒀭</div>

      {/* Hero */}
      <section className="profile-hero">
        <div className="profile-pattern profile-pattern-right" />
        <div className="profile-pattern profile-pattern-left" />

        <div className="profile-hero-content">
          <div className="profile-kicker">
            <span className="profile-kicker-line" />
            MY ACCOUNT
            <span className="profile-kicker-line" />
          </div>

          <h1 className="profile-title">
            My
            <span> Profile</span>
          </h1>

          <div className="profile-title-decoration">
            <span />
            <span className="profile-diamond">◆</span>
            <span />
          </div>

          <p className="profile-description">
            Manage your account and explore everything
            you have saved on AlHerfa.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="profile-section">
        <div className="profile-container">
          {/* Main profile */}
          <section className="profile-main-card">
            <div className="profile-avatar-wrapper">
              <div className="profile-avatar-ring" />

              <div className="profile-avatar">
                {userInitial}
              </div>

              <span className="profile-online-dot" />
            </div>

            <div className="profile-user-info">
              <span className="profile-label">
                WELCOME BACK
              </span>

              <h2>{userName}</h2>

              <p>{userEmail}</p>

              <div className="profile-member-badge">
                <span>✦</span>
                AlHerfa Member
              </div>
            </div>

            <button
              type="button"
              className="profile-edit-button"
            >
              <span>✎</span>
              Edit Profile
            </button>
          </section>

          {/* Quick access */}
          <div className="profile-section-heading">
            <div>
              <span>QUICK ACCESS</span>
              <h2>Your Space</h2>
            </div>

            <span className="profile-section-symbol">
              𒀭
            </span>
          </div>

          <div className="profile-options">
            <Link
              to="/my-orders"
              className="profile-option-card profile-option-orders"
            >
              <div className="profile-option-top">
                <div className="profile-option-icon">
                  📦
                </div>

                <span className="profile-option-number">
                  01
                </span>
              </div>

              <div className="profile-option-content">
                <h3>My Orders</h3>

                <p>
                  View and track all your orders and
                  purchases.
                </p>
              </div>

              <span className="profile-option-arrow">
                →
              </span>
            </Link>

            <Link
              to="/favorites"
              className="profile-option-card profile-option-favorites"
            >
              <div className="profile-option-top">
                <div className="profile-option-icon">
                  ♡
                </div>

                <span className="profile-option-number">
                  02
                </span>
              </div>

              <div className="profile-option-content">
                <h3>Favorites</h3>

                <p>
                  Explore the handcrafted products you
                  saved.
                </p>
              </div>

              <span className="profile-option-arrow">
                →
              </span>
            </Link>

            <Link
              to="/cart"
              className="profile-option-card profile-option-cart"
            >
              <div className="profile-option-top">
                <div className="profile-option-icon">
                  🛒
                </div>

                <span className="profile-option-number">
                  03
                </span>
              </div>

              <div className="profile-option-content">
                <h3>My Cart</h3>

                <p>
                  Continue shopping and complete your
                  checkout.
                </p>
              </div>

              <span className="profile-option-arrow">
                →
              </span>
            </Link>
          </div>

          {/* Bottom message */}
          <div className="profile-bottom-banner">
            <div className="profile-banner-symbol">
              𒀭
            </div>

            <div>
              <span>ALHERFA COLLECTION</span>

              <p>
                Supporting Iraqi artisans, one
                handcrafted piece at a time.
              </p>
            </div>
          </div>

          {/* Logout */}
          <div className="profile-logout-wrapper">
            <button
              type="button"
              onClick={handleLogout}
              className="profile-logout-button"
            >
              <span>Logout</span>
              <span>↗</span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Profile;