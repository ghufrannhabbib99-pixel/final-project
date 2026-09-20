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
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/artisans", artisanRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/order-items", orderItemRoutes);
app.use("/api/users", userRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Alherfa Backend is running",
  });
});

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});