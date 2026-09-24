const orderItemRepository = require("./order-item.repository");

const getAllOrderItems = async () => {
  return await orderItemRepository.getAllOrderItems();
};

const getOrderItemById = async (id) => {
  return await orderItemRepository.getOrderItemById(id);
};

const createOrderItem = async (itemData) => {
  return await orderItemRepository.createOrderItem(itemData);
};

const updateOrderItem = async (id, itemData) => {
  return await orderItemRepository.updateOrderItem(
    id,
    itemData
  );
};

const deleteOrderItem = async (id) => {
  return await orderItemRepository.deleteOrderItem(id);
};

module.exports = {
  getAllOrderItems,
  getOrderItemById,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};