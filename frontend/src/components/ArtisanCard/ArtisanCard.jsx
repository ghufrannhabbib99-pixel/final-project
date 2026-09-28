
import { Link } from "react-router-dom";
import "./ArtisanCard.css";

function ArtisanCard({ artisan }) {
  return (
    <article className="artisan-card group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Image */}
      <div className="artisan-image relative overflow-hidden bg-[#669BBC]">

        {artisan.profile_image ? (
          <img
            src={artisan.profile_image}
            alt={artisan.craft_name || "Artisan"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#669BBC] to-[#003049]">
            <div className="text-center">
              <div className="text-5xl">🧑‍🎨</div>

              <p className="mt-3 text-sm font-semibold text-[#FDF0D5]">
                AlHirfa Artisan
              </p>
            </div>
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/60 via-transparent to-transparent" />

        {/* Favorite */}
        <button
          type="button"
          aria-label="Add artisan to favorites"
          className="artisan-favorite absolute right-5 top-5 flex items-center justify-center rounded-full bg-white/90 text-xl text-[#780000] shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#780000] hover:text-white"
        >
          ♡
        </button>

        {/* Experience */}
        <div className="absolute bottom-4 left-4 rounded-full bg-[#FDF0D5]/95 px-3 py-1.5 text-xs font-semibold text-[#003049] shadow-md">
          {artisan.experience_years ?? 0} years experience
        </div>

      </div>

      {/* Content */}
      <div className="artisan-content">

        {/* Label */}
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780000]">
          Iraqi Artisan
        </p>

        {/* Craft */}
        <h3 className="artisan-title mt-2 text-2xl font-bold leading-tight text-[#003049]">
          {artisan.craft_name || "Handmade Artisan"}
        </h3>

        {/* Location */}
        <div className="mt-3 flex items-center gap-2 text-sm text-[#669BBC]">
          <span className="text-[#780000]">
            📍
          </span>

          <span>
            {artisan.city || "Location not specified"}
          </span>
        </div>

        {/* Bio */}
        <p className="artisan-bio mt-4 text-sm leading-6 text-[#003049]/60">
          {artisan.bio ||
            "Creating unique handmade products with passion and skill."}
        </p>

        {/* Divider */}
        <div className="my-5 h-px bg-[#003049]/10" />

        {/* Button */}
        <Link
          to={`/artisans/${artisan.id}`}
          className="artisan-button flex items-center justify-center rounded-xl bg-[#780000] font-semibold text-[#FDF0D5] transition-all duration-300 hover:bg-[#C1121F] hover:shadow-lg"
        >
          View Profile

          <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>

      </div>
    </article>
  );
}

export default ArtisanCard;

