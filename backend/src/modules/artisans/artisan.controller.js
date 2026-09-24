const artisanService = require("./artisan.service");

const getAllArtisans = async (req, res) => {
  try {
    const artisans = await artisanService.getAllArtisans();

    res.status(200).json({
      data: artisans,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get artisans",
    });
  }
};

const getArtisanById = async (req, res) => {
  try {
    const { id } = req.params;

    const artisan = await artisanService.getArtisanById(id);

    if (!artisan) {
      return res.status(404).json({
        message: "Artisan not found",
      });
    }

    res.status(200).json({
      data: artisan,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to get artisan",
    });
  }
};

const createArtisan = async (req, res) => {
  try {
    const artisanData = {
      ...req.body,
      user_id: req.user.role === "admin"
        ? req.body.user_id
        : req.user.userId,
    };

    const artisan = await artisanService.createArtisan(
      artisanData
    );

    res.status(201).json({
      message: "Artisan created successfully",
      data: artisan,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to create artisan",
    });
  }
};

const updateArtisan = async (req, res) => {
  try {
    const { id } = req.params;

    const existingArtisan =
      await artisanService.getArtisanById(id);

    if (!existingArtisan) {
      return res.status(404).json({
        message: "Artisan not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingArtisan.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const artisan = await artisanService.updateArtisan(
      id,
      req.body
    );

    res.status(200).json({
      message: "Artisan updated successfully",
      data: artisan,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to update artisan",
    });
  }
};

const deleteArtisan = async (req, res) => {
  try {
    const { id } = req.params;

    const existingArtisan =
      await artisanService.getArtisanById(id);

    if (!existingArtisan) {
      return res.status(404).json({
        message: "Artisan not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingArtisan.user_id) !== Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const artisan = await artisanService.deleteArtisan(id);

    res.status(200).json({
      message: "Artisan deleted successfully",
      data: artisan,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to delete artisan",
    });
  }
};

module.exports = {
  getAllArtisans,
  getArtisanById,
  createArtisan,
  updateArtisan,
  deleteArtisan,
};