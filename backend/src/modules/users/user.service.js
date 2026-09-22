const userRepository = require("./user.repository");

const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

const getUserById = async (id) => {
  return await userRepository.getUserById(id);
};

const createUser = async (userData) => {
  return await userRepository.createUser(userData);
};

const updateUser = async (id, userData) => {
  return await userRepository.updateUser(id, userData);
};

const deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};