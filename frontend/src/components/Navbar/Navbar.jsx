import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-[#003049]/10 bg-[#780000]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

        {/* Logo */}
        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#003049] text-lg text-[#FDF0D5] transition-transform duration-300 group-hover:rotate-6">
            𒀭
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-[0.25em] text-[#FDF0D5]">
              AlHirfa
            </h1>

            <span className="text-xs tracking-[0.25em] text-[#003049]">
              IRAQI CRAFTS
            </span>
          </div>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-7">

          {/* Main Links */}
          <div className="flex items-center gap-7">
            <Link
              to="/"
              className="text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#E6B566]"
            >
              Home
            </Link>

            <Link
              to="/products"
              className="text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#E6B566]"
            >
              Products
            </Link>

            <Link
              to="/artisans"
              className="text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#E6B566]"
            >
              Artisans
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3 border-l border-[#FDF0D5]/20 pl-6">

            {/* Cart */}
            <Link
              to="/cart"
              aria-label="Cart"
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[#FDF0D5] transition-all duration-300 hover:bg-[#003049] hover:text-[#E6B566]"
            >
              🛒
            </Link>

            {/* Profile / Login */}
            <Link
              to="/login"
              aria-label="Login"
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-[#FDF0D5] transition-all duration-300 translate-x-150 hover:bg-[#003049] hover:text-[#E6B566]"
            >
              👤
            </Link>

          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;