const express = require("express");

const orderController = require("./order.controller");

const {
  validateCreateOrder,
  validateUpdateOrder,
} = require("./order.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

// Admin: Get all orders
router.get(
  "/",
  authenticate,
  authorize("admin"),
  orderController.getAllOrders
);

// Authenticated user: Get orders by user ID
router.get(
  "/user/:userId",
  authenticate,
  orderController.getOrdersByUserId
);

// Authenticated user: Get order details
router.get(
  "/:id",
  authenticate,
  orderController.getOrderById
);

// Authenticated user: Create order
router.post(
  "/",
  authenticate,
  validateCreateOrder,
  orderController.createOrder
);

// Admin: Update order status
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateOrder,
  orderController.updateOrder
);

// Admin: Delete order
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  orderController.deleteOrder
);

module.exports = router;