import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Artisans from "./pages/Artisans/Artisans";
import ArtisanProfile from "./pages/ArtisanProfile/ArtisanProfile";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Checkout/Checkout";
import MyOrders from "./pages/MyOrders/MyOrders";

import Dashboard from "./Artisan/Dashboard/Dashboard";
import Profile from "./Artisan/Profile/Profile";
import MyProducts from "./Artisan/MyProducts/MyProducts";
import AddProduct from "./Artisan/MyProducts/AddProduct";
import EditProduct from "./Artisan/MyProducts/EditProduct";
import ArtisanMyOrders from "./Artisan/MyOrders/MyOrders";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/artisans" replace />}
        />

        <Route
          path="/artisans"
          element={<Artisans />}
        />

        <Route
          path="/artisans/:id"
          element={<ArtisanProfile />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        <Route
          path="/my-orders"
          element={<MyOrders />}
        />

        <Route
          path="/artisan/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/artisan/profile"
          element={<Profile />}
        />

        <Route
          path="/artisan/products"
          element={<MyProducts />}
        />

        <Route
          path="/artisan/products/add"
          element={<AddProduct />}
        />

        <Route
          path="/artisan/products/edit/:id"
          element={<EditProduct />}
        />

        <Route
          path="/artisan/orders"
          element={<ArtisanMyOrders />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;