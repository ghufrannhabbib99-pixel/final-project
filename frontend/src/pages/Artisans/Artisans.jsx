import { useEffect, useState } from "react";
import axios from "axios";
import ArtisanCard from "../../components/ArtisanCard/ArtisanCard";

function Artisans() {
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtisans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/artisans"
        );

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

  if (loading) {
    return <p>Loading artisans...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="artisans-page">
      <h1>Artisans</h1>

      <div className="artisans-list">
        {artisans.length > 0 ? (
          artisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={artisan}
            />
          ))
        ) : (
          <p>No artisans found</p>
        )}
      </div>
    </div>
  );
}

export default Artisans;