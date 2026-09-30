
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
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    if (password.length < 6) {
      setError("يجب أن تتكون كلمة المرور من 6 أحرف على الأقل");
      return;
    }

    if (accountType === "artisan" && !craftName.trim()) {
      setError("يرجى إدخال اسم الحِرفة");
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

      setSuccess("تم إنشاء الحساب بنجاح");

      setTimeout(() => {
        if (user.role === "artisan") {
          navigate("/artisan/dashboard");
        } else {
          navigate("/");
        }
      }, 500);
    } catch (err) {
      setError(err.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="register-page min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8"
      dir="rtl"
    >
      <div className="register-container">

        {/* الشعار */}
        <Link to="/" className="auth-logo">
          <div className="auth-logo-icon">
            𒀭
          </div>

          <div className="auth-logo-text">
            <h1>الحِرفة</h1>
            <span>الحِرف العراقية</span>
          </div>
        </Link>

        {/* بطاقة إنشاء الحساب */}
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

            <p className="register-label !text-[15px]">
  انضم إلى مجتمعنا
</p>

            <h1 className="register-title">
              إنشاء حساب
            </h1>

            <p className="register-description">
              أنشئ حسابك واكتشف منتجات يدوية مميزة
              من الحرفيين العراقيين.
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
                  الاسم الكامل
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="أدخل اسمك الكامل"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="email">
                  البريد الإلكتروني
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="أدخل بريدك الإلكتروني"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* نوع الحساب */}

              <div className="register-field">
                <label>
                  نوع الحساب
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
                    عميل
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
                    حرفي
                  </button>

                </div>
              </div>

              {/* معلومات الحرفي */}

              {accountType === "artisan" && (
                <>

                  <div className="register-field">
                    <label htmlFor="craftName">
                      اسم الحِرفة
                    </label>

                    <input
                      id="craftName"
                      type="text"
                      placeholder="مثال: صناعة الفخار"
                      value={craftName}
                      onChange={(e) =>
                        setCraftName(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="city">
                      المدينة
                    </label>

                    <input
                      id="city"
                      type="text"
                      placeholder="مثال: البصرة"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="experienceYears">
                      سنوات الخبرة
                    </label>

                    <input
                      id="experienceYears"
                      type="number"
                      min="0"
                      placeholder="مثال: 5"
                      value={experienceYears}
                      onChange={(e) =>
                        setExperienceYears(e.target.value)
                      }
                    />
                  </div>

                  <div className="register-field">
                    <label htmlFor="bio">
                      نبذة قصيرة
                    </label>

                    <textarea
                      id="bio"
                      placeholder="أخبرنا عن حِرفتك..."
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
                  كلمة المرور
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="أنشئ كلمة مرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="register-field">
                <label htmlFor="confirmPassword">
                  تأكيد كلمة المرور
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="أعد إدخال كلمة المرور"
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
                  ? "جاري إنشاء الحساب..."
                  : accountType === "artisan"
                  ? "إنشاء حساب حرفي"
                  : "إنشاء الحساب"}
              </button>

            </form>

            <p className="register-login">
              لديك حساب بالفعل؟{" "}
              <Link to="/login">
                تسجيل الدخول
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Register;

