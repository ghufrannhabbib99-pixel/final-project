const validateCreateProduct = (req, res, next) => {
  const {
    name,
    description,
    price,
    stock_quantity,
  } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "name is required",
    });
  }

  if (
    description === undefined ||
    typeof description !== "string" ||
    !description.trim()
  ) {
    return res.status(400).json({
      message: "description is required",
    });
  }

  if (price === undefined || price === null) {
    return res.status(400).json({
      message: "price is required",
    });
  }

  if (
    stock_quantity === undefined ||
    stock_quantity === null
  ) {
    return res.status(400).json({
      message: "stock_quantity is required",
    });
  }

  if (
    Number.isNaN(Number(price)) ||
    Number(price) < 0
  ) {
    return res.status(400).json({
      message: "price must be a valid non-negative number",
    });
  }

  if (
    !Number.isInteger(Number(stock_quantity)) ||
    Number(stock_quantity) < 0
  ) {
    return res.status(400).json({
      message:
        "stock_quantity must be a non-negative integer",
    });
  }

  next();
};

const validateUpdateProduct = (req, res, next) => {
  const {
    name,
    description,
    price,
    stock_quantity,
    category_id,
    image,
  } = req.body;

  if (
    name === undefined &&
    description === undefined &&
    price === undefined &&
    stock_quantity === undefined &&
    category_id === undefined &&
    image === undefined
  ) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    name !== undefined &&
    (
      typeof name !== "string" ||
      !name.trim()
    )
  ) {
    return res.status(400).json({
      message: "name cannot be empty",
    });
  }

  if (
    description !== undefined &&
    (
      typeof description !== "string" ||
      !description.trim()
    )
  ) {
    return res.status(400).json({
      message: "description cannot be empty",
    });
  }

  if (
    price !== undefined &&
    (
      Number.isNaN(Number(price)) ||
      Number(price) < 0
    )
  ) {
    return res.status(400).json({
      message: "price must be a valid non-negative number",
    });
  }

  if (
    stock_quantity !== undefined &&
    (
      !Number.isInteger(Number(stock_quantity)) ||
      Number(stock_quantity) < 0
    )
  ) {
    return res.status(400).json({
      message:
        "stock_quantity must be a non-negative integer",
    });
  }

  if (
    category_id !== undefined &&
    category_id !== null &&
    !Number.isInteger(Number(category_id))
  ) {
    return res.status(400).json({
      message: "category_id must be a valid integer",
    });
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};