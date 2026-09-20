const productRepository = require("./product.repository");

const getAllProducts = async () => {
  return await productRepository.getAllProducts();
};

const getProductById = async (id) => {
  return await productRepository.getProductById(id);
};

const createProduct = async (productData) => {
  return await productRepository.createProduct(productData);
};

const updateProduct = async (id, productData) => {
  return await productRepository.updateProduct(id, productData);
};

const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
};

const getProductsByArtisanId = async (artisanId) => {
  return await productRepository.getProductsByArtisanId(artisanId);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByArtisanId,
};