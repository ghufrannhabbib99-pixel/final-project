import { useEffect, useState } from "react";
import axios from "axios";
import ArtisanCard from "../../components/ArtisanCard/ArtisanCard";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/artisans"
        );

        console.log(response.data);

        setArtisans(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load artisans");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisans();
  }, []);

  const filteredArtisans = artisans.filter((artisan) => {
    const searchValue = search.toLowerCase().trim();

    return (
      artisan.craft_name?.toLowerCase().includes(searchValue) ||
      artisan.city?.toLowerCase().includes(searchValue) ||
      artisan.bio?.toLowerCase().includes(searchValue)
    );
  });

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 animate-pulse">
            <div className="h-4 w-32 rounded bg-[#669BBC]/30" />

            <div className="mt-4 h-12 w-80 rounded bg-[#003049]/20" />

            <div className="mt-3 h-5 w-96 max-w-full rounded bg-[#669BBC]/20" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-2xl bg-white/60 shadow-md"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-5xl">⚠️</div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[#669BBC]">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FDF0D5]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#FDF0D5] px-4 py-16 sm:px-6 lg:px-8">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />

        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#780000]">
              OUR ARTISANS
            </p>

            <h1 className="text-4xl font-bold leading-tight text-[#003049] sm:text-5xl lg:text-6xl">
              Meet the talented artisans
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#669BBC]">
              Discover unique handmade products created by skilled local
              artisans and inspired by Iraqi culture and heritage.
            </p>
          </div>
        </div>
      </section>

      {/* Artisans Section */}
      <section className="px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">

          {/* Header + Search */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-[#003049]">
                All Artisans
              </h2>

              <p className="mt-1 text-sm text-[#669BBC]">
                {filteredArtisans.length} artisan
                {filteredArtisans.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:max-w-sm">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#669BBC]">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artisans..."
                className="w-full rounded-xl border border-[#669BBC]/30 bg-white/80 py-3 pl-11 pr-4 text-[#003049] outline-none transition-all duration-300 placeholder:text-[#669BBC]/70 focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              />
            </div>
          </div>

          {/* Artisans Grid */}
          {filteredArtisans.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredArtisans.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  artisan={artisan}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white/70 px-6 py-16 text-center shadow-md">
              <div className="mb-5 text-6xl">🔎</div>

              <h2 className="text-2xl font-bold text-[#003049]">
                No artisans found
              </h2>

              <p className="mt-3 text-[#669BBC]">
                Try searching with a different name, location, or specialty.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 rounded-xl bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
                >
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Artisans;