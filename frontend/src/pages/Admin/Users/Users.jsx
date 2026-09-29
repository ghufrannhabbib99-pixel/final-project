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
              Administration
            </div>

            <h1>
              Users <span>Management</span>
            </h1>

            <p>
              Manage users and control their access to the AlHerfa
              marketplace.
            </p>
          </div>

          <div className="users-count">
            <div className="users-count-icon">♙</div>

            <div className="users-count-content">
              <span>Total Users</span>
              <strong>{users.length}</strong>
            </div>
          </div>
        </header>

        {/* Search */}
        <section className="users-toolbar">
          <div className="users-toolbar-heading">
            <div className="users-search-symbol">⌕</div>

            <div>
              <span>User Directory</span>
              <h2>Find Users</h2>
            </div>
          </div>

          <div className="users-search">
            <label htmlFor="user-search">Search Users</label>

            <div className="users-input-wrapper">
              <span>⌕</span>

              <input
                id="user-search"
                type="text"
                placeholder="Search by name or email..."
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
                Users
              </div>

              <h2>All Users</h2>
            </div>

            <div className="users-result-count">
              <strong>{users.length}</strong>
              <span>users</span>
            </div>
          </div>

          <div className="users-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
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
                          <h3>No users available yet</h3>

                          <p>
                            Users will appear here once they are added
                            to the platform.
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

        {/* Footer */}
        <div className="users-footer-note">
          <span>✦</span>

          <p>
            AlHerfa connects people with authentic Iraqi craftsmanship.
          </p>

          <span>✦</span>
        </div>
      </main>
    </div>
  );
}

export default Users;