const categoryService = require("./category.service");

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch categories",
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryService.getCategoryById(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch category",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryService.updateCategory(id, req.body);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await categoryService.deleteCategory(id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    res.status(200).json({
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete category",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};