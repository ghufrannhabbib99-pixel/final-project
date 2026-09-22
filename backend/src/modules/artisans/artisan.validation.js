const validateCreateArtisan = (req, res, next) => {
  const {
    craft_name,
    bio,
    city,
    experience_years,
    profile_image,
  } = req.body;

  if (!craft_name || !craft_name.trim()) {
    return res.status(400).json({
      message: "craft_name is required",
    });
  }

  if (experience_years !== undefined) {
    if (
      Number.isNaN(Number(experience_years)) ||
      Number(experience_years) < 0
    ) {
      return res.status(400).json({
        message: "experience_years must be a valid non-negative number",
      });
    }
  }

  next();
};

const validateUpdateArtisan = (req, res, next) => {
  const allowedFields = [
    "craft_name",
    "bio",
    "city",
    "experience_years",
    "profile_image",
  ];

  const hasAllowedField = allowedFields.some(
    (field) => req.body[field] !== undefined
  );

  if (!hasAllowedField) {
    return res.status(400).json({
      message: "At least one field is required for update",
    });
  }

  if (
    req.body.craft_name !== undefined &&
    (!req.body.craft_name ||
      !req.body.craft_name.trim())
  ) {
    return res.status(400).json({
      message: "craft_name cannot be empty",
    });
  }

  if (req.body.experience_years !== undefined) {
    if (
      Number.isNaN(Number(req.body.experience_years)) ||
      Number(req.body.experience_years) < 0
    ) {
      return res.status(400).json({
        message: "experience_years must be a valid non-negative number",
      });
    }
  }

  next();
};

module.exports = {
  validateCreateArtisan,
  validateUpdateArtisan,
};