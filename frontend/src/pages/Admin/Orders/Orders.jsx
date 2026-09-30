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
              الإدارة
            </div>

            <h1>
              إدارة <span>الطلبات</span>
            </h1>

            <p>
              إدارة طلبات العملاء ومتابعة حالتها من مكان واحد.
            </p>
          </div>

          <div className="orders-count">
            <div className="orders-count-icon">◷</div>

            <div>
              <span>إجمالي الطلبات</span>
              <strong>{orders.length}</strong>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <section className="orders-toolbar">
          <div className="toolbar-heading">
            <div className="toolbar-symbol">⌕</div>

            <div>
              <span>دليل الطلبات</span>
              <h2>البحث والتصفية</h2>
            </div>
          </div>

          <div className="orders-toolbar-fields">
            <div className="orders-search">
              <label htmlFor="order-search">
                البحث عن الطلبات
              </label>

              <div className="orders-input-wrapper">
                <span>⌕</span>

                <input
                  id="order-search"
                  type="text"
                  placeholder="ابحث برقم الطلب أو اسم العميل..."
                />
              </div>
            </div>

            <div className="orders-filter">
              <label htmlFor="order-status">
                الحالة
              </label>

              <select id="order-status">
                <option value="all">جميع الحالات</option>
                <option value="pending">قيد الانتظار</option>
                <option value="processing">قيد المعالجة</option>
                <option value="completed">مكتمل</option>
                <option value="cancelled">ملغى</option>
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
                الطلبات
              </div>

              <h2>جميع الطلبات</h2>
            </div>

            <div className="orders-result-count">
              <strong>{orders.length}</strong>
              <span>طلب</span>
            </div>
          </div>

          <div className="orders-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>رقم الطلب</th>
                  <th>العميل</th>
                  <th>المنتجات</th>
                  <th>الإجمالي</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
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
                          <h3>لا توجد طلبات متاحة حالياً</h3>

                          <p>
                            ستظهر الطلبات هنا بعد أن يقوم العملاء
                            بإجراء طلباتهم الأولى.
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
                          الإجراءات
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
            كل طلب يساهم في ربط العملاء بالحرف والصناعات
            اليدوية العراقية.
          </p>

          <span className="orders-footer-symbol">✦</span>
        </div>
      </main>
    </div>
  );
}

export default Orders;