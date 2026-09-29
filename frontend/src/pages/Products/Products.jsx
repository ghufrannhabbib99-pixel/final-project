import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import ProductCard from "../../components/ProductCard/ProductCard";
import api from "../../services/api";
import "./Products.css";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = [
    { name: "All", symbol: "✦" },
    { name: "Pottery", symbol: "𒀭" },
    { name: "Weaving", symbol: "◇" },
    { name: "Copper", symbol: "𒂗" },
    { name: "Jewelry", symbol: "✧" },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.products.getAll();

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

    if (selectedCategory === "All") {
      return matchesSearch;
    }

    const categoryMap = {
      Pottery: "فخار وخزف",
      Weaving: "خياطة وتطريز",
      Copper: "نحاس وأعمال معدنية",
      Jewelry: "مجوهرات",
    };

    const matchesCategory =
      product.category_name === categoryMap[selectedCategory];

    return matchesSearch && matchesCategory;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <main className="products-page min-h-screen overflow-hidden bg-[#FDF0D5]">

      {/* ================= HERO ================= */}
      <section className="px-4 pt-5 sm:px-6 md:px-8 md:pt-7">
        <div className="products-hero relative overflow-hidden rounded-[2rem] bg-[#003049] px-6 py-20 text-center shadow-xl sm:px-10 md:px-14 md:py-24">

          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#780000]/20 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[#E6B566]/10 blur-3xl" />

          {/* Geometric decoration */}
          <div className="pointer-events-none absolute left-5 top-5 flex gap-3 opacity-20 sm:left-8 sm:top-8">
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
          </div>

          <div className="pointer-events-none absolute bottom-5 right-5 flex gap-3 opacity-20 sm:bottom-8 sm:right-8">
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
            <div className="h-7 w-7 rotate-45 border border-[#E6B566]" />
          </div>

          {/* Cuneiform */}
          <div className="pointer-events-none absolute left-8 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-2xl text-[#E6B566]/20 md:flex">
            <span>𒀭</span>
            <span>𒂗</span>
            <span>𒆠</span>
            <span>𒀀</span>
          </div>

          <div className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col gap-3 text-2xl text-[#E6B566]/20 md:flex">
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
                <span className="animate-pulse text-lg">𒀭</span>
                <span className="h-px w-12 bg-[#E6B566]/50" />
              </div>
            </div>

            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#E6B566] sm:text-sm">
              Iraqi Handmade Collection
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#FDF0D5] sm:text-5xl md:text-6xl">
              Crafted by Hand,
              <span className="mt-3 block text-[#E6B566]">
                Made with Heritage
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-[#FDF0D5]/65 sm:text-base md:text-lg">
              Discover unique handmade pieces created by Iraqi artisans,
              inspired by traditions passed from one generation to another.
            </p>

            <div className="mt-9 flex items-center justify-center gap-4 text-[#E6B566]/60">
              <span>𒀭</span>
              <span>𒂗</span>
              <span>✦</span>
              <span>𒆠</span>
              <span>𒀀</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}
      <section className="px-5 py-20 md:px-8 lg:py-24">
        <div className="products-container">

          {/* Heading */}
          <div className="products-top">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#780000]">
                Our Collection
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#003049] md:text-4xl">
                Explore Products
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#003049]/55">
                Explore handmade products crafted by talented Iraqi artisans.
              </p>
            </div>

            <div className="products-count">
              <span>{filteredProducts.length}</span>
              <p>Products</p>
            </div>
          </div>

          {/* Search */}
          <div className="products-toolbar">

            <div className="products-search">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="products-categories">
              {categories.map((category) => (
                <button
                  key={category.name}
                  type="button"
                  onClick={() => setSelectedCategory(category.name)}
                  className={`products-category ${
                    selectedCategory === category.name
                      ? "products-category-active"
                      : ""
                  }`}
                >
                  <span>{category.symbol}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Results label */}
          {!loading && !error && (
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-[#003049]/50">
                {searchTerm
                  ? `Results for "${searchTerm}"`
                  : selectedCategory === "All"
                  ? "All handmade products"
                  : `${selectedCategory} collection`}
              </p>

              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="text-xs font-semibold text-[#780000] transition hover:text-[#5f0000]"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="products-loading-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="products-skeleton animate-pulse"
                >
                  <div className="h-64 bg-[#003049]/10" />
                  <div className="space-y-3 p-5">
                    <div className="h-3 w-20 rounded bg-[#780000]/10" />
                    <div className="h-5 w-3/4 rounded bg-[#003049]/10" />
                    <div className="h-10 rounded-xl bg-[#003049]/5" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="products-message">
              <div className="products-message-icon">
                ⚠️
              </div>

              <h3>Could not load products</h3>

              <p>{error}</p>
            </div>
          )}

          {/* Products */}
          {!loading && !error && filteredProducts.length > 0 && (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="products-message">

                <div className="products-message-icon">
                  𒀭
                </div>

                <h3>No products found</h3>

                <p>
                  Try another search or choose a different category.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                  }}
                  className="mt-6 rounded-full bg-[#780000] px-6 py-3 text-sm font-semibold text-[#FDF0D5] transition hover:-translate-y-1 hover:bg-[#5f0000]"
                >
                  Reset Filters
                </button>
              </div>
            )}
        </div>
      </section>
    </main>
  );
}

export default Products;