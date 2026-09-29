import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";
import productImages from "../../data/productImages";
import "./ArtisanProfile.css";

const artisanImages = {
  "خزاف عراقي": "/images/artisans/potter.jpg",
  "نجار عراقي": "/images/artisans/carpenter.jpg",
  "خياط عراقي": "/images/artisans/tailor.jpg",
  "صانع سعف عراقي": "/images/artisans/palm-artisan.jpg",
  "مطرزة عراقية": "/images/artisans/embroiderer.jpg",
  "صانع نحاس عراقي": "/images/artisans/coppersmith.jpg",
};

function ArtisanProfile() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadArtisan = async () => {
      try {
        setLoading(true);
        setError("");

        const [artisanResponse, productsResponse] =
          await Promise.all([
            api.artisans.getById(id),
            api.products.getByArtisan(id),
          ]);

        const artisanData =
          artisanResponse?.data || artisanResponse;

        const productsData =
          productsResponse?.data || productsResponse || [];

        const normalizedProducts = Array.isArray(productsData)
          ? productsData
          : [];

        const uniqueProducts = normalizedProducts.filter(
          (product, index, array) =>
            index ===
            array.findIndex(
              (item) =>
                Number(item.id) === Number(product.id)
            )
        );

        setArtisan(artisanData);
        setProducts(uniqueProducts);
      } catch (err) {
        console.error("Failed to load artisan:", err);
        setError("تعذر تحميل معلومات الحرفي.");
      } finally {
        setLoading(false);
      }
    };

    loadArtisan();
  }, [id]);

  const addToCart = (product) => {
    try {
      const cart = JSON.parse(
        localStorage.getItem("cart")
      ) || [];

      const existingItem = cart.find(
        (item) => Number(item.id) === Number(product.id)
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      alert("تمت إضافة المنتج إلى السلة 🛒");
    } catch (err) {
      console.error("Failed to add product to cart:", err);
      alert("صار خطأ أثناء إضافة المنتج للسلة.");
    }
  };

  if (loading) {
    return (
      <main className="artisan-profile-page artisan-profile-loading">
        <div className="artisan-profile-orb artisan-profile-orb-one" />
        <div className="artisan-profile-orb artisan-profile-orb-two" />

        <div className="artisan-profile-loading-container">
          <div className="artisan-loading-hero">
            <div className="artisan-skeleton artisan-skeleton-image" />

            <div className="artisan-loading-content">
              <div className="artisan-skeleton artisan-skeleton-small" />
              <div className="artisan-skeleton artisan-skeleton-title" />
              <div className="artisan-skeleton artisan-skeleton-line" />
              <div className="artisan-skeleton artisan-skeleton-line short" />

              <div className="artisan-loading-stats">
                <div className="artisan-skeleton artisan-skeleton-stat" />
                <div className="artisan-skeleton artisan-skeleton-stat" />
                <div className="artisan-skeleton artisan-skeleton-stat" />
              </div>
            </div>
          </div>

          <div className="artisan-skeleton-section">
            <div className="artisan-skeleton artisan-skeleton-heading" />
            <div className="artisan-skeleton artisan-skeleton-line" />
            <div className="artisan-skeleton artisan-skeleton-line" />
            <div className="artisan-skeleton artisan-skeleton-line short" />
          </div>
        </div>
      </main>
    );
  }

  if (error || !artisan) {
    return (
      <main className="artisan-profile-page artisan-profile-error-page">
        <div className="artisan-profile-error-card">
          <div className="artisan-error-icon">𒀭</div>

          <span>ALHERFA</span>

          <h1>تعذر تحميل الصفحة</h1>

          <p>
            {error ||
              "ما قدرنا نلقى معلومات الحرفي المطلوبة."}
          </p>

          <button
            onClick={() => navigate("/artisans")}
            className="artisan-error-button"
          >
            <span>←</span>
            العودة إلى الحرفيين
          </button>
        </div>
      </main>
    );
  }

  const profileImage =
    artisan?.profile_image ||
    artisan?.image ||
    artisanImages[artisan?.craft_name] ||
    null;

  const specialties =
    artisan?.specialties ||
    artisan?.skills ||
    artisan?.bio ||
    "صناعة يدوية عراقية أصيلة";

  return (
    <main className="artisan-profile-page">
      <div className="artisan-profile-orb artisan-profile-orb-one" />
      <div className="artisan-profile-orb artisan-profile-orb-two" />

      <div className="artisan-profile-cuneiform artisan-cuneiform-one">
        𒀭
      </div>

      <div className="artisan-profile-cuneiform artisan-cuneiform-two">
        𒂗
      </div>

      <section className="artisan-profile-hero">
        <div className="artisan-profile-pattern artisan-pattern-one" />
        <div className="artisan-profile-pattern artisan-pattern-two" />

        <div className="artisan-profile-container">
          <button
            onClick={() => navigate("/artisans")}
            className="artisan-back-button"
          >
            <span>←</span>
            العودة إلى الحرفيين
          </button>

          <div className="artisan-hero-grid">
            <div className="artisan-hero-image-column">
              <div className="artisan-image-frame">
                <div className="artisan-image-glow" />

                <div className="artisan-image-inner">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={artisan.name}
                      className="artisan-main-image"
                    />
                  ) : (
                    <div className="artisan-image-placeholder">
                      <span>𒀭</span>
                      <p>AlHerfa</p>
                    </div>
                  )}
                </div>

                <div className="artisan-image-corner corner-top" />
                <div className="artisan-image-corner corner-bottom" />

                <div className="artisan-image-badge">
                  <span>✦</span>
                  حرفي عراقي
                </div>
              </div>
            </div>

            <div className="artisan-hero-content">
              <div className="artisan-hero-kicker">
                <span className="kicker-line" />
                ALHERFA ARTISAN
                <span className="kicker-line" />
              </div>

              <div className="artisan-craft-pill">
                <span>✧</span>
                {artisan.craft_name || "حرف يدوية"}
              </div>

              <h1 className="artisan-profile-title">
                {artisan.name}
              </h1>

              <div className="artisan-title-line">
                <span />
                <b>𒀭</b>
                <span />
              </div>

              <p className="artisan-profile-bio">
                {artisan.bio ||
                  "حرفي عراقي يقدّم أعمالاً يدوية تجمع بين التراث والأصالة والتفاصيل المعاصرة."}
              </p>

              <div className="artisan-hero-stats">
                <div className="artisan-stat-card">
                  <span className="artisan-stat-icon">⌖</span>

                  <div>
                    <small>الموقع</small>
                    <strong>
                      {artisan.city || "العراق"}
                    </strong>
                  </div>
                </div>

                <div className="artisan-stat-card">
                  <span className="artisan-stat-icon">✦</span>

                  <div>
                    <small>الخبرة</small>
                    <strong>
                      {artisan.experience_years ||
                        artisan.experience ||
                        "عدة سنوات"}
                    </strong>
                  </div>
                </div>

                <div className="artisan-stat-card">
                  <span className="artisan-stat-icon">◇</span>

                  <div>
                    <small>المنتجات</small>
                    <strong>{products.length}</strong>
                  </div>
                </div>
              </div>

              <div className="artisan-hero-actions">
                <button
                  onClick={() => {
                    document
                      .getElementById("artisan-products")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      });
                  }}
                  className="artisan-primary-button"
                >
                  استكشف الأعمال
                  <span>↓</span>
                </button>

                <button
                  onClick={() => navigate("/artisans")}
                  className="artisan-secondary-button"
                >
                  كل الحرفيين
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="artisan-scroll-indicator">
          <span />
          اسحب للأسفل
        </div>
      </section>

      <section className="artisan-about-section">
        <div className="artisan-profile-container">
          <div className="artisan-section-heading">
            <div>
              <span>THE STORY</span>
              <h2>عن الحرفي</h2>
            </div>

            <div className="artisan-section-symbol">
              𒀭
            </div>
          </div>

          <div className="artisan-about-grid">
            <article className="artisan-story-card artisan-story-main">
              <div className="story-card-number">01</div>

              <span className="story-card-kicker">
                ABOUT THE ARTISAN
              </span>

              <h3>
                حكاية تُروى من خلال
                <span> الحرفة</span>
              </h3>

              <p>
                {artisan.bio ||
                  `${artisan.name} يعمل في مجال ${artisan.craft_name || "الحرف اليدوية"}، ويجمع بين المهارة اليدوية والاهتمام بالتفاصيل للحفاظ على روح الحرفة العراقية.`}
              </p>

              <div className="story-card-decoration">
                <span />
                <b>✦</b>
                <span />
              </div>
            </article>

            <article className="artisan-story-card artisan-story-side">
              <div className="story-card-number">02</div>

              <span className="story-card-kicker">
                SPECIALTIES
              </span>

              <h3>مجالات التخصص</h3>

              <p>{specialties}</p>

              <div className="specialty-list">
                <div>
                  <span>✧</span>
                  {artisan.craft_name || "حرفة يدوية"}
                </div>

                <div>
                  <span>✧</span>
                  صناعة يدوية
                </div>

                <div>
                  <span>✧</span>
                  تراث عراقي
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="artisan-process-section">
        <div className="artisan-profile-container">
          <div className="artisan-section-heading centered">
            <div>
              <span>CRAFT PROCESS</span>
              <h2>أسلوب العمل</h2>
            </div>
          </div>

          <div className="artisan-process-grid">
            <article className="artisan-process-card">
              <div className="process-number">01</div>
              <div className="process-icon">◇</div>

              <h3>اختيار المواد</h3>

              <p>
                اختيار المواد المناسبة بعناية للحفاظ على جودة
                المنتج وروحه الأصلية.
              </p>

              <span className="process-arrow">→</span>
            </article>

            <article className="artisan-process-card featured">
              <div className="process-number">02</div>
              <div className="process-icon">✦</div>

              <h3>صناعة يدوية</h3>

              <p>
                كل قطعة تُصنع باهتمام وتفاصيل دقيقة تعكس مهارة
                الحرفي وخبرته.
              </p>

              <span className="process-arrow">→</span>
            </article>

            <article className="artisan-process-card">
              <div className="process-number">03</div>
              <div className="process-icon">𒀭</div>

              <h3>اللمسة الأخيرة</h3>

              <p>
                مراجعة التفاصيل النهائية حتى تصل القطعة بشكل
                يليق بالحرفة العراقية.
              </p>

              <span className="process-arrow">→</span>
            </article>
          </div>
        </div>
      </section>

      <section
        id="artisan-products"
        className="artisan-products-section"
      >
        <div className="artisan-profile-container">
          <div className="artisan-section-heading">
            <div>
              <span>HANDCRAFTED COLLECTION</span>
              <h2>أعمال الحرفي</h2>
            </div>

            <div className="artisan-products-count">
              {products.length}
              <span>منتج</span>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="artisan-no-products">
              <div>𒀭</div>
              <h3>لا توجد منتجات حالياً</h3>
              <p>
                لم تتم إضافة منتجات لهذا الحرفي بعد.
              </p>
            </div>
          ) : (
            <div className="artisan-products-grid">
              {products.map((product, index) => {
                const image =
                  product.image ||
                  productImages[product.id] ||
                  productImages[product.name] ||
                  null;

                return (
                  <article
                    key={product.id}
                    className="artisan-product-card"
                    style={{
                      animationDelay: `${index * 0.08}s`,
                    }}
                  >
                    <div className="artisan-product-image">
                      {image ? (
                        <img
                          src={image}
                          alt={product.name}
                        />
                      ) : (
                        <div className="artisan-product-placeholder">
                          𒀭
                        </div>
                      )}

                      <span className="artisan-product-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      {product.stock_quantity <= 0 && (
                        <span className="artisan-out-of-stock">
                          نفد المخزون
                        </span>
                      )}

                      <div className="artisan-product-overlay">
                        <button
                          onClick={() =>
                            navigate(
                              `/products/${product.id}`
                            )
                          }
                        >
                          عرض التفاصيل
                          <span>→</span>
                        </button>
                      </div>
                    </div>

                    <div className="artisan-product-content">
                      <span className="artisan-product-label">
                        HANDCRAFTED
                      </span>

                      <h3>{product.name}</h3>

                      {product.description && (
                        <p>
                          {product.description}
                        </p>
                      )}

                      <div className="artisan-product-bottom">
                        <div className="artisan-product-price">
                          <small>السعر</small>
                          <strong>
                            {Number(
                              product.price
                            ).toLocaleString()}{" "}
                            IQD
                          </strong>
                        </div>

                        <button
                          onClick={() =>
                            addToCart(product)
                          }
                          disabled={
                            product.stock_quantity <= 0
                          }
                          className="artisan-add-cart"
                        >
                          <span>+</span>
                          أضف للسلة
                        </button>
                      </div>

                      {product.stock_quantity > 0 && (
                        <div className="artisan-stock-line">
                          <span />
                          {product.stock_quantity} متوفر
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="artisan-final-cta">
        <div className="artisan-cta-pattern" />

        <div className="artisan-profile-container">
          <div className="artisan-cta-content">
            <span>SUPPORT IRAQI CRAFTSMANSHIP</span>

            <h2>
              كل قطعة تحمل
              <br />
              <strong>حكاية عراقية</strong>
            </h2>

            <p>
              اكتشف المزيد من الحرفيين والأعمال اليدوية
              الأصيلة على الحرفا.
            </p>

            <button
              onClick={() => navigate("/artisans")}
              className="artisan-cta-button"
            >
              استكشف جميع الحرفيين
              <span>→</span>
            </button>
          </div>

          <div className="artisan-cta-symbol">
            𒀭
          </div>
        </div>
      </section>
    </main>
  );
}

export default ArtisanProfile;