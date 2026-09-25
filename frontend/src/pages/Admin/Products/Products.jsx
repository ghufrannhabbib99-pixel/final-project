import "./Products.css";

function Products() {
  const products = [];

  return (
    <div className="admin-products min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="products-main">

        {/* Header */}
        <header className="products-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Products Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Manage products listed by artisans on the marketplace.
            </p>
          </div>

          <div className="products-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Products
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {products.length}
            </p>
          </div>

        </header>

        {/* Search and Filters */}
        <section className="products-toolbar rounded-2xl bg-white shadow-sm">

          <div className="products-search">

            <label
              htmlFor="product-search"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Search Products
            </label>

            <input
              id="product-search"
              type="text"
              placeholder="Search by product name..."
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/35 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            />

          </div>

          <div className="products-filter">

            <label
              htmlFor="product-category"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Category
            </label>

            <select
              id="product-category"
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            >
              <option value="all">
                كل الفئات
              </option>

              <option value="pottery">
                فخار
              </option>

              <option value="weaving">
                نسيج
              </option>

              <option value="copper">
                نحاس
              </option>

              <option value="jewelry">
                مجوهرات
              </option>
            </select>

          </div>

          <div className="products-filter">

            <label
              htmlFor="product-status"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Status
            </label>

            <select
              id="product-status"
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            >
              <option value="all">
                All Status
              </option>

              <option value="active">
                Available
              </option>

              <option value="inactive">
                Unavailable
              </option>
            </select>

          </div>

        </section>

        {/* Products Table */}
        <section className="products-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="products-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Products
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Products
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {products.length} products
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Product
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Artisan
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Category
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Price
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

                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="products-empty-state text-center"
                    >
                      <div className="flex flex-col items-center justify-center">

                        <div className="products-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ▣
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No products available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Products will appear here once artisans add them.
                        </p>

                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {product.name}
                      </td>

                      <td className="px-6 py-5">
                        {product.artisan}
                      </td>

                      <td className="px-6 py-5">
                        {product.category}
                      </td>

                      <td className="px-6 py-5">
                        {product.price}
                      </td>

                      <td className="px-6 py-5">
                        {product.status}
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

export default Products;