import "./Categories.css";

function Categories() {
  const categories = [];

  return (
    <div className="admin-categories min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="categories-main">

        {/* Header */}
        <header className="categories-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Categories Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Manage product categories available on the marketplace.
            </p>
          </div>

          <div className="categories-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Categories
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {categories.length}
            </p>
          </div>

        </header>

        {/* Categories Table */}
        <section className="categories-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="categories-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Categories
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Categories
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {categories.length} categories
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Products
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

                {categories.length === 0 ? (
                  <tr>

                    <td
                      colSpan="4"
                      className="categories-empty-state text-center"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div className="categories-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ◆
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No categories available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Categories will appear here once they are added.
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : (

                  categories.map((category) => (

                    <tr
                      key={category.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {category.name}
                      </td>

                      <td className="px-6 py-5">
                        {category.productsCount}
                      </td>

                      <td className="px-6 py-5">
                        {category.status}
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

export default Categories;