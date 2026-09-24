const reviewService = require("./review.service");

const getAllReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getAllReviews();

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get reviews",
    });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await reviewService.getReviewById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get review",
    });
  }
};

const getReviewsByProduct = async (req, res) => {
  try {
    const reviews =
      await reviewService.getReviewsByProduct(
        req.params.productId
      );

    res.status(200).json(reviews);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get product reviews",
    });
  }
};

const getProductRatingSummary = async (req, res) => {
  try {
    const summary =
      await reviewService.getProductRatingSummary(
        req.params.productId
      );

    res.status(200).json(summary);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get product rating summary",
    });
  }
};

const createReview = async (req, res) => {
  try {
    const reviewData = {
      ...req.body,
      user_id: req.user.userId,
    };

    const review =
      await reviewService.createReview(reviewData);

    res.status(201).json(review);
  } catch (error) {
    console.error(error.message);

    if (error.code === "PRODUCT_NOT_PURCHASED") {
      return res.status(403).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const { id } = req.params;

    const existingReview =
      await reviewService.getReviewById(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingReview.user_id) !==
        Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const review =
      await reviewService.updateReview(
        id,
        req.body
      );

    res.status(200).json(review);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to update review",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const existingReview =
      await reviewService.getReviewById(id);

    if (!existingReview) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingReview.user_id) !==
        Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const review =
      await reviewService.deleteReview(id);

    res.status(200).json({
      message: "Review deleted successfully",
      review,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to delete review",
    });
  }
};

module.exports = {
  getAllReviews,
  getReviewById,
  getReviewsByProduct,
  getProductRatingSummary,
  createReview,
  updateReview,
  deleteReview,
};