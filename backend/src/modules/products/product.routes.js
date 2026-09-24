const express = require("express");

const productController = require("./product.controller");

const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("./product.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

// Get all products
router.get(
  "/",
  productController.getAllProducts
);

// Get products by artisan
router.get(
  "/artisan/:artisanId",
  productController.getProductsByArtisanId
);
router.get(
  "/my",
  authenticate,
  authorize("artisan"),
  productController.getMyProducts
);
// Get product by ID
router.get(
  "/:id",
  productController.getProductById
);

// Create product
router.post(
  "/",
  authenticate,
  authorize("admin", "artisan"),
  validateCreateProduct,
  productController.createProduct
);

// Update product
router.patch(
  "/:id",
  authenticate,
  authorize("admin", "artisan"),
  validateUpdateProduct,
  productController.updateProduct
);

// Delete product
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "artisan"),
  productController.deleteProduct
);

module.exports = router;