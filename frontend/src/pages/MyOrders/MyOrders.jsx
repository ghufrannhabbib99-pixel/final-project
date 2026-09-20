import { useEffect, useState } from "react";
import axios from "axios";

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

  if (loading) {
    return <p>Loading orders...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div>
          {orders.map((order) => (
            <div key={order.id}>
              <h3>Order #{order.id}</h3>

              <p>
                Total: {order.total_amount}
              </p>

              <p>
                Status: {order.status}
              </p>

              <p>
                Created At:{" "}
                {new Date(
                  order.created_at
                ).toLocaleString()}
              </p>

              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;