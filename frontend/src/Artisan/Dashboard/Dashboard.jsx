import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <main className="min-h-screen bg-[#FDF0D5]">
      {/* Header */}
      <section className="relative overflow-hidden bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />
        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#780000]">
            Artisan Workspace
          </p>

          <div className="mt-3 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-4xl font-bold leading-tight text-[#003049] sm:text-5xl">
                Artisan Dashboard
              </h1>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-[#669BBC]">
                Manage your profile, products, and orders from one place.
              </p>
            </div>

            <Link
              to="/artisans"
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#003049]/15 bg-white px-5 py-3 font-semibold text-[#003049] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span>←</span>
              View Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Main Navigation Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile */}
            <Link
              to="/artisan/profile"
              className="group rounded-3xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF0D5] text-3xl transition-transform duration-300 group-hover:scale-110">
                👤
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#003049]">
                My Profile
              </h2>

              <p className="mt-3 leading-7 text-[#669BBC]">
                View and manage your artisan information, bio, location,
                and experience.
              </p>

              <div className="mt-6 font-semibold text-[#780000]">
                Manage Profile
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>

            {/* Products */}
            <Link
              to="/artisan/products"
              className="group rounded-3xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF0D5] text-3xl transition-transform duration-300 group-hover:scale-110">
                🧺
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#003049]">
                My Products
              </h2>

              <p className="mt-3 leading-7 text-[#669BBC]">
                Add new handmade products and manage your existing
                products.
              </p>

              <div className="mt-6 font-semibold text-[#780000]">
                Manage Products
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>

            {/* Orders */}
            <Link
              to="/artisan/orders"
              className="group rounded-3xl bg-white p-7 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FDF0D5] text-3xl transition-transform duration-300 group-hover:scale-110">
                📦
              </div>

              <h2 className="mt-6 text-2xl font-bold text-[#003049]">
                My Orders
              </h2>

              <p className="mt-3 leading-7 text-[#669BBC]">
                Follow your orders and keep track of the latest order
                activity.
              </p>

              <div className="mt-6 font-semibold text-[#780000]">
                View Orders
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="mt-10 overflow-hidden rounded-3xl bg-[#003049] p-7 shadow-xl sm:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#669BBC]">
                  Quick Actions
                </p>

                <h2 className="mt-2 text-3xl font-bold text-[#FDF0D5]">
                  Ready to add something new?
                </h2>

                <p className="mt-3 max-w-2xl leading-7 text-[#FDF0D5]/70">
                  Add a handmade product and make it available to customers
                  in the marketplace.
                </p>
              </div>

              <Link
                to="/artisan/products/add"
                className="inline-flex w-fit shrink-0 items-center gap-2 rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
              >
                <span className="text-xl">+</span>
                Add Product
              </Link>
            </div>
          </div>

          {/* Helpful Links */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-[#003049]">
              Explore
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Link
                to="/artisans"
                className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF0D5]">
                    🎨
                  </div>

                  <div>
                    <h3 className="font-bold text-[#003049]">
                      Browse Artisans
                    </h3>

                    <p className="text-sm text-[#669BBC]">
                      Explore the marketplace
                    </p>
                  </div>
                </div>

                <span className="text-xl text-[#780000] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                to="/cart"
                className="group flex items-center justify-between rounded-2xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FDF0D5]">
                    🛒
                  </div>

                  <div>
                    <h3 className="font-bold text-[#003049]">
                      Shopping Cart
                    </h3>

                    <p className="text-sm text-[#669BBC]">
                      View your cart
                    </p>
                  </div>
                </div>

                <span className="text-xl text-[#780000] transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Dashboard;