import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1>Artisan Dashboard</h1>

      <p>Welcome to your artisan dashboard.</p>

      <div>
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

        <Link to="/artisan/orders">
          <button type="button">
            My Orders
          </button>
        </Link>
      </div>

      <hr />

      <h2>Quick Actions</h2>

      <div>
        <Link to="/artisan/products/add">
          <button type="button">
            Add Product
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;