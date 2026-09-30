import { Link, Outlet, useLocation } from "react-router-dom";
import "./AdminLayout.css";

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="admin-layout min-h-screen bg-[#FDF0D5]">

      {/* Sidebar */}
      <aside className="admin-sidebar flex h-screen flex-col bg-[#003049] text-[#FDF0D5]">

        {/* Logo */}
        <Link
          to="/admin/dashboard"
          className="admin-logo flex items-center gap-3"
        >
          <div className="admin-logo-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-lg text-[#003049]">
            𒀭
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-[0.2em]">
              AlHirfa
            </h1>

            <p className="text-[9px] tracking-[0.2em] text-[#E6B566]">
              لوحة الإدارة
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="admin-navigation flex flex-col">

          <Link
            to="/admin/dashboard"
            className={`admin-nav-item flex items-center rounded-xl text-sm font-medium ${
              location.pathname === "/admin/dashboard"
                ? "admin-nav-active"
                : ""
            }`}
          >
            <span>⌂</span>
            لوحة التحكم
          </Link>

          <Link
            to="/admin/users"
            className={`admin-nav-item flex items-center rounded-xl text-sm font-medium ${
              location.pathname === "/admin/users"
                ? "admin-nav-active"
                : ""
            }`}
          >
            <span>♙</span>
            المستخدمون
          </Link>

          <Link
            to="/admin/artisans"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>♢</span>
            الحرفيون
          </Link>

          <Link
            to="/admin/products"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>▣</span>
            المنتجات
          </Link>

          <Link
            to="/admin/categories"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>◆</span>
            الفئات
          </Link>

          <Link
            to="/admin/orders"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>◷</span>
            الطلبات
          </Link>

          <Link
            to="/admin/reviews"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>★</span>
            التقييمات
          </Link>

        </nav>

        {/* Logout */}
        <button
          type="button"
          className="admin-logout flex items-center rounded-xl text-sm font-medium"
        >
          <span>↪</span>
          تسجيل الخروج
        </button>

      </aside>

      {/* Page Content */}
      <main className="admin-layout-content">
        <Outlet />
      </main>

    </div>
  );
}

export default AdminLayout;