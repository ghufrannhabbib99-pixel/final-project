import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import api from "../../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [accountType, setAccountType] = useState("user");

  const [craftName, setCraftName] = useState("");
  const [bio, setBio] = useState("");
  const [city, setCity] = useState("");
  const [experienceYears, setExperienceYears] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (accountType === "artisan" && !craftName.trim()) {
      setError("Please enter your craft name");
      return;
    }

    setLoading(true);

    try {
      const response = await api.auth.register({
        name,
        email,
        password,
        role: accountType,

        ...(accountType === "artisan"
          ? {
              craft_name: craftName,
              bio,
              city,
              experience_years: experienceYears,
            }
          : {}),
      });

      const result = response?.data || response;

      const { user, token } = result;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setSuccess("Account created successfully");

      setTimeout(() => {
        if (user.role === "artisan") {
          navigate("/artisan/dashboard");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

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

        <div className="register-card relative overflow-hidden rounded-[2rem] bg-white">

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

          <div className="register-content relative z-10">

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

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 rounded-lg bg-green-100 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <form
              className="register-form"
              onSubmit={handleSubmit}
            >

              <div className="register-field">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="email">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Account Type */}

              <div className="register-field">
                <label>
                  Account Type
                </label>

                <div className="grid grid-cols-2 gap-3">

                  <button
                    type="button"
                    onClick={() => setAccountType("user")}
                    className={`rounded-xl border px-4 py-3 transition ${
                      accountType === "user"
                        ? "border-[#8B4513] bg-[#8B4513] text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    Customer
                  </button>

                  <button
                    type="button"
                    onClick={() => setAccountType("artisan")}
                    className={`rounded-xl border px-4 py-3 transition ${
                      accountType === "artisan"
                        ? "border-[#8B4513] bg-[#8B4513] text-white"
                        : "border-gray-300 bg-white text-gray-700"
                    }`}
                  >
                    Artisan
                  </button>

                </div>
              </div>

              {/* Artisan Fields */}

              {accountType === "artisan" && (
                <>

                  <div className="register-field">
                    <label htmlFor="craftName">
                      Craft Name
                    </label>

                    <input
                      id="craftName"
                      type="text"
                      placeholder="Example: Iraqi Potter"
                      value={craftName}
                      onChange={(e) =>
                        setCraftName(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="city">
                      City
                    </label>

                    <input
                      id="city"
                      type="text"
                      placeholder="Example: Basra"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="experienceYears">
                      Experience Years
                    </label>

                    <input
                      id="experienceYears"
                      type="number"
                      min="0"
                      placeholder="Example: 5"
                      value={experienceYears}
                      onChange={(e) =>
                        setExperienceYears(e.target.value)
                      }
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="bio">
                      Short Bio
                    </label>

                    <textarea
                      id="bio"
                      placeholder="Tell us about your craft..."
                      value={bio}
                      onChange={(e) =>
                        setBio(e.target.value)
                      }
                      rows="3"
                    />
                  </div>

                </>
              )}

              <div className="register-field">
                <label htmlFor="password">
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />
              </div>

              <button
                type="submit"
                className="register-button"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : accountType === "artisan"
                  ? "Create Artisan Account"
                  : "Create Account"}
              </button>

            </form>

            <p className="register-login">
              Already have an account?{" "}
              <Link to="/login">
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