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
      const product = await productService.getProductById(req.params.id);

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
};

module.exports = productController;
