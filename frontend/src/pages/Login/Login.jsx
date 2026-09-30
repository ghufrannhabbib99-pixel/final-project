
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import api from "../../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await api.auth.login({
        email,
        password,
      });

      const { user, token } = response.data;

      // حفظ بيانات تسجيل الدخول
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // الانتقال حسب نوع المستخدم
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "artisan") {
        navigate("/artisan/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="login-page min-h-screen bg-[#FDF0D5] px-5 py-12 md:px-8"
      dir="rtl"
    >
      <div className="login-container">

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

        {/* بطاقة تسجيل الدخول */}
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
              أهلاً بعودتك
            </p>

            <h1 className="login-title">
              تسجيل الدخول
            </h1>

            <p className="login-description">
              سجّل الدخول إلى حسابك وتابع استكشاف المنتجات اليدوية
              المصنوعة بأيادٍ عراقية.
            </p>

            {/* رسالة الخطأ */}
            {error && (
              <div className="mb-4 rounded-lg bg-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              <div className="login-field">
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

              <div className="login-field">
                <label htmlFor="password">
                  كلمة المرور
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </button>

            </form>

            <p className="login-register">
              ليس لديك حساب؟{" "}
              <Link to="/signup">
                إنشاء حساب
              </Link>
            </p>

          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;

