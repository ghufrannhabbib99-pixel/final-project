const favoriteRepository = require("./favorite.repository");
const productRepository = require("../products/product.repository");

const getMyFavorites = async (userId) => {
  return await favoriteRepository.getFavoritesByUserId(userId);
};

const addFavorite = async (userId, productId) => {
  const product = await productRepository.getProductById(
    productId
  );

  if (!product) {
    const error = new Error("Product not found");
    error.code = "PRODUCT_NOT_FOUND";
    throw error;
  }

  const existingFavorite =
    await favoriteRepository.getFavoriteByUserAndProduct(
      userId,
      productId
    );

  if (existingFavorite) {
    const error = new Error(
      "Product is already in favorites"
    );
    error.code = "ALREADY_FAVORITE";
    throw error;
  }

  return await favoriteRepository.createFavorite(
    userId,
    productId
  );
};

const removeFavorite = async (userId, productId) => {
  return await favoriteRepository.deleteFavorite(
    userId,
    productId
  );
};

module.exports = {
  getMyFavorites,
  addFavorite,
  removeFavorite,
};