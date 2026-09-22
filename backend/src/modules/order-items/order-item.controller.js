const orderItemService = require("./order-item.service");
const orderService = require("../orders/order.service");

const getAllOrderItems = async (req, res) => {
  try {
    const items = await orderItemService.getAllOrderItems();

    if (req.user.role !== "admin") {
      const userItems = items.filter(
        (item) =>
          Number(item.user_id) === Number(req.user.userId)
      );

      return res.status(200).json(userItems);
    }

    res.status(200).json(items);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order items",
    });
  }
};

const getOrderItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await orderItemService.getOrderItemById(id);

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(item.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order item",
    });
  }
};

const createOrderItem = async (req, res) => {
  try {
    const { order_id } = req.body;

    const order = await orderService.getOrderOwner(
      order_id
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(order.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const item = await orderItemService.createOrderItem(
      req.body
    );

    res.status(201).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order item",
    });
  }
};
const updateOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem =
      await orderItemService.getOrderItemById(id);

    if (!existingItem) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingItem.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const item = await orderItemService.updateOrderItem(
      id,
      req.body
    );

    res.status(200).json(item);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update order item",
    });
  }
};

const deleteOrderItem = async (req, res) => {
  try {
    const { id } = req.params;

    const existingItem =
      await orderItemService.getOrderItemById(id);

    if (!existingItem) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingItem.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const item = await orderItemService.deleteOrderItem(id);

    res.status(200).json({
      message: "Order item deleted successfully",
      item,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete order item",
    });
  }
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};