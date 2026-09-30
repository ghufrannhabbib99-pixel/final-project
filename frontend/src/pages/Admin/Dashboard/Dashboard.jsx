import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "المستخدمون",
      value: "0",
      icon: "♙",
      className: "admin-stat-blue",
    },
    {
      title: "الحرفيون",
      value: "0",
      icon: "♢",
      className: "admin-stat-red",
    },
    {
      title: "المنتجات",
      value: "0",
      icon: "▣",
      className: "admin-stat-gold",
    },
    {
      title: "الطلبات",
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
                إدارة الحرفة
                <span />
              </div>

              <h1>مرحباً بعودتك، </h1>

              <p>
                أدر منصتك وتابع كل شيء من مكان واحد.
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
                  الحالي
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
                نظرة عامة
              </span>

              <h2>أحدث الطلبات</h2>

              <p>
                تابع أحدث نشاطات المنصة.
              </p>
            </div>

            <Link
              to="/admin/orders"
              className="admin-view-all"
            >
              عرض الكل
              <span>→</span>
            </Link>
          </div>

          <div className="admin-orders-content">
            <div className="admin-empty-icon">
              ◷
            </div>

            <span className="admin-empty-label">
              نشاط الطلبات
            </span>

            <h3>لا توجد طلبات متاحة حالياً</h3>

            <p>
              ستظهر الطلبات هنا بعد أن يبدأ العملاء بإجراء
              عمليات الشراء.
            </p>

            <Link
              to="/admin/orders"
              className="admin-empty-button"
            >
              الانتقال إلى الطلبات
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
            <span>منصة الحرفة</span>
            <h3>
              دعم الحرف والصناعات العراقية
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