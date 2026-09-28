
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

        console.log(response.data);

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

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <main className="artisans-page bg-[#FDF0D5] px-5 py-16 sm:px-8 lg:px-10">
        <div className="artisans-loading">
          <div className="artisans-loading-header animate-pulse">
            <div className="h-4 w-32 rounded bg-[#669BBC]/30" />

            <div className="mt-4 h-12 w-80 rounded bg-[#003049]/20" />

            <div className="mt-3 h-5 w-96 max-w-full rounded bg-[#669BBC]/20" />
          </div>

          <div className="artisans-loading-grid">
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

  /* =========================
     Error
  ========================= */

  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FDF0D5] px-4">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <div className="mb-4 text-5xl">⚠️</div>

          <h1 className="text-2xl font-bold text-[#003049]">
            Something went wrong
          </h1>

          <p className="mt-3 text-[#669BBC]">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="artisans-page bg-[#FDF0D5]">
      {/* =========================
          Hero
      ========================= */}

      <section className="artisans-hero relative overflow-hidden bg-[#FDF0D5]">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#669BBC]/10" />

        <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#780000]/5" />

        <div className="artisans-hero-content relative">
          <p className="mb-3 text-sm font-bold tracking-[0.3em] text-[#780000]">
            OUR ARTISANS
          </p>

          <div
            ref={titleContainerRef}
            className="relative"
          >
            <VariableProximity
              label="Meet the talented artisans"
              className="text-4xl font-bold leading-tight text-[#003049] sm:text-5xl lg:text-6xl"
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
              className="text-lg leading-8 text-[#669BBC] sm:text-xl"
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
        </div>
      </section>

      {/* =========================
          Artisans
      ========================= */}

      <section className="artisans-section">
        <div className="artisans-container">
          <div className="artisans-header">
            <div className="artisans-heading">
              <h2 className="text-2xl font-bold text-[#003049] sm:text-3xl">
                All Artisans
              </h2>

              <p className="mt-2 text-sm text-[#669BBC]">
                {filteredArtisans.length} artisan
                {filteredArtisans.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {/* Search */}

            <div className="artisans-search">
              <span className="artisans-search-icon">🔍</span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search artisans..."
                className="rounded-2xl border border-[#669BBC]/30 bg-white/90 text-[#003049] shadow-sm outline-none transition-all duration-300 placeholder:text-[#669BBC]/70 focus:border-[#780000] focus:ring-2 focus:ring-[#780000]/10"
              />
            </div>
          </div>

          {/* =========================
              Cards
          ========================= */}

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
            <div className="artisans-empty rounded-3xl bg-white/70 shadow-md">
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
