const validateCreateCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "name is required",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      message: "description must be a string",
    });
  }

  next();
};

const validateUpdateCategory = (req, res, next) => {
  const { name, description } = req.body;

  if (name === undefined && description === undefined) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    name !== undefined &&
    (typeof name !== "string" || !name.trim())
  ) {
    return res.status(400).json({
      message: "name cannot be empty",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      message: "description must be a string",
    });
  }

  next();
};

module.exports = {
  validateCreateCategory,
  validateUpdateCategory,
};