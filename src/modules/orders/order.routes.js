const express = require("express");

const orderController = require("./order.controller");

const {
  validateCreateOrder,
  validateUpdateOrder,
} = require("./order.validation");

const router = express.Router();

router.get("/", orderController.getAllOrders);

router.get("/:id", orderController.getOrderById);

router.post(
  "/",
  validateCreateOrder,
  orderController.createOrder
);

router.patch(
  "/:id",
  validateUpdateOrder,
  orderController.updateOrder
);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;