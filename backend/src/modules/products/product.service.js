const productRepository = require("./product.repository");
const artisanRepository = require("../artisans/artisan.repository");
const categoryRepository = require("../categories/category.repository");

const getAllProducts = async (filters = {}) => {
  return await productRepository.getAllProducts(filters);
};

const getProductById = async (id) => {
  return await productRepository.getProductById(id);
};

const createProduct = async (productData) => {
  const {
    artisan_id,
    category_id,
  } = productData;

  const artisan =
    await artisanRepository.getArtisanById(artisan_id);

  if (!artisan) {
    throw new Error("Artisan not found");
  }

  if (category_id !== undefined && category_id !== null) {
    const category =
      await categoryRepository.getCategoryById(category_id);

    if (!category) {
      throw new Error("Category not found");
    }
  }

  return await productRepository.createProduct(productData);
};

const updateProduct = async (id, productData) => {
  const existingProduct =
    await productRepository.getProductById(id);

  if (!existingProduct) {
    return null;
  }

  if (
    productData.category_id !== undefined &&
    productData.category_id !== null
  ) {
    const category =
      await categoryRepository.getCategoryById(
        productData.category_id
      );

    if (!category) {
      throw new Error("Category not found");
    }
  }

  return await productRepository.updateProduct(
    id,
    productData
  );
};

const deleteProduct = async (id) => {
  return await productRepository.deleteProduct(id);
};

const getProductsByArtisanId = async (artisanId) => {
  const artisan =
    await artisanRepository.getArtisanById(artisanId);

  if (!artisan) {
    throw new Error("Artisan not found");
  }

  return await productRepository.getProductsByArtisanId(
    artisanId
  );
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByArtisanId,
};