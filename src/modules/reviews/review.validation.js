const validateReview = (req, res, next) => {
  const {
    user_id,
    product_id,
    rating,
  } = req.body;

  if (!user_id || !product_id || rating === undefined) {
    return res.status(400).json({
      message: "user_id, product_id, and rating are required",
    });
  }

  if (!Number.isInteger(Number(rating)) || Number(rating) < 1 || Number(rating) > 5) {
    return res.status(400).json({
      message: "Rating must be an integer between 1 and 5",
    });
  }

  next();
};

module.exports = validateReview;