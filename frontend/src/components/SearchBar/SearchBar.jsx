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
      className="flex w-full max-w-md gap-2"
    >
      <input
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search products..."
        className="flex-1 rounded-md border px-4 py-2 outline-none"
      />

      <button
        type="submit"
        className="rounded-md bg-black px-4 py-2 text-white"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;