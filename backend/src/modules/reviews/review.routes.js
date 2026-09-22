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

const {
  validateCreateReview,
  validateUpdateReview,
} = require("./review.validation");

const {
  authenticate,
} = require("../auth/auth.middleware");

const router = express.Router();

// Public routes

router.get(
  "/",
  getAllReviews
);

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

// Authenticated users

router.post(
  "/",
  authenticate,
  validateCreateReview,
  createReview
);

router.patch(
  "/:id",
  authenticate,
  validateUpdateReview,
  updateReview
);

// Authenticated users
// Ownership is checked inside the controller

router.delete(
  "/:id",
  authenticate,
  deleteReview
);

module.exports = router;