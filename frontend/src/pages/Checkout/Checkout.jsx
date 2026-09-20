import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) || [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [userId] = useState(1);

  const total = cartItems.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const createOrder = async () => {
    if (cartItems.length === 0) {
      setError("Your cart is empty");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          user_id: userId,
          total_amount: total,
          status: "pending",
        }
      );

      console.log("Order created:", response.data);

      localStorage.removeItem("cart");

      alert("Order created successfully");

      navigate("/my-orders");
    } catch (error) {
      console.error(error);
      setError("Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Checkout</h1>

      {error && <p>{error}</p>}

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>
                Price: {item.price}
              </p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Subtotal:{" "}
                {Number(item.price) * item.quantity}
              </p>

              <hr />
            </div>
          ))}

          <h2>
            Total: {total}
          </h2>

          <button
            type="button"
            onClick={createOrder}
            disabled={loading}
          >
            {loading ? "Creating Order..." : "Place Order"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Checkout;