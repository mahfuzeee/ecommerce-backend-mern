const productRepository = require("../repositories/product.repository");
const ApiError = require("../utils/ApiError");

const productService = {
  getAllProducts: async (query) => {
    return await productRepository.getAllProducts(query);
  },
  getProductById: async (id) => {
    const product = await productRepository.getProductById(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  },
  createProduct: async (product) => {
    return await productRepository.createProduct(product);
  },
  updateProduct: async (id, payload) => {
    const product = await productRepository.updateProduct(id, payload);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  },
  deleteProduct: async (id) => {
    const product = await productRepository.deleteProduct(id);

    if (!product) {
      throw new ApiError(404, "Product not found");
    }

    return product;
  },

  // Additional service methods for product filtering and searching
  searchProducts: async (query) => {
    return await productRepository.searchProducts(query);
  },

  filterProducts: async (query) => {
    return await productRepository.filterProducts(query);
  },
};

module.exports = productService;
