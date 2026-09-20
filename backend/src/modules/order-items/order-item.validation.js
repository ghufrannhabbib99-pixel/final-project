const validateCreateOrderItem = (req, res, next) => {
  const {
    order_id,
    product_id,
    quantity,
    price,
  } = req.body;

  if (
    order_id === undefined ||
    product_id === undefined ||
    quantity === undefined ||
    price === undefined
  ) {
    return res.status(400).json({
      message: "order_id, product_id, quantity and price are required",
    });
  }

  if (Number(quantity) <= 0) {
    return res.status(400).json({
      message: "quantity must be greater than 0",
    });
  }

  if (Number(price) < 0) {
    return res.status(400).json({
      message: "price cannot be negative",
    });
  }

  next();
};

const validateUpdateOrderItem = (req, res, next) => {
  const { quantity, price } = req.body;

  if (
    quantity === undefined &&
    price === undefined
  ) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    quantity !== undefined &&
    Number(quantity) <= 0
  ) {
    return res.status(400).json({
      message: "quantity must be greater than 0",
    });
  }

  if (
    price !== undefined &&
    Number(price) < 0
  ) {
    return res.status(400).json({
      message: "price cannot be negative",
    });
  }

  next();
};

module.exports = {
  validateCreateOrderItem,
  validateUpdateOrderItem,
};