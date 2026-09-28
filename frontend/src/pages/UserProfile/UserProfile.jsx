
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to read user data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const userName = user?.name || user?.full_name || user?.username || "User";
  const userEmail = user?.email || "Email not available";

  return (
    <div className="profile-page">
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

          <h1 className="profile-title">My Profile</h1>

          <div className="profile-title-decoration">
            <span />
            <span className="profile-diamond">◆</span>
            <span />
          </div>

          <p className="profile-description">
            Manage your account and explore everything you have saved
            on AlHirfa.
          </p>
        </div>
      </section>

      {/* Profile Content */}
      <section className="profile-section">
        <div className="profile-container">
          {/* Main Profile Card */}
          <div className="profile-main-card">
            <div className="profile-avatar">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="profile-user-info">
              <span className="profile-label">WELCOME BACK</span>

              <h2>{userName}</h2>

              <p>{userEmail}</p>
            </div>

            <button
              type="button"
              className="profile-edit-button"
            >
              Edit Profile
            </button>
          </div>

          {/* Account Options */}
          <div className="profile-options">
            <Link to="/my-orders" className="profile-option-card">
              <div className="profile-option-icon">📦</div>

              <div className="profile-option-content">
                <h3>My Orders</h3>
                <p>View and track your orders</p>
              </div>

              <span className="profile-option-arrow">→</span>
            </Link>

            <Link to="/favorites" className="profile-option-card">
              <div className="profile-option-icon">♡</div>

              <div className="profile-option-content">
                <h3>Favorites</h3>
                <p>View the products you saved</p>
              </div>

              <span className="profile-option-arrow">→</span>
            </Link>

            <Link to="/cart" className="profile-option-card">
              <div className="profile-option-icon">🛒</div>

              <div className="profile-option-content">
                <h3>My Cart</h3>
                <p>Continue shopping and checkout</p>
              </div>

              <span className="profile-option-arrow">→</span>
            </Link>
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
    </div>
  );
}

export default Profile;

