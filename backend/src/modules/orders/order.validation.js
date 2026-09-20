const validateCreateOrder = (req, res, next) => {
  const {
    user_id,
    total_amount,
    shipping_address,
  } = req.body;

  if (!user_id || total_amount === undefined) {
    return res.status(400).json({
      message: "user_id and total_amount are required",
    });
  }

  if (Number(total_amount) < 0) {
    return res.status(400).json({
      message: "total_amount cannot be negative",
    });
  }

  if (
    shipping_address !== undefined &&
    typeof shipping_address !== "string"
  ) {
    return res.status(400).json({
      message: "shipping_address must be a string",
    });
  }

  next();
};

const validateUpdateOrder = (req, res, next) => {
  const {
    status,
    shipping_address,
  } = req.body;

  if (
    status === undefined &&
    shipping_address === undefined
  ) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    status !== undefined &&
    typeof status !== "string"
  ) {
    return res.status(400).json({
      message: "status must be a string",
    });
  }

  if (
    shipping_address !== undefined &&
    typeof shipping_address !== "string"
  ) {
    return res.status(400).json({
      message: "shipping_address must be a string",
    });
  }

  next();
};

module.exports = {
  validateCreateOrder,
  validateUpdateOrder,
};