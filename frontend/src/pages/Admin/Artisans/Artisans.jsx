import "./Artisans.css";

function Artisans() {
  const artisans = [];

  return (
    <div className="admin-artisans min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="artisans-main">

        {/* Header */}
        <header className="artisans-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Artisans Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Manage artisans and review their marketplace activity.
            </p>
          </div>

          <div className="artisans-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Artisans
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {artisans.length}
            </p>
          </div>

        </header>

        {/* Search and Filter */}
        <section className="artisans-toolbar rounded-2xl bg-white shadow-sm">

          <div className="artisans-search">

            <label
              htmlFor="artisan-search"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Search Artisans
            </label>

            <input
              id="artisan-search"
              type="text"
              placeholder="Search by name or email..."
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/35 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            />

          </div>

          <div className="artisans-filter">

            <label
              htmlFor="artisan-status"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Status
            </label>

            <select
              id="artisan-status"
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            >
              <option value="all">
                All Status
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
            </select>

          </div>

        </section>

        {/* Artisans Table */}
        <section className="artisans-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="artisans-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Artisans
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Artisans
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {artisans.length} artisans
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Artisan
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Email
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Craft
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

                {artisans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="artisans-empty-state text-center"
                    >
                      <div className="flex flex-col items-center justify-center">

                        <div className="artisans-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ♢
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No artisans available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Artisans will appear here once they are registered.
                        </p>

                      </div>
                    </td>
                  </tr>
                ) : (
                  artisans.map((artisan) => (
                    <tr
                      key={artisan.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {artisan.name}
                      </td>

                      <td className="px-6 py-5">
                        {artisan.email}
                      </td>

                      <td className="px-6 py-5">
                        {artisan.craft}
                      </td>

                      <td className="px-6 py-5">
                        {artisan.status}
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

export default Artisans;