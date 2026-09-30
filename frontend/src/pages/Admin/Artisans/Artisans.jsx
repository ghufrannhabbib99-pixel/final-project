import "./Artisans.css";

function Artisans() {
  const artisans = [];

  return (
    <div className="admin-artisans">
      {/* Decorative background */}
      <div className="artisans-orb artisans-orb-one" />
      <div className="artisans-orb artisans-orb-two" />
      <div className="artisans-cuneiform artisans-cuneiform-one">𒀭</div>
      <div className="artisans-cuneiform artisans-cuneiform-two">𒂗</div>

      <main className="artisans-main">
        {/* Header */}
        <header className="artisans-header">
          <div className="artisans-header-content">
            <div className="artisans-kicker">
              <span className="artisans-kicker-line" />
              الإدارة
            </div>

            <h1>إدارة الحرفيين</h1>

            <p>
              إدارة الحرفيين ومراجعة نشاطهم في المنصة.
            </p>
          </div>

          <div className="artisans-count">
            <div className="artisans-count-icon">♢</div>

            <div>
              <span>إجمالي الحرفيين</span>
              <strong>{artisans.length}</strong>
            </div>
          </div>
        </header>

        {/* Search and Filter */}
        <section className="artisans-toolbar">
          <div className="toolbar-decoration" />

          <div className="artisans-search">
            <label htmlFor="artisan-search">
              البحث عن الحرفيين
            </label>

            <div className="artisans-input-wrap">
              <span className="artisans-input-icon">⌕</span>

              <input
                id="artisan-search"
                type="text"
                placeholder="ابحث بالاسم أو البريد الإلكتروني..."
              />
            </div>
          </div>

          <div className="artisans-filter">
            <label htmlFor="artisan-status">
              الحالة
            </label>

            <div className="artisans-select-wrap">
              <select id="artisan-status">
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
              </select>

              <span className="select-arrow">⌄</span>
            </div>
          </div>
        </section>

        {/* Artisans Table */}
        <section className="artisans-table-wrapper">
          <div className="artisans-table-header">
            <div>
              <div className="section-kicker">
                <span />
                الحرفيون
              </div>

              <h2>جميع الحرفيين</h2>
            </div>

            <div className="artisans-result-count">
              <span>{artisans.length}</span>
              حرفي
            </div>
          </div>

          <div className="artisans-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>الحرفي</th>
                  <th>البريد الإلكتروني</th>
                  <th>الحرفة</th>
                  <th>الحالة</th>
                  <th>الإجراءات</th>
                </tr>
              </thead>

              <tbody>
                {artisans.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="artisans-empty-state"
                    >
                      <div className="artisans-empty-content">
                        <div className="artisans-empty-icon">
                          <span>♢</span>
                        </div>

                        <div className="artisans-empty-ring" />

                        <h3>لا يوجد حرفيون متاحون حالياً.</h3>

                        <p>
                          سيظهر الحرفيون هنا بعد تسجيلهم في المنصة.
                        </p>

                        <div className="artisans-empty-line">
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  artisans.map((artisan) => (
                    <tr key={artisan.id}>
                      <td>
                        <div className="artisan-table-person">
                          <div className="artisan-avatar">
                            {artisan.name?.charAt(0)}
                          </div>

                          <span>{artisan.name}</span>
                        </div>
                      </td>

                      <td>{artisan.email}</td>

                      <td>
                        <span className="artisan-craft">
                          {artisan.craft}
                        </span>
                      </td>

                      <td>
                        <span className="artisan-status">
                          {artisan.status}
                        </span>
                      </td>

                      <td>
                        <button
                          type="button"
                          className="artisan-action"
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

        {/* Footer note */}
        <div className="artisans-footer-note">
          <span className="footer-note-symbol">✦</span>

          <p>
            كل حرفي يضيف قطعة جديدة إلى قصة الحرف والصناعات
            العراقية.
          </p>

          <span className="footer-note-symbol">✦</span>
        </div>
      </main>
    </div>
  );
}

export default Artisans;