const express = require("express");

const {
  getMyFavorites,
  addFavorite,
  removeFavorite,
} = require("./favorite.controller");

const {
  validateFavorite,
  validateRemoveFavorite,
} = require("./favorite.validation");

const {
  authenticate,
} = require("../auth/auth.middleware");

const router = express.Router();

router.get(
  "/",
  authenticate,
  getMyFavorites
);

router.post(
  "/",
  authenticate,
  validateFavorite,
  addFavorite
);

router.delete(
  "/:productId",
  authenticate,
  validateRemoveFavorite,
  removeFavorite
);

module.exports = router;