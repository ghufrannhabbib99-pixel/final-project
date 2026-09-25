import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const stats = [
    {
      title: "Users",
      value: "0",
      icon: "♙",
    },
    {
      title: "Artisans",
      value: "0",
      icon: "♢",
    },
    {
      title: "Products",
      value: "0",
      icon: "▣",
    },
    {
      title: "Orders",
      value: "0",
      icon: "◷",
    },
  ];

  return (
    <div className="admin-dashboard min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="admin-main min-h-screen">

        {/* Header */}
        <header className="admin-header">

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
            Admin Dashboard
          </p>

          <h2 className="text-3xl font-bold text-[#003049]">
            Welcome back, Admin
          </h2>

          <p className="mt-2 text-sm text-[#003049]/60">
            Manage your marketplace and keep track of everything.
          </p>

        </header>

        {/* Statistics */}
        <section className="admin-stats grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">

          {stats.map((stat) => (
            <div
              key={stat.title}
              className="admin-stat-card rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">

                <div>
                  <p className="text-sm text-[#003049]/55">
                    {stat.title}
                  </p>

                  <p className="admin-stat-value text-3xl font-bold text-[#003049]">
                    {stat.value}
                  </p>
                </div>

                <div className="admin-stat-icon flex items-center justify-center rounded-xl bg-[#FDF0D5] text-lg text-[#780000]">
                  {stat.icon}
                </div>

              </div>
            </div>
          ))}

        </section>

        {/* Recent Orders */}
        <section className="admin-orders rounded-2xl bg-white shadow-sm">

          <div className="admin-orders-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Overview
              </p>

              <h3 className="mt-1 text-xl font-bold text-[#003049]">
                Recent Orders
              </h3>
            </div>

            <Link
              to="/admin/orders"
              className="rounded-full bg-[#003049] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#780000]"
            >
              View All
            </Link>

          </div>

          <div className="admin-empty-orders rounded-xl border border-[#003049]/10 text-center">
            <p className="text-sm text-[#003049]/50">
              No orders available yet.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;