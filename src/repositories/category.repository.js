const Category = require("../models/category.model");
const ApiError = require("../utils/ApiError");

const categoryRepository = {
  createCategory: async (category) => {
    return await Category.create(category);
  },

  getAllCategories: async () => {
    return await Category.find().sort({ name: 1 });
  },

  getCategoryById: async (id) => {
    return await Category.findById(id);
  },

  updateCategory: async (id, categoryData) => {
    return await Category.findByIdAndUpdate(id, categoryData, { new: true });
  },

  deleteCategory: async (id) => {
    return await Category.findByIdAndDelete(id);
  },

  getCategoriesByParent: async (parentId) => {
    return await Category.find({ parent: parentId });
  },
};

module.exports = categoryRepository;
