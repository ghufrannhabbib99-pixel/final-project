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
              ADMIN PANEL
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
            Dashboard
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
            Users
          </Link>

          <Link
            to="/admin/artisans"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>♢</span>
            Artisans
          </Link>

          <Link
            to="/admin/products"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>▣</span>
            Products
          </Link>

          <Link
            to="/admin/categories"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>◆</span>
            Categories
          </Link>

          <Link
            to="/admin/orders"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>◷</span>
            Orders
          </Link>

          <Link
            to="/admin/reviews"
            className="admin-nav-item flex items-center rounded-xl text-sm font-medium"
          >
            <span>★</span>
            Reviews
          </Link>

        </nav>

        {/* Logout */}
        <button
          type="button"
          className="admin-logout flex items-center rounded-xl text-sm font-medium"
        >
          <span>↪</span>
          Logout
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