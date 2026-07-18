const Category = require("../models/category.model");
const ApiError = require("../utils/ApiError");

const categoryRepository = {
  createCategory: async (category) => {
    return await Category.create(category);
  },

  //Get all categories with pagination
  getAllCategories: async (page, limit) => {
    const skip = (page - 1) * limit;
    const sortStage = { createdAt: -1 };
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        categories: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
          { $project: { updatedAt: 0 } },
        ],
      },
    };
    const pipeline = [facetStage];
    const result = await Category.aggregate(pipeline);
    if (result.length === 0) {
      return [];
    }
    return result;
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

  //Count Categories
  count: async () => {
    return await Category.countDocuments();
  },
};

module.exports = categoryRepository;
