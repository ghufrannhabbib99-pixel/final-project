const orderService = require("./order.service");

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderService.getOrderById(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create order",
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderService.updateOrder(id, req.body);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update order",
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await orderService.deleteOrder(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order deleted successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete order",
    });
  }
};
const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await orderService.getOrdersByUserId(userId);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch user orders",
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
};