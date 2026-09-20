import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

function ArtisanProfile() {
  const { id } = useParams();

  const [artisan, setArtisan] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtisanData = async () => {
      try {
        const artisanResponse = await axios.get(
          `http://localhost:5000/api/artisans/${id}`
        );

        const productsResponse = await axios.get(
          `http://localhost:5000/api/products/artisan/${id}`
        );

        setArtisan(artisanResponse.data.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load artisan profile");
      } finally {
        setLoading(false);
      }
    };

    fetchArtisanData();
  }, [id]);

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price),
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    alert("Product added to cart");
  };

  if (loading) {
    return <p>Loading artisan profile...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!artisan) {
    return <p>Artisan not found</p>;
  }

  return (
    <div className="artisan-profile">
      <div>
        <Link to="/artisans">
          <button type="button">
            Back to Artisans
          </button>
        </Link>

        <Link to="/cart">
          <button type="button">
            Shopping Cart
          </button>
        </Link>

        <Link to="/my-orders">
          <button type="button">
            My Orders
          </button>
        </Link>
      </div>

      <hr />

      <h1>{artisan.craft_name}</h1>

      {artisan.profile_image ? (
        <img
          src={artisan.profile_image}
          alt={artisan.craft_name}
        />
      ) : (
        <div className="profile-no-image">
          No Image
        </div>
      )}

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

      <hr />

      <h2>Products</h2>

      {products.length === 0 ? (
        <p>No products available</p>
      ) : (
        products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>

            <p>
              Price: {product.price}
            </p>

            <p>
              Stock: {product.stock_quantity}
            </p>

            <button
              type="button"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default ArtisanProfile;