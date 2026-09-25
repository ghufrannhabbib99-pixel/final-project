import "./Users.css";

function Users() {
  const users = [];

  return (
    <div className="admin-users min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="users-main">

        {/* Header */}
        <header className="users-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Users Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Manage users and control their access to the platform.
            </p>
          </div>

          <div className="users-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Users
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {users.length}
            </p>
          </div>

        </header>

        {/* Search */}
        <section className="users-toolbar rounded-2xl bg-white shadow-sm">

          <div className="users-search">

            <label
              htmlFor="user-search"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Search Users
            </label>

            <input
              id="user-search"
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/35 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            />

          </div>

        </section>

        {/* Users Table */}
        <section className="users-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="users-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Users
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Users
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {users.length} users
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Name
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Role
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

                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="users-empty-state text-center"
                    >
                      <div className="flex flex-col items-center justify-center">

                        <div className="users-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ♙
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No users available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Users will appear here once they are added.
                        </p>

                      </div>
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {user.name}
                      </td>

                      <td className="px-6 py-5">
                        {user.email}
                      </td>

                      <td className="px-6 py-5">
                        {user.role}
                      </td>

                      <td className="px-6 py-5">
                        {user.status}
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

export default Users;