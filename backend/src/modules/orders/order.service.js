const orderRepository = require("./order.repository");

const getAllOrders = async () => {
  return await orderRepository.getAllOrders();
};

const getOrderById = async (id) => {
  return await orderRepository.getOrderById(id);
};

const createOrder = async (orderData) => {
  return await orderRepository.createOrder(orderData);
};

const updateOrder = async (id, orderData) => {
  return await orderRepository.updateOrder(id, orderData);
};

const deleteOrder = async (id) => {
  return await orderRepository.deleteOrder(id);
};

const getOrdersByUserId = async (userId) => {
  return await orderRepository.getOrdersByUserId(userId);
};
const getOrderOwner = async (orderId) => {
  return await orderRepository.getOrderOwner(orderId);
};
module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  getOrderOwner,
};