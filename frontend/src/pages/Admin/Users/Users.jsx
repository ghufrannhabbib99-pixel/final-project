import "./Users.css";

function Users() {
  const users = [];

  return (
    <div className="admin-users min-h-screen bg-[#FDF0D5]">
      {/* Decorative elements */}
      <div className="users-orb users-orb-one" />
      <div className="users-orb users-orb-two" />

      <div className="users-cuneiform users-cuneiform-one">♙</div>
      <div className="users-cuneiform users-cuneiform-two">𒀭</div>

      <main className="users-main">
        {/* Header */}
        <header className="users-header">
          <div className="users-header-content">
            <div className="users-kicker">
              <span />
              الإدارة
            </div>

            <h1>
              المستخدمون <span>والإدارة</span>
            </h1>

            <p>
              إدارة المستخدمين والتحكم في صلاحيات وصولهم إلى منصة الحرفة.
            </p>
          </div>

          <div className="users-count">
            <div className="users-count-icon">♙</div>

            <div className="users-count-content">
              <span>إجمالي المستخدمين</span>
              <strong>{users.length}</strong>
            </div>
          </div>
        </header>

        {/* Search */}
        <section className="users-toolbar">
          <div className="users-toolbar-heading">
            <div className="users-search-symbol">⌕</div>

            <div>
              <span>دليل المستخدمين</span>
              <h2>البحث عن المستخدمين</h2>
            </div>
          </div>

          <div className="users-search">
            <label htmlFor="user-search">البحث عن المستخدمين</label>

            <div className="users-input-wrapper">
              <span>⌕</span>

              <input
                id="user-search"
                type="text"
                placeholder="ابحث بالاسم أو البريد الإلكتروني..."
              />
            </div>
          </div>
        </section>

        {/* Users Table */}
        <section className="users-table-wrapper">
          <div className="users-table-header">
            <div>
              <div className="users-section-kicker">
                <span />
                المستخدمون
              </div>

              <h2>جميع المستخدمين</h2>
            </div>

            <div className="users-result-count">
              <strong>{users.length}</strong>
              <span>مستخدم</span>
            </div>
          </div>

          <div className="users-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>الاسم</th>
                  <th>البريد الإلكتروني</th>
                  <th>الدور</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="5">
                      <div className="users-empty-state">
                        <div className="users-empty-icon">
                          <div className="users-empty-ring">
                            ♙
                          </div>
                        </div>

                        <div className="users-empty-content">
                          <h3>لا يوجد مستخدمون متاحون حالياً</h3>

                          <p>
                            سيظهر المستخدمون هنا بعد إضافتهم إلى المنصة.
                          </p>
                        </div>

                        <div className="users-empty-decoration">
                          <span>𒀭</span>
                          <span>◇</span>
                          <span>✦</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-name-cell">
                          <div className="user-avatar">
                            {user.name?.charAt(0)?.toUpperCase() || "U"}
                          </div>

                          <span>{user.name}</span>
                        </div>
                      </td>

                      <td>{user.email}</td>

                      <td>
                        <span className="user-role">
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span className="user-status">
                          {user.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="user-action-button"
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

        {/* Footer */}
        <div className="users-footer-note">
          <span>✦</span>

          <p>
            تربط الحرفة الناس بالحرف والصناعات العراقية الأصيلة.
          </p>

          <span>✦</span>
        </div>
      </main>
    </div>
  );
}

export default Users;