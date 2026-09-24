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
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Login from "./pages/Login/Login";

import Dashboard from "./Artisan/Dashboard/Dashboard";
import Profile from "./Artisan/Profile/Profile";
import MyProducts from "./Artisan/MyProducts/MyProducts";
import AddProduct from "./Artisan/MyProducts/AddProduct";
import EditProduct from "./Artisan/MyProducts/EditProduct";
import ArtisanMyOrders from "./Artisan/MyOrders/MyOrders";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Customer Pages */}
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />
        <Route
          path="/login"
          element={<Login />}
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

        {/* Artisan Pages */}
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
      <Footer />
    </BrowserRouter>
  );
}

export default App;