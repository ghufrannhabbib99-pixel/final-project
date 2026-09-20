const productService = require("./product.service");

const getAllProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch product",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await productService.createProduct(req.body);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.updateProduct(id, req.body);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productService.deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
};

const getProductsByArtisanId = async (req, res) => {
  try {
    const { artisanId } = req.params;

    const products =
      await productService.getProductsByArtisanId(artisanId);

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch artisan products",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByArtisanId,
};