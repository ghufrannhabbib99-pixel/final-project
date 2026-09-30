import { Search, Star, MessageSquare, Eye, EyeOff } from "lucide-react";
import "./Reviews.css";

function Reviews() {
  const reviews = [];

  return (
    <div className="admin-reviews">
      {/* Decorative background */}
      <div className="reviews-orb reviews-orb-one" />
      <div className="reviews-orb reviews-orb-two" />

      <div className="reviews-cuneiform reviews-cuneiform-one">𒀭</div>
      <div className="reviews-cuneiform reviews-cuneiform-two">𒂍</div>

      <main className="reviews-main">
        {/* Header */}
        <header className="reviews-header">
          <div className="reviews-title-block">
            <div className="reviews-kicker">
              <span />
              الإدارة
            </div>

            <h1>إدارة التقييمات</h1>

            <p>
              مراجعة آراء العملاء وإدارة تقييمات المنتجات من مكان واحد.
            </p>
          </div>

          <div className="reviews-count">
            <div className="reviews-count-icon">
              <Star size={19} fill="currentColor" />
            </div>

            <div>
              <span>إجمالي التقييمات</span>
              <strong>{reviews.length}</strong>
            </div>
          </div>
        </header>

        {/* Toolbar */}
        <section className="reviews-toolbar">
          <div className="reviews-search">
            <label htmlFor="review-search">البحث في التقييمات</label>

            <div className="reviews-input-wrap">
              <Search size={18} />

              <input
                id="review-search"
                type="text"
                placeholder="ابحث باسم العميل أو المنتج..."
              />
            </div>
          </div>

          <div className="reviews-filter">
            <label htmlFor="review-status">الحالة</label>

            <select id="review-status">
              <option value="all">جميع الحالات</option>
              <option value="visible">ظاهر</option>
              <option value="hidden">مخفي</option>
            </select>
          </div>
        </section>

        {/* Reviews */}
        <section className="reviews-table-wrapper">
          <div className="reviews-table-header">
            <div>
              <div className="reviews-section-kicker">
                <MessageSquare size={14} />
                آراء العملاء
              </div>

              <h2>جميع التقييمات</h2>
            </div>

            <div className="reviews-total">
              {reviews.length} تقييم
            </div>
          </div>

          <div className="reviews-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>العميل</th>
                  <th>المنتج</th>
                  <th>التقييم</th>
                  <th>المراجعة</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {reviews.length === 0 ? (
                  <tr>
                    <td colSpan="6">
                      <div className="reviews-empty-state">
                        <div className="reviews-empty-icon">
                          <Star size={27} />
                        </div>

                        <h3>لا توجد تقييمات بعد</h3>

                        <p>
                          ستظهر تقييمات العملاء هنا بعد إرسالها.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  reviews.map((review) => (
                    <tr key={review.id}>
                      <td>
                        <span className="review-customer">
                          {review.customer}
                        </span>
                      </td>

                      <td>{review.product}</td>

                      <td>
                        <div className="review-rating">
                          <Star size={15} fill="currentColor" />
                          {review.rating}
                        </div>
                      </td>

                      <td>
                        <span className="review-comment">
                          {review.comment}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`review-status ${
                            review.status === "hidden"
                              ? "is-hidden"
                              : "is-visible"
                          }`}
                        >
                          {review.status === "hidden" ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}

                          {review.status}
                        </span>
                      </td>

                      <td>
                        <div className="review-actions">
                          الإجراءات
                        </div>
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