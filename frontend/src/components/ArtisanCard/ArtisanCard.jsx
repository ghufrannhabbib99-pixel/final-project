import { Link } from "react-router-dom";

function ArtisanCard({ artisan }) {
  return (
    <div className="artisan-card">
      {artisan.profile_image ? (
        <img
          src={artisan.profile_image}
          alt={artisan.craft_name}
          className="artisan-card-image"
        />
      ) : (
        <div className="artisan-card-image no-image">
          No Image
        </div>
      )}

      <div className="artisan-card-content">
        <h3>{artisan.craft_name}</h3>

        <p>{artisan.bio || "No bio available"}</p>

        <p>
          <strong>City:</strong>{" "}
          {artisan.city || "Not specified"}
        </p>

        <p>
          <strong>Experience:</strong>{" "}
          {artisan.experience_years ?? 0} years
        </p>

        <Link to={`/artisans/${artisan.id}`}>
          <button>View Profile</button>
        </Link>
      </div>
    </div>
  );
}

export default ArtisanCard;