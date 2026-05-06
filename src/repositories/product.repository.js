const Product = require("../models/product.model");

const productRepository = {
  createProduct: async (product) => {
    return await Product.create(product);
  },
  getAllProducts: async () => {
    return await Product.find().sort({ createdAt: -1 });
  },
  getProductById: async (id) => {
    return await Product.findById(id);
  },
  updateProduct: async (id, product) => {
    return await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  },
  deleteProduct: async (id) => {
    return await Product.findByIdAndDelete(id);
  },

  getProductsByCategoryId: async (categoryId) => {
    return await Product.find({ category: categoryId });
  },
};

module.exports = productRepository;
