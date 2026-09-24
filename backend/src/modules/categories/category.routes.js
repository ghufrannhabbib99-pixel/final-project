const express = require("express");

const categoryController = require("./category.controller");

const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("./category.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

router.get(
  "/",
  categoryController.getAllCategories
);

router.get(
  "/:id",
  categoryController.getCategoryById
);

router.post(
  "/",
  authenticate,
  authorize("admin"),
  validateCreateCategory,
  categoryController.createCategory
);

router.patch(
  "/:id",
  authenticate,
  authorize("admin"),
  validateUpdateCategory,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  categoryController.deleteCategory
);

module.exports = router;