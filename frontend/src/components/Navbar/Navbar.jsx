import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className=" border-b border-[#003049]/10 bg-[#780000]/95 ">
      <div className=" flex items-center justify-between px-4 mx-auto max-w-7xl">

        
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
          <Link
            to="/"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
 
          >
            Products
          </Link>

          <Link
            to="/artisans"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
          >
            Artisans
          </Link>

          <Link
            to="/cart"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="relative text-base font-medium text-[#FDF0D5] transition-colors duration-300 hover:text-[#003049]"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;