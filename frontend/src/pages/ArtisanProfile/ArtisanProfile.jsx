import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArtisanProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtisanData = async () => {
      try {
        setLoading(true);
        setError("");

        const [artisanResponse, productsResponse] =
          await Promise.all([
            fetch(`http://localhost:5000/api/artisans/${id}`),
            fetch(`http://localhost:5000/api/products/artisan/${id}`),
          ]);

        if (!artisanResponse.ok) {
          throw new Error("Failed to fetch artisan");
        }

        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }

        const artisanData = await artisanResponse.json();
        const productsData = await productsResponse.json();

        setArtisan(artisanData.data);

        setProducts(
          productsData.data || productsData || []
        );
      } catch (err) {
        console.error(err);
        setError("حدث خطأ أثناء تحميل بيانات الحرفي");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [id]);

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      if (
        existingProduct.quantity <
        product.stock_quantity
      ) {
        existingProduct.quantity += 1;
      } else {
        alert("لا توجد كمية إضافية من هذا المنتج");
        return;
      }
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    alert("تمت إضافة المنتج إلى السلة 🛒");
  };

  if (loading) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-[#FDF0D5] px-6 py-10"
      >
        <div className="mx-auto max-w-6xl animate-pulse">
          <div className="mb-8 h-10 w-64 rounded-xl bg-gray-300" />

          <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
            <div className="grid md:grid-cols-3">
              <div className="h-80 bg-gray-300" />

              <div className="space-y-5 p-8 md:col-span-2">
                <div className="h-8 w-1/3 rounded bg-gray-300" />
                <div className="h-5 w-2/3 rounded bg-gray-200" />
                <div className="h-20 rounded bg-gray-200" />

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="h-20 rounded-2xl bg-gray-200" />
                  <div className="h-20 rounded-2xl bg-gray-200" />
                  <div className="h-20 rounded-2xl bg-gray-200" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !artisan) {
    return (
      <div
        dir="rtl"
        className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-6"
      >
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <div className="text-6xl">😕</div>

          <h2 className="mt-5 text-2xl font-bold text-[#780000]">
            {error || "الحرفي غير موجود"}
          </h2>

          <button
            onClick={() => navigate("/artisans")}
            className="mt-6 rounded-2xl bg-[#003049] px-6 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#669BBC]"
          >
            العودة للحرفيين
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#FDF0D5] px-4 py-8 md:px-8"
    >
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/artisans")}
          className="mb-6 rounded-2xl bg-white px-5 py-3 font-bold text-[#003049] shadow-md transition hover:-translate-y-1"
        >
          ← العودة إلى الحرفيين
        </button>

        {/* Hero */}
        <section className="overflow-hidden rounded-3xl bg-white shadow-xl">
          <div className="grid md:grid-cols-3">

            {/* Image */}
            <div className="flex min-h-[300px] items-center justify-center bg-[#003049] p-8">
              {artisan.profile_image ? (
                <img
                  src={artisan.profile_image}
                  alt={
                    artisan.artisan_name ||
                    artisan.craft_name
                  }
                  className="h-56 w-56 rounded-full object-cover shadow-2xl"
                />
              ) : (
                <div className="flex h-56 w-56 items-center justify-center rounded-full bg-[#669BBC] text-7xl shadow-2xl">
                  🧑‍🎨
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col justify-center p-8 md:col-span-2">

              <span className="mb-4 w-fit rounded-full bg-[#FDF0D5] px-4 py-2 text-sm font-bold text-[#780000]">
                حرفي من منصة الحرفة
              </span>

              <h1 className="text-4xl font-black text-[#003049]">
                {artisan.artisan_name ||
                  artisan.craft_name}
              </h1>

              <p className="mt-2 text-lg font-bold text-[#780000]">
                {artisan.craft_name}
              </p>

              <p className="mt-4 text-lg leading-8 text-gray-600">
                {artisan.bio ||
                  "حرفي عراقي يقدم منتجات مصنوعة يدوياً بعناية وجودة عالية."}
              </p>

              {/* Stats */}
              <div className="mt-7 grid gap-4 sm:grid-cols-3">

                <div className="rounded-2xl bg-[#FDF0D5] p-4">
                  <p className="text-sm font-semibold text-gray-500">
                    الموقع
                  </p>

                  <p className="mt-1 font-bold text-[#003049]">
                    📍 {artisan.city || "العراق"}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FDF0D5] p-4">
                  <p className="text-sm font-semibold text-gray-500">
                    الخبرة
                  </p>

                  <p className="mt-1 font-bold text-[#003049]">
                    ✦ {artisan.experience_years || 0} سنوات
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FDF0D5] p-4">
                  <p className="text-sm font-semibold text-gray-500">
                    المنتجات
                  </p>

                  <p className="mt-1 font-bold text-[#003049]">
                    🛍️ {products.length} منتجات
                  </p>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section className="mt-10">

          <h2 className="mb-5 text-3xl font-black text-[#003049]">
            عن الحرفي
          </h2>

          <div className="grid gap-6 md:grid-cols-2">

            {/* Story */}
            <div className="rounded-3xl bg-white p-7 shadow-lg">
              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0D5] text-2xl">
                  📖
                </div>

                <h3 className="text-xl font-bold text-[#003049]">
                  قصة الحرفي
                </h3>
              </div>

              <p className="leading-8 text-gray-600">
                {artisan.story ||
                  artisan.bio ||
                  "يعمل الحرفي على تقديم منتجات يدوية تجمع بين المهارة والتراث."}
              </p>
            </div>

            {/* Specialties */}
            <div className="rounded-3xl bg-white p-7 shadow-lg">
              <div className="mb-4 flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0D5] text-2xl">
                  🎨
                </div>

                <h3 className="text-xl font-bold text-[#003049]">
                  التخصصات
                </h3>
              </div>

              <p className="leading-8 text-gray-600">
                {artisan.specialties ||
                  "متخصص في الأعمال الحرفية اليدوية."}
              </p>
            </div>

          </div>
        </section>

        {/* Work Style */}
        <section className="mt-6">
          <div className="rounded-3xl bg-white p-7 shadow-lg">

            <div className="mb-4 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FDF0D5] text-2xl">
                🛠️
              </div>

              <h3 className="text-xl font-bold text-[#003049]">
                أسلوب العمل
              </h3>

            </div>

            <p className="leading-8 text-gray-600">
              {artisan.work_style ||
                "يهتم الحرفي بجودة العمل والتفاصيل في كل قطعة."}
            </p>

          </div>
        </section>

        {/* Products */}
        <section
          id="products"
          className="mt-10"
        >

          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-3xl font-black text-[#003049]">
                منتجات الحرفي
              </h2>

              <p className="mt-2 text-gray-600">
                اكتشف المنتجات المصنوعة يدوياً
              </p>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="rounded-2xl bg-[#780000] px-5 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#C1121F]"
            >
              🛒 فتح السلة
            </button>

          </div>

          {products.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">

              <div className="text-6xl">
                🧺
              </div>

              <h3 className="mt-4 text-xl font-bold text-[#003049]">
                لا توجد منتجات حالياً
              </h3>

              <p className="mt-2 text-gray-500">
                سيتم إضافة منتجات هذا الحرفي قريباً.
              </p>

            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {products.map((product) => (

                <div
                  key={product.id}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                >

                  {/* Product Image */}
                  <div className="flex h-56 items-center justify-center bg-[#FDF0D5]">

                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="text-7xl">
                        🛍️
                      </div>
                    )}

                  </div>

                  {/* Product Info */}
                  <div className="p-6">

                    <h3 className="text-xl font-bold text-[#003049]">
                      {product.name}
                    </h3>

                    <p className="mt-2 min-h-[50px] leading-7 text-gray-500">
                      {product.description ||
                        "منتج مصنوع يدوياً بعناية."}
                    </p>

                    <div className="mt-5 flex items-center justify-between">

                      <span className="text-xl font-black text-[#780000]">
                        {Number(
                          product.price
                        ).toLocaleString()}{" "}
                        د.ع
                      </span>

                      <span className="text-sm text-gray-500">
                        متوفر:{" "}
                        {product.stock_quantity}
                      </span>

                    </div>

                    <button
                      onClick={() =>
                        addToCart(product)
                      }
                      disabled={
                        product.stock_quantity <= 0
                      }
                      className="mt-5 w-full rounded-2xl bg-[#003049] px-5 py-3 font-bold text-white transition hover:-translate-y-1 hover:bg-[#669BBC] disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {product.stock_quantity > 0
                        ? "إضافة إلى السلة 🛒"
                        : "نفذت الكمية"}
                    </button>

                  </div>
                </div>

              ))}

            </div>
          )}

        </section>

        {/* Bottom CTA */}
        <section className="mt-12 rounded-3xl bg-[#003049] p-8 text-center text-white shadow-xl">

          <h2 className="text-2xl font-black">
            أعجبتك منتجات{" "}
            {artisan.artisan_name ||
              artisan.craft_name}
            ؟
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-gray-200">
            ادعم الحرفيين المحليين واكتشف المزيد من
            المنتجات المصنوعة يدوياً.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">

            <button
              onClick={() => navigate("/cart")}
              className="rounded-2xl bg-[#780000] px-7 py-3 font-bold text-white transition hover:bg-[#C1121F]"
            >
              فتح السلة
            </button>

            <button
              onClick={() => navigate("/artisans")}
              className="rounded-2xl bg-white px-7 py-3 font-bold text-[#003049] transition hover:bg-[#FDF0D5]"
            >
              استكشاف حرفيين آخرين
            </button>

          </div>

        </section>

      </div>
    </div>
  );
};

export default ArtisanProfile;