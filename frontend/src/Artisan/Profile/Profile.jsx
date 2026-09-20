import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const artisanId = 2;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/artisans/${artisanId}`
        );

        setArtisan(response.data.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!artisan) {
    return <p>Profile not found</p>;
  }

  return (
    <div>
      <h1>My Profile</h1>

      <div>
        <Link to="/artisan/dashboard">
          <button type="button">
            Dashboard
          </button>
        </Link>

        <Link to="/artisan/products">
          <button type="button">
            My Products
          </button>
        </Link>

        <Link to="/artisan/orders">
          <button type="button">
            My Orders
          </button>
        </Link>
      </div>

      <hr />

      {artisan.profile_image ? (
        <img
          src={artisan.profile_image}
          alt={artisan.craft_name}
          width="200"
        />
      ) : (
        <div>No Image</div>
      )}

      <h2>{artisan.craft_name}</h2>

      <p>
        <strong>Bio:</strong>{" "}
        {artisan.bio || "No bio available"}
      </p>

      <p>
        <strong>City:</strong>{" "}
        {artisan.city || "Not specified"}
      </p>

      <p>
        <strong>Experience:</strong>{" "}
        {artisan.experience_years ?? 0} years
      </p>
    </div>
  );
}

export default Profile;