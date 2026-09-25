import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import productImages from "../../data/productImages";

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

  const profileImage =
    artisan?.profile_image ||
    artisan?.image ||
    artisanImages[artisan?.craft_name] ||
    null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        // جلب بيانات الحرفي
        const artisanResponse = await axios.get(
          `http://localhost:5000/api/artisans/${id}`
        );

        // جلب منتجات الحرفي
        const productsResponse = await axios.get(
          `http://localhost:5000/api/products/artisan/${id}`
        );

        const artisanData = artisanResponse.data.data;

        setArtisan(artisanData);

        const productsData =
          productsResponse.data.data ||
          productsResponse.data ||
          [];

        // منع تكرار المنتجات حسب id
        const uniqueProducts = productsData.filter(
          (product, index, self) =>
            index ===
            self.findIndex(
              (item) => item.id === product.id
            )
        );

        setProducts(uniqueProducts);
      } catch (error) {
        console.error(error);
        setError("حدث خطأ أثناء تحميل بيانات الحرفي");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // إضافة المنتج إلى السلة
  const addToCart = (product) => {
    try {
      const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

      const existingProduct = cart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
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
    } catch (error) {
      console.error("Cart Error:", error);
      alert("حدث خطأ أثناء إضافة المنتج إلى السلة");
    }
  };

  // Loading
  if (loading) {
    return (
      <main
        dir="rtl"
        className="min-h-screen bg-[#FDF0D5] px-6 py-10"
      >
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-96 rounded-3xl bg-gray-200" />

          <div className="mt-8 h-10 w-64 rounded-lg bg-gray-200" />

          <div className="mt-4 h-6 w-full max-w-2xl rounded-lg bg-gray-200" />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-72 rounded-3xl bg-gray-200"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  // Error
  if (error || !artisan) {
    return (
      <main
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-6"
      >
        <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="mb-5 text-6xl">
            😔
          </div>

          <h1 className="text-2xl font-bold text-[#003049]">
            {error || "الحرفي غير موجود"}
          </h1>

          <button
            onClick={() => navigate("/artisans")}
            className="mt-6 rounded-2xl bg-[#780000] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
          >
            العودة للحرفيين
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className="min-h-screen bg-[#FDF0D5]"
    >
      {/* Hero */}
      <section className="px-6 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-10 rounded-3xl bg-[#003049] p-8 shadow-2xl md:p-12 lg:grid-cols-2">

            {/* Artisan Image */}
            <div className="flex items-center justify-center">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={
                    artisan.artisan_name ||
                    artisan.craft_name
                  }
                  className="h-80 w-80 rounded-3xl object-cover shadow-2xl"
                />
              ) : (
                <div className="flex h-80 w-80 items-center justify-center rounded-3xl bg-[#669BBC] text-7xl shadow-2xl">
                  🧑‍🎨
                </div>
              )}
            </div>

            {/* Artisan Info */}
            <div className="text-right text-white">
              <p className="mb-3 text-lg font-semibold text-[#669BBC]">
                حرفي عراقي
              </p>

              <h1 className="text-4xl font-bold md:text-5xl">
                {artisan.artisan_name || "حرفي عراقي"}
              </h1>

              <p className="mt-4 text-2xl font-semibold text-[#FDF0D5]">
                {artisan.craft_name}
              </p>

              {artisan.city && (
                <p className="mt-4 text-lg text-gray-200">
                  📍 {artisan.city}
                </p>
              )}

              {artisan.bio && (
                <p className="mt-6 text-lg leading-9 text-gray-200">
                  {artisan.bio}
                </p>
              )}

              <button
                onClick={() => navigate("/artisans")}
                className="mt-8 rounded-2xl bg-[#780000] px-7 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
              >
                العودة للحرفيين
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Artisan */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#003049]">
              عن الحرفي
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#780000]" />
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
            <p className="text-lg leading-10 text-gray-700">
              {artisan.bio ||
                `يتميز ${
                  artisan.artisan_name || "هذا الحرفي"
                } بخبرة في مجال ${
                  artisan.craft_name ||
                  "الحرف اليدوية العراقية"
                } ويقدم منتجات مصنوعة بعناية تحافظ على روح التراث العراقي.`}
            </p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#003049]">
              قصة الحرفي
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#780000]" />
          </div>

          <div className="rounded-3xl bg-[#003049] p-8 text-white shadow-xl md:p-10">
            <p className="text-lg leading-10 text-gray-200">
              {artisan.craft_name === "خزاف عراقي" &&
                "بدأ شغفه بالفخار من حبّه للطين وتحويله إلى قطع تحمل روح التراث العراقي. يعمل على تشكيل كل قطعة يدوياً، من المزاني إلى الأواني والأطباق، مع المحافظة على الطابع الأصيل للفخار العراقي."}

              {artisan.craft_name === "نجار عراقي" &&
                "يمتلك شغفاً خاصاً بالخشب وفن النجارة اليدوية. يحوّل قطع الخشب إلى منتجات عملية وجميلة تجمع بين التصميم التقليدي والدقة في العمل، مستلهماً أفكاره من التراث العراقي."}

              {artisan.craft_name === "خياط عراقي" &&
                "تجمع أعماله بين مهارة الخياطة ودقة اختيار الأقمشة والتفاصيل. يهتم بإحياء التصاميم العراقية التقليدية وإضافة لمسات يدوية تجعل كل قطعة مختلفة وتحمل طابعاً خاصاً."}

              {artisan.craft_name === "صانع سعف عراقي" &&
                "استلهم حرفته من النخلة العراقية وما تقدمه من سعف قابل للتحويل إلى منتجات جميلة ومفيدة. يعمل يدوياً على صناعة السلال والحصر وقطع الزينة، محافظاً على حرفة ارتبطت بالحياة العراقية منذ أجيال."}

              {artisan.craft_name === "مطرزة عراقية" &&
                "تعكس أعمالها جمال التطريز العراقي من خلال الألوان والنقوش والتفاصيل الدقيقة. كل غرزة تضيف جزءاً من الحكاية، وتسعى من خلال عملها إلى إبقاء فن التطريز حاضراً في الحياة اليومية."}

              {artisan.craft_name === "صانع نحاس عراقي" &&
                "يعمل في واحدة من أقدم الحرف المرتبطة بالأسواق العراقية. يحوّل النحاس إلى قطع فنية من خلال الطرق والنقش اليدوي، محافظاً على تفاصيل الزخارف التقليدية التي تميز المنتجات النحاسية العراقية."}

              {![
                "خزاف عراقي",
                "نجار عراقي",
                "خياط عراقي",
                "صانع سعف عراقي",
                "مطرزة عراقية",
                "صانع نحاس عراقي",
              ].includes(artisan.craft_name) &&
                `الحرف اليدوية العراقية جزء من الذاكرة والتراث والثقافة. ومن خلال عمله في ${
                  artisan.craft_name || "الحرف اليدوية"
                }، يساهم ${
                  artisan.artisan_name || "هذا الحرفي"
                } في الحفاظ على هذه المهنة ونقلها إلى الأجيال القادمة.`}
            </p>
          </div>
        </div>
      </section>

      {/* Specialties */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#003049]">
              التخصصات
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#780000]" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">🎨</div>

              <h3 className="mt-5 text-xl font-bold text-[#003049]">
                حرفة عراقية
              </h3>

              <p className="mt-3 leading-8 text-gray-600">
                صناعة يدوية مستوحاة من التراث العراقي.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">👐</div>

              <h3 className="mt-5 text-xl font-bold text-[#003049]">
                صناعة يدوية
              </h3>

              <p className="mt-3 leading-8 text-gray-600">
                كل قطعة يتم تنفيذها بعناية واهتمام بالتفاصيل.
              </p>
            </div>

            <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1">
              <div className="text-5xl">🇮🇶</div>

              <h3 className="mt-5 text-xl font-bold text-[#003049]">
                تراث عراقي
              </h3>

              <p className="mt-3 leading-8 text-gray-600">
                الحفاظ على الهوية والتراث من خلال الحرفة.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Style */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#003049]">
              أسلوب العمل
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#780000]" />
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-xl md:p-10">
            <div className="grid gap-8 md:grid-cols-3">

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF0D5] text-xl font-bold text-[#003049]">
                  01
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#003049]">
                  اختيار المواد
                </h3>

                <p className="mt-3 leading-8 text-gray-600">
                  اختيار المواد المناسبة بعناية قبل البدء بالعمل.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF0D5] text-xl font-bold text-[#003049]">
                  02
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#003049]">
                  العمل اليدوي
                </h3>

                <p className="mt-3 leading-8 text-gray-600">
                  تنفيذ كل قطعة يدوياً مع الاهتمام بالتفاصيل.
                </p>
              </div>

              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF0D5] text-xl font-bold text-[#003049]">
                  03
                </div>

                <h3 className="mt-4 text-xl font-bold text-[#003049]">
                  القطعة النهائية
                </h3>

                <p className="mt-3 leading-8 text-gray-600">
                  تقديم قطعة فريدة تحمل روح الحرفة العراقية.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <h2 className="text-4xl font-bold text-[#003049]">
              منتجات الحرفي
            </h2>

            <div className="mt-3 h-1 w-24 rounded-full bg-[#780000]" />
          </div>

          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => {
                const productImage =
                  product.image ||
                  productImages[product.name] ||
                  null;

                const stock = Number(
                  product.stock ??
                  product.stock_quantity ??
                  product.quantity ??
                  0
                );

                return (
                  <div
                    key={product.id}
                    className="overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2"
                  >

                    {/* Product Image */}
                    <div className="h-64 overflow-hidden bg-[#FDF0D5]">
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-7xl">
                          🛍️
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">

                      <h3 className="text-xl font-bold text-[#003049]">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="mt-3 line-clamp-3 leading-7 text-gray-600">
                          {product.description}
                        </p>
                      )}

                      {/* Price + Stock */}
                      <div className="mt-5 flex items-center justify-between gap-3">
                        <span className="text-xl font-bold text-[#780000]">
                          {Number(
                            product.price || 0
                          ).toLocaleString()}{" "}
                          د.ع
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-sm font-semibold ${
                            stock > 0
                              ? "bg-[#FDF0D5] text-[#003049]"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {stock > 0
                            ? `متوفر: ${stock}`
                            : "نفذت الكمية"}
                        </span>
                      </div>

                      {/* Add To Cart */}
                      <button
                        onClick={() => addToCart(product)}
                        disabled={stock <= 0}
                        className="mt-5 w-full rounded-2xl bg-[#780000] px-5 py-3 font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-[#C1121F] disabled:cursor-not-allowed disabled:bg-gray-400 disabled:hover:translate-y-0"
                      >
                        {stock > 0
                          ? "إضافة إلى السلة 🛒"
                          : "نفذت الكمية"}
                      </button>

                    </div>
                  </div>
                );
              })}

            </div>
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-xl">
              <div className="text-6xl">🛍️</div>

              <h3 className="mt-5 text-2xl font-bold text-[#003049]">
                لا توجد منتجات حالياً
              </h3>

              <p className="mt-3 text-gray-600">
                سيتم إضافة منتجات هذا الحرفي قريباً.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-[#003049] p-10 text-center text-white shadow-2xl md:p-14">

            <h2 className="text-3xl font-bold md:text-4xl">
              ادعم الحرف العراقية
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-9 text-gray-200">
              عندما تشتري من الحرفيين المحليين، أنت لا تشتري منتجاً
              فقط، بل تساهم في الحفاظ على حرفة وتراث عراقي أصيل.
            </p>

            <button
              onClick={() => navigate("/artisans")}
              className="mt-8 rounded-2xl bg-[#780000] px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
            >
              استكشف باقي الحرفيين
            </button>

          </div>
        </div>
      </section>
    </main>
  );
}

export default ArtisanProfile;