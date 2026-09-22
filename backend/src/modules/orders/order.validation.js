const validateCreateOrder = (req, res, next) => {
  const {
    total_amount,
    status,
  } = req.body;

  if (total_amount === undefined || total_amount === null) {
    return res.status(400).json({
      message: "total_amount is required",
    });
  }

  if (Number(total_amount) <= 0) {
    return res.status(400).json({
      message: "total_amount must be greater than 0",
    });
  }

  if (
    status !== undefined &&
    !["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)
  ) {
    return res.status(400).json({
      message: "Invalid order status",
    });
  }

  next();
};

const validateUpdateOrder = (req, res, next) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      message: "status is required",
    });
  }

  if (
    !["pending", "processing", "shipped", "delivered", "cancelled"].includes(status)
  ) {
    return res.status(400).json({
      message: "Invalid order status",
    });
  }

  next();
};

module.exports = {
  validateCreateOrder,
  validateUpdateOrder,
};