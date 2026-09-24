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

router.get(
  "/",
  authenticate,
  authorize("admin"),
  orderItemController.getAllOrderItems
);

router.get(
  "/:id",
  authenticate,
  orderItemController.getOrderItemById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateOrderItem,
  orderItemController.createOrderItem
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateOrderItem,
  orderItemController.updateOrderItem
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  orderItemController.deleteOrderItem
);

module.exports = router;