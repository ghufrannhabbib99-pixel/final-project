const validateCreateProduct = (req, res, next) => {
  const {
    name,
    description,
    price,
    stock,
  } = req.body;

  if (!name || !description || price === undefined || stock === undefined) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  if (Number(price) < 0 || Number(stock) < 0) {
    return res.status(400).json({
      message: "Price and stock cannot be negative",
    });
  }

  next();
};

const validateUpdateProduct = (req, res, next) => {
  const { name, description, price, stock } = req.body;

  if (name === undefined && description === undefined && price === undefined && stock === undefined) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (price !== undefined && Number(price) < 0) {
    return res.status(400).json({
      message: "Price cannot be negative",
    });
  }

  if (stock !== undefined && Number(stock) < 0) {
    return res.status(400).json({
      message: "status cannot be empty",
    });
  }

  next();
};

module.exports = {
  validateCreateProduct,
  validateUpdateProduct,
};