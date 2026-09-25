import "./Reviews.css";

function Reviews() {
  const reviews = [];

  return (
    <div className="admin-reviews min-h-screen bg-[#FDF0D5]">

      {/* Main Content */}
      <main className="reviews-main">

        {/* Header */}
        <header className="reviews-header">

          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#780000]">
              Administration
            </p>

            <h1 className="text-3xl font-bold text-[#003049]">
              Reviews Management
            </h1>

            <p className="mt-2 text-sm text-[#003049]/60">
              Review customer feedback and manage product reviews.
            </p>
          </div>

          <div className="reviews-count rounded-2xl bg-white shadow-sm">
            <p className="text-sm text-[#003049]/55">
              Total Reviews
            </p>

            <p className="mt-1 text-2xl font-bold text-[#003049]">
              {reviews.length}
            </p>
          </div>

        </header>

        {/* Search and Filters */}
        <section className="reviews-toolbar rounded-2xl bg-white shadow-sm">

          <div className="reviews-search">

            <label
              htmlFor="review-search"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Search Reviews
            </label>

            <input
              id="review-search"
              type="text"
              placeholder="Search by customer or product..."
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/35 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            />

          </div>

          <div className="reviews-filter">

            <label
              htmlFor="review-status"
              className="mb-2 block text-sm font-semibold text-[#003049]"
            >
              Status
            </label>

            <select
              id="review-status"
              className="w-full rounded-xl border border-[#003049]/15 bg-[#FDF0D5]/40 text-sm text-[#003049] outline-none transition focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
            >
              <option value="all">
                All Status
              </option>

              <option value="visible">
                Visible
              </option>

              <option value="hidden">
                Hidden
              </option>
            </select>

          </div>

        </section>

        {/* Reviews Table */}
        <section className="reviews-table-wrapper overflow-hidden rounded-2xl bg-white shadow-sm">

          <div className="reviews-table-header flex items-center justify-between">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#780000]">
                Reviews
              </p>

              <h2 className="mt-1 text-xl font-bold text-[#003049]">
                All Reviews
              </h2>
            </div>

            <p className="text-sm text-[#003049]/50">
              {reviews.length} reviews
            </p>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b border-[#003049]/10 bg-[#FDF0D5]/40">

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Customer
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Product
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Rating
                  </th>

                  <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-[#003049]/60">
                    Review
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

                {reviews.length === 0 ? (
                  <tr>

                    <td
                      colSpan="6"
                      className="reviews-empty-state text-center"
                    >

                      <div className="flex flex-col items-center justify-center">

                        <div className="reviews-empty-icon flex items-center justify-center rounded-full bg-[#FDF0D5] text-2xl text-[#780000]">
                          ★
                        </div>

                        <p className="mt-4 text-sm font-medium text-[#003049]">
                          No reviews available yet.
                        </p>

                        <p className="mt-1 text-sm text-[#003049]/50">
                          Customer reviews will appear here once they are submitted.
                        </p>

                      </div>

                    </td>

                  </tr>
                ) : (

                  reviews.map((review) => (

                    <tr
                      key={review.id}
                      className="border-b border-[#003049]/10 transition hover:bg-[#FDF0D5]/30"
                    >

                      <td className="px-6 py-5">
                        {review.customer}
                      </td>

                      <td className="px-6 py-5">
                        {review.product}
                      </td>

                      <td className="px-6 py-5">
                        {review.rating}
                      </td>

                      <td className="px-6 py-5">
                        {review.comment}
                      </td>

                      <td className="px-6 py-5">
                        {review.status}
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

export default Reviews;