const validateFavorite = (req, res, next) => {
  const { product_id } = req.body || {};

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

  next();
};

const validateRemoveFavorite = (req, res, next) => {
  const { productId } = req.params;

  if (
    !Number.isInteger(Number(productId)) ||
    Number(productId) <= 0
  ) {
    return res.status(400).json({
      message: "productId must be a valid positive integer",
    });
  }

  next();
};

module.exports = {
  validateFavorite,
  validateRemoveFavorite,
};