import { Link } from "react-router-dom";
import "./ArtisanCard.css";

function ArtisanCard({ artisan }) {
  return (
    <article className="artisan-card group">

      {/* Image */}
      <div className="artisan-image relative overflow-hidden">

        {artisan.profile_image ? (
          <img
            src={artisan.profile_image}
            alt={artisan.craft_name || "Artisan"}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
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

        {/* Image overlay */}
        <div className="artisan-image-overlay" />

        {/* Favorite */}
        <button
          type="button"
          aria-label="Add artisan to favorites"
          className="artisan-favorite"
        >
          ♡
        </button>

        {/* Experience */}
        <div className="artisan-experience">
          <span>
            {artisan.experience_years ?? 0}
          </span>
          years experience
        </div>

      </div>

      {/* Content */}
      <div className="artisan-content">

        <p className="artisan-label">
          Iraqi Artisan
        </p>

        <h3 className="artisan-title">
          {artisan.craft_name || "Handmade Artisan"}
        </h3>

        <div className="artisan-location">
          <span>📍</span>
          <span>
            {artisan.city || "Location not specified"}
          </span>
        </div>

        <p className="artisan-bio">
          {artisan.bio ||
            "Creating unique handmade products with passion and skill."}
        </p>

        <div className="artisan-divider" />

        <Link
          to={`/artisans/${artisan.id}`}
          className="artisan-button"
        >
          <span>View Profile</span>

          <span className="artisan-button-arrow">
            →
          </span>
        </Link>

      </div>
    </article>
  );
}

export default ArtisanCard;

