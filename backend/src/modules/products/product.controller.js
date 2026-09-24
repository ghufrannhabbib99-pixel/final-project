const productService = require("./product.service");
const artisanService = require("../artisans/artisan.service");

const getAllProducts = async (req, res) => {
  try {
    const {
      search,
      category_id,
      artisan_id,
    } = req.query;

    const products = await productService.getAllProducts({
      search,
      category_id,
      artisan_id,
    });

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
    let artisanId = req.body.artisan_id;

    if (req.user.role === "artisan") {
      const artisans =
        await artisanService.getAllArtisans();

      const myArtisan = artisans.find(
        (artisan) =>
          Number(artisan.user_id) ===
          Number(req.user.userId)
      );

      if (!myArtisan) {
        return res.status(404).json({
          message: "Artisan profile not found",
        });
      }

      artisanId = myArtisan.id;
    }

    const productData = {
      ...req.body,
      artisan_id: artisanId,
    };

    const product =
      await productService.createProduct(productData);

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    if (
      error.message === "Artisan not found" ||
      error.message === "Category not found"
    ) {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct =
      await productService.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingProduct.artisan_user_id) !==
        Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const product =
      await productService.updateProduct(
        id,
        req.body
      );

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    if (error.message === "Category not found") {
      return res.status(400).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to update product",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct =
      await productService.getProductById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (
      req.user.role !== "admin" &&
      Number(existingProduct.artisan_user_id) !==
        Number(req.user.userId)
    ) {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    const product =
      await productService.deleteProduct(id);

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
      await productService.getProductsByArtisanId(
        artisanId
      );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    if (error.message === "Artisan not found") {
      return res.status(404).json({
        message: error.message,
      });
    }

    res.status(500).json({
      message: "Failed to fetch artisan products",
    });
  }
};

const getMyProducts = async (req, res) => {
  try {
    const artisans =
      await artisanService.getAllArtisans();

    const myArtisan = artisans.find(
      (artisan) =>
        Number(artisan.user_id) ===
        Number(req.user.userId)
    );

    if (!myArtisan) {
      return res.status(404).json({
        message: "Artisan profile not found",
      });
    }

    const products =
      await productService.getProductsByArtisanId(
        myArtisan.id
      );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch my products",
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
  getMyProducts,
};