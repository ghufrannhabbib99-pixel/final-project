const express = require("express");

const productController = require("./product.controller");

const {
  validateCreateProduct,
  validateUpdateProduct,
} = require("./product.validation");

const router = express.Router();

router.get("/", productController.getAllProducts);

router.get(
  "/artisan/:artisanId",
  productController.getProductsByArtisanId
);

router.get("/:id", productController.getProductById);

router.post(
  "/",
  validateCreateProduct,
  productController.createProduct
);

router.patch(
  "/:id",
  validateUpdateProduct,
  productController.updateProduct
);

router.delete(
  "/:id",
  productController.deleteProduct
);

module.exports = router;