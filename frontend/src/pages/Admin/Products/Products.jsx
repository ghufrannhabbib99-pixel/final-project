import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar/SearchBar";
import ProductCard from "../../../components/ProductCard/ProductCard";
import api from "../../../services/api";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "All", label: "الكل", symbol: "✦" },
    { name: "Pottery", label: "فخار", symbol: "𒀭" },
    { name: "Weaving", label: "نسيج", symbol: "◇" },
    { name: "Copper", label: "نحاس", symbol: "𒂗" },
    { name: "Jewelry", label: "مجوهرات", symbol: "✧" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.products.getAll();

        console.log("PRODUCTS FROM BACKEND:", response);

        setProducts(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Failed to load products:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !search ||
      product.name?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search);

    return matchesSearch;
  });

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="products-page min-h-screen overflow-hidden bg-[#FDF0D5]"
     dir="rtl">

      {/* ================= HERO ================= */}
      <section className="px-5 md:px-8">
        <div className="products-hero relative overflow-hidden rounded-[2rem] bg-[#003049] px-6 py-20 text-center md:px-12 md:py-24">

          {/* Top geometric decoration */}
          <div className="absolute left-0 top-0 flex gap-3 p-6 opacity-20">
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
          </div>

          {/* Bottom geometric decoration */}
          <div className="absolute bottom-0 right-0 flex gap-3 p-6 opacity-20">
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
            <div className="h-8 w-8 rotate-45 border border-[#E6B566]" />
          </div>

          {/* Left cuneiform decoration */}
          <div className="absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-2xl text-[#E6B566]/30 md:flex">
            <span>𒀭</span>
            <span>𒂗</span>
            <span>𒆠</span>
            <span>𒀀</span>
          </div>

          {/* Right cuneiform decoration */}
          <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-2xl text-[#E6B566]/30 md:flex">
            <span>𒀭</span>
            <span>𒂗</span>
            <span>𒆠</span>
            <span>𒀀</span>
          </div>

          {/* Hero content */}
          <div className="products-hero-content relative z-10">

            <div className="mb-6 flex justify-center">
              <div className="flex items-center gap-3 text-[#E6B566]">
                <span className="h-px w-12 bg-[#E6B566]/50" />
                <span className="text-lg">𒀭</span>
                <span className="h-px w-12 bg-[#E6B566]/50" />
              </div>
            </div>

            <p className="text-sm font-medium uppercase tracking-[0.3em] text-[#E6B566]">
              مجموعة الحرف اليدوية العراقية
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-[#FDF0D5] md:text-6xl">
              صُنعت بأيادٍ ماهرة،
              <span className="mt-2 block text-[#E6B566]">
                وصيغت بروح التراث
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#FDF0D5]/70 md:text-lg">
              اكتشف قطعاً يدوية مميزة صنعها حرفيون عراقيون،
              مستوحاة من تراث انتقل من جيل إلى آخر.
            </p>

            {/* Heritage decoration */}
            <div className="mt-8 flex items-center justify-center gap-4 text-[#E6B566]/60">
              <span>𒀭</span>
              <span>𒂗</span>
              <span>✦</span>
              <span>𒆠</span>
              <span>𒀀</span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS SECTION ================= */}
      <section className="px-5 py-20 md:px-8">
        <div className="products-container">

          <div className="products-content">

            {/* Section Heading */}
            <div className="products-heading">

              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#780000]">
                مجموعتنا
              </p>

              <h2 className="mt-3 text-3xl font-bold text-[#003049] md:text-4xl">
                المنتجات
              </h2>

              <p className="mt-3 text-[#003049]/60">
                استكشف المنتجات اليدوية التي صنعها حرفيون عراقيون موهوبون.
              </p>

            </div>

            {/* Search */}
            <div className="products-search">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Categories */}
            <div className="mt-2">

              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-[#003049]/50">
                تصفح حسب الحرفة
              </p>

              <div className="products-categories">

                {categories.map((category) => (
                  <button
                    key={category.name}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`group flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition duration-300 ${
                      selectedCategory === category.name
                        ? "border-[#780000] bg-[#780000] text-white shadow-md"
                        : "border-[#003049]/15 bg-white text-[#003049] hover:border-[#E6B566] hover:bg-[#E6B566]/10"
                    }`}
                  >
                    <span
                      className={
                        selectedCategory === category.name
                          ? "text-[#E6B566]"
                          : "text-[#780000]"
                      }
                    >
                      {category.symbol}
                    </span>

                    {category.label}
                  </button>
                ))}

              </div>
            </div>

            {/* Products Grid */}
            <div className="products-grid mt-8">

              {/* Loading */}
              {loading && (
                <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#003049]/10 bg-white px-6 py-16 text-center shadow-sm">

                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF0D5]">
                    <div className="animate-pulse text-2xl text-[#780000]">
                      𒀭
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-[#003049]">
                    جارٍ تحميل المنتجات...
                  </h3>

                  <p className="mt-2 text-sm text-[#003049]/55">
                    يرجى الانتظار بينما نقوم بتحميل مجموعة المنتجات اليدوية.
                  </p>

                </div>
              )}

              {/* Error */}
              {!loading && error && (
                <div className="mx-auto max-w-2xl rounded-[2rem] border border-red-200 bg-white px-6 py-16 text-center shadow-sm">

                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                    <span className="text-2xl text-red-600">
                      !
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-red-700">
                    تعذّر تحميل المنتجات
                  </h3>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#003049]/55">
                    {error}
                  </p>

                </div>
              )}

              {/* Products */}
              {!loading && !error && filteredProducts.length > 0 && (
                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                    />
                  ))}

                </div>
              )}

              {/* No products */}
              {!loading &&
                !error &&
                filteredProducts.length === 0 && (
                
                  <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#003049]/10 bg-white px-6 py-16 text-center shadow-sm">

                    <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#E6B566]/50 bg-[#FDF0D5]">
                      <div className="text-2xl text-[#780000]">
                        𒀭
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-[#003049]">
                      لا توجد منتجات متاحة
                    </h3>

                    <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#003049]/55">
                      لا توجد منتجات تطابق بحثك الحالي.
                    </p>

                    <div className="mt-7 flex justify-center gap-3 text-[#E6B566]">
                      <span>◇</span>
                      <span>✦</span>
                      <span>◇</span>
                    </div>

                  </div>
                )}

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}

export default Products;