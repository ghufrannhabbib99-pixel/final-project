const express = require("express");

const orderItemController = require("./order-item.controller");

const {
  validateCreateOrderItem,
  validateUpdateOrderItem,
} = require("./order-item.validation");

const router = express.Router();

router.get(
  "/",
  orderItemController.getAllOrderItems
);

router.get(
  "/:id",
  orderItemController.getOrderItemById
);

router.post(
  "/",
  validateCreateOrderItem,
  orderItemController.createOrderItem
);

router.patch(
  "/:id",
  validateUpdateOrderItem,
  orderItemController.updateOrderItem
);

router.delete(
  "/:id",
  orderItemController.deleteOrderItem
);

module.exports = router;