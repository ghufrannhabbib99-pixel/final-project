const express = require("express");

const categoryController = require("./category.controller");

const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("./category.validation");

const router = express.Router();

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategoryById);

router.post(
  "/",
  validateCreateCategory,
  categoryController.createCategory
);

router.patch(
  "/:id",
  validateUpdateCategory,
  categoryController.updateCategory
);

router.delete("/:id", categoryController.deleteCategory);

module.exports = router;