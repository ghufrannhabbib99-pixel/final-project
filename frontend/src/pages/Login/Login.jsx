import { Link } from "react-router-dom";
import "../../styles/auth.css";
function Login() {
  return (
    <main className="login-page min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8">
      <div className="login-container">

        {/* Logo */}
       <Link to="/" className="auth-logo">
  <div className="auth-logo-icon">
    𒀭
  </div>

  <div className="auth-logo-text">
    <h1>AlHirfa</h1>
    <span>IRAQI CRAFTS</span>
  </div>
</Link>

        {/* Login Card */}
        <div className="login-card relative overflow-hidden rounded-[2rem] bg-white">

          <div className="login-decoration login-decoration-left">
            <span>𒀭</span>
            <span>𒂗</span>
            <span>𒆠</span>
          </div>

          <div className="login-decoration login-decoration-right">
            <span>𒀀</span>
            <span>𒂗</span>
            <span>𒀭</span>
          </div>

          <div className="login-content relative z-10">

            <div className="login-symbol">
              <span className="login-line" />
              <span>𒀭</span>
              <span className="login-line" />
            </div>

            <p className="login-label">
              WELCOME BACK
            </p>

            <h1 className="login-title">
              Login
            </h1>

            <p className="login-description">
              Sign in to your account and continue exploring
              handmade products from Iraqi artisans.
            </p>

            <form className="login-form">

              <div className="login-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>

              <div className="login-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                className="login-button"
              >
                Login
              </button>

            </form>

            <p className="login-register">
              Don't have an account?{" "}
              <Link to="/signup">
                Sign Up
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;