import "./Orders.css";

function Orders() {
  const orders = [];

  return (
    <div className="admin-orders min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="orders-main">

        {/* Header */}
        <header className="orders-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Orders Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Manage customer orders and track their status.
            </p>
          </div>

          <div className="orders-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Orders
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {orders.length}
            </p>
          </div>

        </header>

        {/* Search and Filters */}
        <section className="orders-toolbar rounded-2xl bg-white shadow-sm">

          <div className="orders-search">

            <label
              htmlFor="order-search"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Search Orders
            </label>

            <input
              id="order-search"
              type="text"
              placeholder="Search by order ID or customer name..."
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/35 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            />

          </div>

          <div className="orders-filter">

            <label
              htmlFor="order-status"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Status
            </label>

            <select
              id="order-status"
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            >
              <option value="all">
                All Status
              </option>

              <option value="pending">
                Pending
              </option>

              <option value="processing">
                Processing
              </option>

              <option value="completed">
                Completed
              </option>

              <option value="cancelled">
                Cancelled
              </option>
            </select>

          </div>

        </section>

        {/* Orders Table */}
        <section className="orders-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="orders-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Orders
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Orders
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {orders.length} orders
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Order ID
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Products
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Total
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Status
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Actions
                  </th>

                </tr>
              </thead>

              <tbody>

                {orders.length === 0 ? (
                  <tr>

                    <td
                      colSpan="6"
                      className="orders-empty-state text-center"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div className="orders-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ◷
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No orders available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Orders will appear here once customers place them.
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : (

                  orders.map((order) => (

                    <tr
                      key={order.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {order.id}
                      </td>

                      <td className="px-6 py-5">
                        {order.customer}
                      </td>

                      <td className="px-6 py-5">
                        {order.products}
                      </td>

                      <td className="px-6 py-5">
                        {order.total}
                      </td>

                      <td className="px-6 py-5">
                        {order.status}
                      </td>

                      <td className="px-6 py-5">
                        Actions
                      </td>

                    </tr>

                  ))

                )}

              </tbody>

            </table>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Orders;