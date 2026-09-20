import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = 1;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`
        );

        setOrders(response.data);
      } catch (error) {
        console.error(error);
        setError("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          status,
        }
      );

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? {
                ...order,
                status,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      <div>
        <Link to="/artisan/dashboard">
          <button type="button">
            Dashboard
          </button>
        </Link>

        <Link to="/artisan/profile">
          <button type="button">
            My Profile
          </button>
        </Link>

        <Link to="/artisan/products">
          <button type="button">
            My Products
          </button>
        </Link>
      </div>

      <hr />

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <h2>Order #{order.id}</h2>

              <p>
                <strong>Total:</strong>{" "}
                {order.total_amount}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                {order.status}
              </p>

              <p>
                <strong>Created At:</strong>{" "}
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

              <div>
                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "confirmed"
                    )
                  }
                >
                  Confirm
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "shipped"
                    )
                  }
                >
                  Shipped
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "completed"
                    )
                  }
                >
                  Completed
                </button>

                <button
                  type="button"
                  onClick={() =>
                    updateOrderStatus(
                      order.id,
                      "cancelled"
                    )
                  }
                >
                  Cancel
                </button>
              </div>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;