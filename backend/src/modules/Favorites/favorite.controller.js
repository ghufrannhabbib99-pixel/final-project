const favoriteService = require("./favorite.service");

const getMyFavorites = async (req, res) => {
  try {
    const favorites =
      await favoriteService.getMyFavorites(
        req.user.userId
      );

    res.status(200).json(favorites);
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to fetch favorites",
    });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { product_id } = req.body;

    const favorite =
      await favoriteService.addFavorite(
        req.user.userId,
        product_id
      );

    res.status(201).json({
      message: "Product added to favorites",
      favorite,
    });
  } catch (error) {
    console.error(error.message);

    if (error.code === "PRODUCT_NOT_FOUND") {
      return res.status(404).json({
        message: error.message,
      });
    }

    if (error.code === "ALREADY_FAVORITE") {
      return res.status(409).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to add favorite",
    });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;

    const favorite =
      await favoriteService.removeFavorite(
        req.user.userId,
        productId
      );

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    res.status(200).json({
      message: "Product removed from favorites",
      favorite,
    });
  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Failed to remove favorite",
    });
  }
};

module.exports = {
  getMyFavorites,
  addFavorite,
  removeFavorite,
};