const orderItemService = require("./order-item.service");

const getAllOrderItems = async (req, res) => {
  try {
    const items = await orderItemService.getAllOrderItems();

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
    const item = await orderItemService.createOrderItem(req.body);

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

    const item = await orderItemService.updateOrderItem(
      id,
      req.body
    );

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

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

    const item = await orderItemService.deleteOrderItem(id);

    if (!item) {
      return res.status(404).json({
        message: "Order item not found",
      });
    }

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