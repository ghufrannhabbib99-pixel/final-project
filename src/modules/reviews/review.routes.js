const express = require("express");

const {
  getAllReviews,
  getReviewById,
  getReviewsByProduct,
  getProductRatingSummary,
  createReview,
  updateReview,
  deleteReview,
} = require("./review.controller");

const validateReview = require("./review.validation");

const router = express.Router();

router.get("/", getAllReviews);

router.get(
  "/product/:productId",
  getReviewsByProduct
);

router.get(
  "/product/:productId/summary",
  getProductRatingSummary
);

router.get(
  "/:id",
  getReviewById
);

router.post(
  "/",
  validateReview,
  createReview
);

router.put(
  "/:id",
  validateReview,
  updateReview
);

router.delete(
  "/:id",
  deleteReview
);

module.exports = router;