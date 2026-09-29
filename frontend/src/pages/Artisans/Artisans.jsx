import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ArtisanCard from "../../components/ArtisanCard/ArtisanCard";
import VariableProximity from "../../components/VariableProximity/VariableProximity";
import SplitText from "../../components/SplitText/SplitText";
import "./Artisans.css";

const artisanImages = {
  "خزاف عراقي": "/images/artisans/potter.jpg",
  "نجار عراقي": "/images/artisans/carpenter.jpg",
  "خياط عراقي": "/images/artisans/tailor.jpg",
  "صانع سعف عراقي": "/images/artisans/palm-artisan.jpg",
  "مطرزة عراقية": "/images/artisans/embroiderer.jpg",
  "صانع نحاس عراقي": "/images/artisans/coppersmith.jpg",
};

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const titleContainerRef = useRef(null);

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/artisans"
        );

        const artisansWithImages = response.data.data.map((artisan) => ({
          ...artisan,
          profile_image:
            artisan.profile_image ||
            artisanImages[artisan.craft_name] ||
            null,
        }));

        setArtisans(artisansWithImages);
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
      <main className="artisans-page bg-[#FDF0D5] px-5 py-16 sm:px-8 lg:px-10">
        <div className="artisans-loading">
          <div className="artisans-loading-header">
            <div className="h-3 w-28 animate-pulse rounded-full bg-[#780000]/20" />

            <div className="mt-5 h-12 w-full max-w-xl animate-pulse rounded-2xl bg-[#003049]/10" />

            <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded-full bg-[#669BBC]/15" />
          </div>

          <div className="artisans-loading-grid">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[500px] animate-pulse rounded-[28px] bg-white/60 shadow-sm"
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
        <div className="w-full max-w-md rounded-[28px] border border-[#780000]/10 bg-white p-8 text-center shadow-xl">
          <div className="mb-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#780000]/10 text-3xl">
              ⚠️
            </div>
          </div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Something went wrong
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#669BBC]">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="artisans-page bg-[#FDF0D5]">

      {/* ================= HERO ================= */}
      <section className="artisans-hero relative overflow-hidden">

        {/* Decorative background */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#780000]/5 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#003049]/5 blur-3xl" />

        <div className="pointer-events-none absolute right-[12%] top-[20%] select-none text-5xl text-[#780000]/10">
          𒀭 𒂗
        </div>

        <div className="pointer-events-none absolute bottom-[15%] left-[10%] select-none text-4xl text-[#003049]/10">
          𒆠
        </div>

        <div className="artisans-hero-content relative">

          <div className="artisans-eyebrow">
            <span className="artisans-eyebrow-dot" />
            OUR ARTISANS
          </div>

          <div
            ref={titleContainerRef}
            className="relative"
          >
            <VariableProximity
              label="Meet the talented artisans"
              className="artisans-main-title"
              fromFontVariationSettings="'wght' 600, 'opsz' 48"
              toFontVariationSettings="'wght' 1000, 'opsz' 72"
              containerRef={titleContainerRef}
              radius={180}
              falloff="linear"
            />
          </div>

          <div className="artisans-hero-description">
            <SplitText
              text="Discover unique handmade products created by skilled local artisans and inspired by Iraqi culture and heritage."
              tag="p"
              className="text-lg leading-8 text-[#003049]/60 sm:text-xl"
              delay={25}
              duration={0.8}
              ease="power3.out"
              splitType="words"
              from={{ opacity: 0, y: 30 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-80px"
              textAlign="center"
            />
          </div>

          {/* Decorative line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-[#780000]/30" />
            <span className="text-sm text-[#780000]">✦</span>
            <span className="h-px w-12 bg-[#780000]/30" />
          </div>
        </div>
      </section>

      {/* ================= ARTISANS ================= */}
      <section className="artisans-section">
        <div className="artisans-container">

          {/* Header */}
          <div className="artisans-header">

            <div className="artisans-heading">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#780000]">
                Discover
              </span>

              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#003049] sm:text-4xl">
                All Artisans
              </h2>

              <p className="mt-2 text-sm text-[#003049]/55">
                {filteredArtisans.length} artisan
                {filteredArtisans.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search */}
            <div className="artisans-search">

              <span className="artisans-search-icon">
                🔍
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by craft, city, or story..."
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="artisans-search-clear"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Cards */}
          {filteredArtisans.length > 0 ? (
            <div className="artisans-grid">
              {filteredArtisans.map((artisan) => (
                <ArtisanCard
                  key={artisan.id}
                  artisan={artisan}
                />
              ))}
            </div>
          ) : (
            <div className="artisans-empty">

              <div className="artisans-empty-icon">
                🔎
              </div>

              <h2 className="text-2xl font-bold text-[#003049]">
                No artisans found
              </h2>

              <p className="mt-3 max-w-md text-sm leading-6 text-[#003049]/55">
                Try searching with a different name, location, or specialty.
              </p>

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-6 rounded-full bg-[#780000] px-6 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5f0000] hover:shadow-lg"
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