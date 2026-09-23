
import SearchBar from "../../components/SearchBar/SearchBar";

function Products() {
  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
  };

  return (
    <main className="min-h-screen bg-[#FDF0D5]">

      {/* Hero */}
      <section className="px-6 gap-6 py-16 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#780000]">
          Discover Iraqi Craftsmanship
        </p>

        <h1 className="mt-4 text-4xl font-bold text-[#003049] md:text-5xl">
          Handmade Products
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-[#003049]/70 text-center translate-x-150">
          Discover unique handmade products created by talented Iraqi artisans.
        </p>
      </section>

      {/* Products Section */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl">

          {/* Products Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#003049]">
              Products
            </h2>

            <p className="mx-auto mt-2 max-w-xl text-[#003049]/70 text-center">
              Explore our collection of handmade Iraqi crafts.
            </p>
          </div>

          {/* Search */}
          <div className="mt-8 flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>

        </div>
      </section>

    </main>
  );
}

export default Products;
