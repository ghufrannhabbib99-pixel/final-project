import { Link } from "react-router-dom";
import "../../styles/auth.css";
function Register() {
  return (
    <main className="register-page min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8">

      <div className="register-container">

        <Link to="/" className="auth-logo">
  <div className="auth-logo-icon">
    𒀭
  </div>

  <div className="auth-logo-text">
    <h1>AlHirfa</h1>
    <span>IRAQI CRAFTS</span>
  </div>
</Link>

        {/* Register Card */}
        <div className="register-card relative overflow-hidden rounded-[2rem] bg-white">

          {/* Decorative Cuneiform */}
          <div className="register-decoration register-decoration-left">
            <span>𒀭</span>
            <span>𒂗</span>
            <span>𒆠</span>
          </div>

          <div className="register-decoration register-decoration-right">
            <span>𒀀</span>
            <span>𒂗</span>
            <span>𒀭</span>
          </div>

          {/* Content */}
          <div className="register-content relative z-10">

            {/* Top Decoration */}
            <div className="register-symbol">
              <span className="register-line" />
              <span>𒀭</span>
              <span className="register-line" />
            </div>

            <p className="register-label">
              JOIN OUR COMMUNITY
            </p>

            <h1 className="register-title">
              Create Account
            </h1>

            <p className="register-description">
              Create your account and discover unique handmade products
              from Iraqi artisans.
            </p>

            {/* Form */}
            <form className="register-form">

              {/* Name */}
              <div className="register-field">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="register-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div className="register-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                />
              </div>

              {/* Confirm Password */}
              <div className="register-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="register-button"
              >
                Create Account
              </button>

            </form>

            {/* Login */}
            <p className="register-login">
              Already have an account?{" "}
              <Link to="/Login">
                Login
              </Link>
            </p>

          </div>
        </div>

      </div>

    </main>
  );
}

export default Register;