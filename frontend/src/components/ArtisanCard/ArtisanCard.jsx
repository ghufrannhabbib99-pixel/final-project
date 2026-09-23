import { Link } from "react-router-dom";

function ArtisanCard({ artisan }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-[#669BBC]">
        {artisan.profile_image ? (
          <img
            src={artisan.profile_image}
            alt={artisan.craft_name || "Artisan"}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#669BBC] to-[#003049]">
            <div className="text-center">
              <div className="text-5xl">🧑‍🎨</div>
              <p className="mt-2 text-sm font-semibold text-[#FDF0D5]">
                Alherfa Artisan
              </p>
            </div>
          </div>
        )}

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#003049]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Favorite */}
        <button
          type="button"
          aria-label="Add artisan to favorites"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-[#780000] shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-[#780000] hover:text-white"
        >
          ♡
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Craft */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#780000]">
          Artisan
        </p>

        <h3 className="mt-2 line-clamp-1 text-xl font-bold text-[#003049]">
          {artisan.craft_name || "Handmade Artisan"}
        </h3>

        {/* Bio */}
        <p className="mt-3 line-clamp-2 min-h-[48px] text-sm leading-6 text-[#669BBC]">
          {artisan.bio || "Creating unique handmade products with passion and skill."}
        </p>

        {/* Details */}
        <div className="mt-5 space-y-2 border-t border-[#669BBC]/20 pt-4">
          <div className="flex items-center gap-2 text-sm text-[#003049]">
            <span className="text-[#780000]">📍</span>

            <span>
              {artisan.city || "Location not specified"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-[#003049]">
            <span className="text-[#780000]">✦</span>

            <span>
              {artisan.experience_years ?? 0} years experience
            </span>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/artisans/${artisan.id}`}
          className="mt-5 block"
        >
          <button
            type="button"
            className="w-full rounded-xl bg-[#780000] px-5 py-3 font-semibold text-[#FDF0D5] transition-all duration-300 hover:-translate-y-1 hover:bg-[#C1121F] hover:shadow-lg"
          >
            View Profile
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </button>
        </Link>
      </div>
    </article>
  );
}

export default ArtisanCard;