import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function MyProducts() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const artisanId = 2;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/artisan/${artisanId}`
        );

        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/products/${productId}`
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => product.id !== productId
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Products</h1>

      <div>
        <button
          type="button"
          onClick={() => navigate("/artisan/products/add")}
        >
          Add Product
        </button>

        <Link to="/artisan/dashboard">
          <button type="button">
            Back to Dashboard
          </button>
        </Link>
      </div>

      <br />

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>

              <p>
                <strong>Description:</strong>{" "}
                {product.description || "No description"}
              </p>

              <p>
                <strong>Price:</strong>{" "}
                {product.price}
              </p>

              <p>
                <strong>Stock:</strong>{" "}
                {product.stock_quantity}
              </p>

              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  width="150"
                />
              )}

              <br />

              <Link
                to={`/artisan/products/edit/${product.id}`}
              >
                <button type="button">
                  Edit
                </button>
              </Link>

              <button
                type="button"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProducts;