import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock_quantity: "",
    image: "",
    category_id: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        const product = response.data.data || response.data;

        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price || "",
          stock_quantity: product.stock_quantity ?? "",
          image: product.image || "",
          category_id: product.category_id || "",
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      await axios.patch(
        `http://localhost:5000/api/products/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stock_quantity: Number(formData.stock_quantity),
          image: formData.image,
          category_id: formData.category_id
            ? Number(formData.category_id)
            : null,
        }
      );

      alert("Product updated successfully");

      navigate("/artisan/products");
    } catch (error) {
      console.error(error);
      setError("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p>Loading product...</p>;
  }

  return (
    <div>
      <h1>Edit Product</h1>

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
      </div>

      <hr />

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name</label>
          <br />

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Description</label>
          <br />

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <br />

        <div>
          <label>Price</label>
          <br />

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <br />

        <div>
          <label>Stock Quantity</label>
          <br />

          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <br />

        <div>
          <label>Category ID</label>
          <br />

          <input
            type="number"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            min="1"
          />
        </div>

        <br />

        <div>
          <label>Image URL</label>
          <br />

          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <br />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>

        {" "}

        <Link to="/artisan/products">
          <button type="button">
            Cancel
          </button>
        </Link>
      </form>
    </div>
  );
}

export default EditProduct;