import { useState } from "react";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full items-center gap-3"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products..."
        className="h-12 flex-1 rounded-full border border-[#003049]/15 bg-white px-5 text-sm text-[#003049] outline-none transition placeholder:text-[#003049]/40 focus:border-[#E6B566] focus:ring-2 focus:ring-[#E6B566]/20"
      />

      <button
        type="submit"
        className="h-12 rounded-full bg-[#003049] px-6 text-sm font-medium text-white transition hover:bg-[#780000]"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;