const express = require("express");

const orderItemController = require("./order-item.controller");

const {
  validateCreateOrderItem,
  validateUpdateOrderItem,
} = require("./order-item.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

// Get all order items
// Admin only
router.get(
  "/",
  authenticate,
  authorize("admin"), 
  orderItemController.getAllOrderItems
);

// Get one order item
// Any authenticated user
router.get(
  "/:id",
  authenticate,
  orderItemController.getOrderItemById
);

// Create order item
// Any authenticated user
// The controller checks that the order belongs to the user
router.post(
  "/",
  authenticate,
  validateCreateOrderItem,
  orderItemController.createOrderItem
);

// Update order item
// Admin only
router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateOrderItem,
  orderItemController.updateOrderItem
);

// Delete order item
// Admin only
router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  orderItemController.deleteOrderItem
);

module.exports = router;