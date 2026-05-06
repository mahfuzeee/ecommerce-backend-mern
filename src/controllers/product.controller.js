const productService = require("../services/product.service");
const sendResponse = require("../utils/apiResponse");

const productController = {
  getAllProducts: async (_req, res, next) => {
    try {
      const products = await productService.getAllProducts();

      return sendResponse(res, {
        message: "Products fetched successfully",
        data: products,
      });
    } catch (error) {
      return next(error);
    }
  },

  getProductById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const product = await productService.getProductById(id.toString());

      return sendResponse(res, {
        message: "Product fetched successfully",
        data: product,
      });
    } catch (error) {
      return next(error);
    }
  },

  createProduct: async (req, res, next) => {
    try {
      const product = await productService.createProduct(req.body);

      return sendResponse(res, {
        statusCode: 201,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      return next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body,
      );

      return sendResponse(res, {
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      await productService.deleteProduct(req.params.id);

      return sendResponse(res, {
        message: "Product deleted successfully",
        data: null,
      });
    } catch (error) {
      return next(error);
    }
  },

  // Additional controller methods for product filtering and searching
  searchProducts: async (req, res, next) => {
    try {
      const { q } = req.query;
      const query = q || "";
      const products = await productService.searchProducts(query);

      return sendResponse(res, {
        message: "Products searched successfully",
        data: products,
      });
    } catch (error) {
      return next(error);
    }
  },

  filterProducts: async (req, res, next) => {
    try {
      const products = await productService.filterProducts(req.query);

      return sendResponse(res, {
        message: "Products filtered successfully",
        data: products,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = productController;
