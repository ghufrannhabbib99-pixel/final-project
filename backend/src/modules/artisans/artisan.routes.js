const express = require("express");

const artisanController = require("./artisan.controller");

const {
  validateCreateArtisan,
  validateUpdateArtisan,
} = require("./artisan.validation");

const {
  authenticate,
  authorize,
} = require("../auth/auth.middleware");

const router = express.Router();

// Get all artisans
router.get(
  "/",
  artisanController.getAllArtisans
);

// Get artisan by ID
router.get(
  "/:id",
  artisanController.getArtisanById
);

// Create artisan
router.post(
  "/",
  authenticate,
  authorize("admin", "artisan"),
  validateCreateArtisan,
  artisanController.createArtisan
);

// Update artisan
router.patch(
  "/:id",
  authenticate,
  authorize("admin", "artisan"),
  validateUpdateArtisan,
  artisanController.updateArtisan
);

// Delete artisan
router.delete(
  "/:id",
  authenticate,
  authorize("admin", "artisan"),
  artisanController.deleteArtisan
);

module.exports = router;