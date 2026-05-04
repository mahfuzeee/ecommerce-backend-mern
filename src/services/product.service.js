const productRepository = require("../repositories/product.repository");
const ApiError = require("../utils/ApiError");

const productService = {
  getAllProducts: async () => {
    return await productRepository.getAllProducts();
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
};

module.exports = productService;
