const reviewRepository = require("./review.repository");

const getAllReviews = async () => {
  return await reviewRepository.getAllReviews();
};

const getReviewById = async (id) => {
  return await reviewRepository.getReviewById(id);
};

const getReviewsByProduct = async (productId) => {
  return await reviewRepository.getReviewsByProduct(productId);
};

const getProductRatingSummary = async (productId) => {
  return await reviewRepository.getProductRatingSummary(productId);
};

const createReview = async (reviewData) => {
  return await reviewRepository.createReview(reviewData);
};

const updateReview = async (id, reviewData) => {
  return await reviewRepository.updateReview(id, reviewData);
};

const deleteReview = async (id) => {
  return await reviewRepository.deleteReview(id);
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