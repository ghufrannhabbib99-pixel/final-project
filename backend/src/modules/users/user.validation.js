const validateCreateUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "name, email and password are required",
    });
  }

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({
      message: "name cannot be empty",
    });
  }

  if (typeof email !== "string" || !email.trim()) {
    return res.status(400).json({
      message: "email cannot be empty",
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({
      message: "password must be at least 6 characters",
    });
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const {
    name,
    email,
    password,
    role,
  } = req.body;

  if (
    name === undefined &&
    email === undefined &&
    password === undefined &&
    role === undefined
  ) {
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
    email !== undefined &&
    (typeof email !== "string" || !email.trim())
  ) {
    return res.status(400).json({
      message: "email cannot be empty",
    });
  }

  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 6)
  ) {
    return res.status(400).json({
      message: "password must be at least 6 characters",
    });
  }

  if (
    role !== undefined &&
    (typeof role !== "string" || !role.trim())
  ) {
    return res.status(400).json({
      message: "role cannot be empty",
    });
  }

  next();
};

module.exports = {
  validateCreateUser,
  validateUpdateUser,
};