import {
  BrowserRouter,
  Routes,
  Route,
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
import SignUp from "./pages/SignUp/SignUp";
import Favorites from "./pages/Favorites/Favorites";
import UserProfile from "./pages/UserProfile/UserProfile";

import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard/Dashboard";
import AdminUsers from "./pages/Admin/Users/Users";
import AdminArtisans from "./pages/Admin/Artisans/Artisans";
import AdminProducts from "./pages/Admin/Products/Products";
import AdminCategories from "./pages/Admin/Categories/Categories";
import AdminOrders from "./pages/Admin/Orders/Orders";
import AdminReviews from "./pages/Admin/Reviews/Reviews";

import Dashboard from "./Artisan/Dashboard/Dashboard";
import Profile from "./Artisan/Profile/Profile";
import MyProducts from "./Artisan/MyProducts/MyProducts";
import AddProduct from "./Artisan/MyProducts/AddProduct";
import EditProduct from "./Artisan/MyProducts/EditProduct";
import ArtisanMyOrders from "./Artisan/MyOrders/MyOrders";
import AI from "./pages/AI/AI";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* ================= CUSTOMER PAGES ================= */}

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
  path="/ai"
  element={<AI />}
/>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
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
  path="/profile"
  element={<UserProfile />}
/>
        {/* ================= PROTECTED CUSTOMER PAGES ================= */}

        <Route element={<ProtectedRoute />}>
          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/my-orders"
            element={<MyOrders />}
          />
        </Route>

        {/* ================= ADMIN PAGES ================= */}

        <Route
          path="/admin"
          element={<AdminLayout />}
        >
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />

          <Route
            path="artisans"
            element={<AdminArtisans />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="categories"
            element={<AdminCategories />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          <Route
            path="reviews"
            element={<AdminReviews />}
          />
        </Route>
        <Route path="/favorites" element={<Favorites />} />

        {/* ================= ARTISAN PAGES ================= */}

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