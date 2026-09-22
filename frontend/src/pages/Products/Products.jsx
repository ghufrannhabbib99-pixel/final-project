
import SearchBar from "../../components/SearchBar/SearchBar";

function Products() {
  const handleSearch = (searchTerm) => {
    console.log("Search:", searchTerm);
  };

  return (
    <main className="px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>

        <p className="mt-2 text-gray-600">
          Explore handmade products created by Iraqi artisans.
        </p>
      </div>

      <div className="mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Products will be displayed here after connecting the API */}
      </div>
    </main>
  );
}

export default Products;