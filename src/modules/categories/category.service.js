const categoryRepository = require("./category.repository");

const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

const getCategoryById = async (id) => {
  return await categoryRepository.getCategoryById(id);
};

const createCategory = async (categoryData) => {
  return await categoryRepository.createCategory(categoryData);
};

const updateCategory = async (id, categoryData) => {
  return await categoryRepository.updateCategory(id, categoryData);
};

const deleteCategory = async (id) => {
  return await categoryRepository.deleteCategory(id);
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};