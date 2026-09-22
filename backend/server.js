const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./src/config/db");

const artisanRoutes = require("./src/modules/artisans/artisan.routes");
const productRoutes = require("./src/modules/products/product.routes");
const categoryRoutes = require("./src/modules/categories/category.routes");
const orderRoutes = require("./src/modules/orders/order.routes");
const orderItemRoutes = require("./src/modules/order-items/order-item.routes");
const userRoutes = require("./src/modules/users/user.routes");
const reviewRoutes = require("./src/modules/reviews/review.routes");
const authRoutes = require("./src/modules/auth/auth.routes");
const favoriteRoutes = require("./src/modules/Favorites/favorite.routes");
const adminRoutes = require("./src/modules/admin/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Alherfa Backend is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/artisans", artisanRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/admin", adminRoutes);

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      message: "Database connected",
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});