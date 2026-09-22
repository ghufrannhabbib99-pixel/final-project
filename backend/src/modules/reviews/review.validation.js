const validateCreateReview = (req, res, next) => {
  const {
    product_id,
    rating,
    comment,
  } = req.body;

  if (
    product_id === undefined ||
    product_id === null
  ) {
    return res.status(400).json({
      message: "product_id is required",
    });
  }

  if (
    !Number.isInteger(Number(product_id)) ||
    Number(product_id) <= 0
  ) {
    return res.status(400).json({
      message: "product_id must be a valid positive integer",
    });
  }

  if (
    rating === undefined ||
    rating === null
  ) {
    return res.status(400).json({
      message: "rating is required",
    });
  }

  if (
    !Number.isInteger(Number(rating)) ||
    Number(rating) < 1 ||
    Number(rating) > 5
  ) {
    return res.status(400).json({
      message: "rating must be an integer between 1 and 5",
    });
  }

  if (
    comment !== undefined &&
    comment !== null &&
    typeof comment !== "string"
  ) {
    return res.status(400).json({
      message: "comment must be a string",
    });
  }

  next();
};

const validateUpdateReview = (req, res, next) => {
  const {
    rating,
    comment,
  } = req.body;

  if (
    rating === undefined &&
    comment === undefined
  ) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    rating !== undefined &&
    (
      !Number.isInteger(Number(rating)) ||
      Number(rating) < 1 ||
      Number(rating) > 5
    )
  ) {
    return res.status(400).json({
      message: "rating must be an integer between 1 and 5",
    });
  }

  if (
    comment !== undefined &&
    comment !== null &&
    typeof comment !== "string"
  ) {
    return res.status(400).json({
      message: "comment must be a string",
    });
  }

  next();
};

module.exports = {
  validateCreateReview,
  validateUpdateReview,
};