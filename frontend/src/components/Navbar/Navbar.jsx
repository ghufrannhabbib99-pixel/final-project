import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setUser(null);
        return;
      }

      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMenuOpen(false);

    navigate("/login");
  };

  const isArtisan = user?.role === "artisan";
  const isAdmin = user?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 border-b border-[#FDF0D5]/10 bg-[#780000]/95 shadow-lg backdrop-blur-md">
      <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between px-4 md:px-6">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003049] text-lg text-[#FDF0D5] shadow-md transition-all duration-300 group-hover:rotate-6 group-hover:scale-105">
            𒀭
          </div>

          <div className="hidden sm:block">
            <h1 className="text-xl font-bold tracking-[0.25em] text-[#FDF0D5]">
              AlHirfa
            </h1>

            <span className="text-[10px] tracking-[0.25em] text-[#FDF0D5]/70">
              IRAQI CRAFTS
            </span>
          </div>
        </Link>

        {/* ================= CENTER NAV ================= */}
        <div className="hidden items-center gap-8 md:flex  !ml-160 mr-0">

          <Link
            to="/"
            className="relative text-[20px] font-medium text-[#FDF0D5] transition-all duration-300 hover:text-[#E6B566]"
          >
            الرئيسية
          </Link>

          <Link
            to="/products"
            className="relative text-[20px] font-medium text-[#FDF0D5] transition-all duration-300 hover:text-[#E6B566]"
          >
            المنتجات
          </Link>

          <Link
            to="/artisans"
            className="relative text-[20px] font-medium text-[#FDF0D5] transition-all duration-300 hover:text-[#E6B566]"
          >
            الحرفيون
          </Link>

          <Link
            to="/ai"
            className="rounded-full px-4 py-2 text-[16px] font-semibold text-[#FDF0D5] transition-all duration-300 hover:bg-[#003049] hover:text-[#E6B566]"
          >
            AI
          </Link>

          <Link
            to="/favorites"
            className="text-[20px] font-medium text-[#FDF0D5] transition-all duration-300 hover:text-[#E6B566]"
          >
            المفضلة
          </Link>
        </div>

        {/* ================= RIGHT ACTIONS ================= */}
        <div className="flex items-center gap-2 !ml-130">

          {/* Cart */}
          <Link
            to="/cart"
            aria-label="السلة"
            className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-[#FDF0D5] transition-all duration-300 hover:bg-[#003049] hover:text-[#E6B566]"
          >
            🛒
          </Link>

          {/* User menu */}
          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label="فتح القائمة"
              aria-expanded={menuOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-2xl font-bold leading-none text-[#FDF0D5] transition-all duration-300 hover:bg-[#003049] hover:text-[#E6B566]"
            >
              ⋮
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div className="absolute right-0 top-14 w-60 origin-top-right animate-[menuIn_0.18s_ease-out] overflow-hidden rounded-2xl border border-[#003049]/10 bg-[#FDF0D5] p-2 shadow-2xl">

                {/* User information */}
                {user && (
                  <div className="mb-1 border-b border-[#003049]/10 px-3 py-3">
                    <p className="truncate text-sm font-semibold text-[#003049]">
                      {user.name}
                    </p>

                    <p className="mt-1 text-xs capitalize text-[#003049]/60">
                      {user.role || "مستخدم"}
                    </p>
                  </div>
                )}

                {/* Profile */}
                {user && !isAdmin && (
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                  >
                    إدارة الحساب
                  </Link>
                )}

                {/* Orders */}
                {user && !isArtisan && !isAdmin && (
                  <Link
                    to="/my-orders"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                  >
                    طلباتي
                  </Link>
                )}

                {/* Artisan links */}
                {isArtisan && (
                  <>
                    <Link
                      to="/artisan/dashboard"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                    >
                      لوحة الحرفي
                    </Link>

                    <Link
                      to="/artisan/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                    >
                      ملف الحرفي
                    </Link>

                    <Link
                      to="/artisan/products"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                    >
                      منتجاتي
                    </Link>

                    <Link
                      to="/artisan/orders"
                      onClick={() => setMenuOpen(false)}
                      className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                    >
                      طلباتي
                    </Link>
                  </>
                )}

                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-medium text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                  >
                    لوحة الإدارة
                  </Link>
                )}

                {/* Login */}
                {!user && (
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-xl px-3 py-2.5 text-sm font-semibold text-[#003049] transition hover:bg-[#003049] hover:text-[#FDF0D5]"
                  >
                    تسجيل الدخول
                  </Link>
                )}

                {/* Logout */}
                {user && (
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-1 w-full rounded-xl border-t border-[#003049]/10 px-3 py-2.5 text-left text-sm font-semibold text-[#780000] transition hover:bg-[#780000] hover:text-[#FDF0D5]"
                  >
                    تسجيل الخروج
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-[#FDF0D5]/10 px-4 py-3 md:hidden">
        <div className="flex items-center justify-center gap-4 overflow-x-auto">

          <Link
            to="/"
            className="whitespace-nowrap text-xs font-medium text-[#FDF0D5]"
          >
            الرئيسية
          </Link>

          <Link
            to="/products"
            className="whitespace-nowrap text-xs font-medium text-[#FDF0D5]"
          >
            المنتجات
          </Link>

          <Link
            to="/artisans"
            className="whitespace-nowrap text-xs font-medium text-[#FDF0D5]"
          >
            الحرفيون
          </Link>

          <Link
            to="/ai"
            className="whitespace-nowrap text-xs font-semibold text-[#E6B566]"
          >
            AI
          </Link>

          <Link
            to="/favorites"
            className="whitespace-nowrap text-xs font-medium text-[#FDF0D5]"
          >
            المفضلة
          </Link>

        </div>
      </div>

      <style>
        {`
          @keyframes menuIn {
            from {
              opacity: 0;
              transform: translateY(-8px) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
        `}
      </style>
    </nav>
  );
}

export default Navbar;