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
    const review = await reviewService.getReviewById(req.params.id);

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
    const reviews = await reviewService.getReviewsByProduct(
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
    const summary = await reviewService.getProductRatingSummary(
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
    const review = await reviewService.createReview(req.body);

    res.status(201).json(review);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to create review",
    });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.body
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
      message: "Failed to update review",
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await reviewService.deleteReview(req.params.id);

    if (!review) {
      return res.status(404).json({
        message: "Review not found",
      });
    }

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