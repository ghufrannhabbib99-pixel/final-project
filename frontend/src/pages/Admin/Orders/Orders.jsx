import "./Orders.css";

function Orders() {
  const orders = [];

  return (
    <div className="admin-orders min-h-screen bg-[#FDF0D5]">
      {/* Decorative elements */}
      <div className="orders-orb orders-orb-one" />
      <div className="orders-orb orders-orb-two" />
      <div className="orders-cuneiform orders-cuneiform-one">𒀭</div>
      <div className="orders-cuneiform orders-cuneiform-two">𒂗</div>

      <main className="orders-main">
        {/* Header */}
        <header className="orders-header">
          <div className="orders-header-content">
            <div className="orders-kicker">
              <span className="orders-kicker-line" />
              Administration
            </div>

            <h1>
              Orders <span>Management</span>
            </h1>

            <p>
              Manage customer orders and track their status from one place.
            </p>
          </div>

          <div className="orders-count">
            <div className="orders-count-icon">◷</div>

            <div>
              <span>Total Orders</span>
              <strong>{orders.length}</strong>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <section className="orders-toolbar">
          <div className="toolbar-heading">
            <div className="toolbar-symbol">⌕</div>

            <div>
              <span>Order Directory</span>
              <h2>Search & Filter</h2>
            </div>
          </div>

          <div className="orders-toolbar-fields">
            <div className="orders-search">
              <label htmlFor="order-search">Search Orders</label>

              <div className="orders-input-wrapper">
                <span>⌕</span>

                <input
                  id="order-search"
                  type="text"
                  placeholder="Search by order ID or customer name..."
                />
              </div>
            </div>

            <div className="orders-filter">
              <label htmlFor="order-status">Status</label>

              <select id="order-status">
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </section>

        {/* Orders Table */}
        <section className="orders-table-wrapper">
          <div className="orders-table-header">
            <div>
              <div className="orders-section-kicker">
                <span />
                Orders
              </div>

              <h2>All Orders</h2>
            </div>

            <div className="orders-result-count">
              <strong>{orders.length}</strong>
              <span>orders</span>
            </div>
          </div>

          <div className="orders-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Products</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="orders-empty-state">
                        <div className="orders-empty-icon">
                          <div className="orders-empty-ring">
                            ◷
                          </div>
                        </div>

                        <div className="orders-empty-content">
                          <h3>No orders available yet</h3>

                          <p>
                            Orders will appear here once customers place
                            their first orders.
                          </p>
                        </div>

                        <div className="orders-empty-decoration">
                          <span>𒀭</span>
                          <span>◇</span>
                          <span>𒂗</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <span className="order-id">
                          #{order.id}
                        </span>
                      </td>

                      <td>{order.customer}</td>

                      <td>{order.products}</td>

                      <td>{order.total}</td>

                      <td>
                        <span className="order-status">
                          {order.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="order-action-button"
                        >
                          Actions
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Bottom note */}
        <div className="orders-footer-note">
          <span className="orders-footer-symbol">✦</span>

          <p>
            Every order helps connect customers with Iraqi handmade
            craftsmanship.
          </p>

          <span className="orders-footer-symbol">✦</span>
        </div>
      </main>
    </div>
  );
}

export default Orders;