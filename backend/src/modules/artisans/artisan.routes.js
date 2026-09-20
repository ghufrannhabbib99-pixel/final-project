const express = require("express");

const artisanController = require("./artisan.controller");

const router = express.Router();

// Get all artisans
router.get("/", artisanController.getAllArtisans);

// Get artisan by ID
router.get("/:id", artisanController.getArtisanById);

// Create artisan
router.post("/", artisanController.createArtisan);

// Update artisan
router.patch("/:id", artisanController.updateArtisan);

// Delete artisan
router.delete("/:id", artisanController.deleteArtisan);

module.exports = router;