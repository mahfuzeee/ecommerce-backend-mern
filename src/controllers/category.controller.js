const categoryService = require("../services/category.service");
const sendResponse = require("../utils/apiResponse");

const categoryController = {
  //Create a new category by admin
  createCategory: async (req, res, next) => {
    try {
      const category = await categoryService.createCategory(req.body);
      return sendResponse(res, {
        message: "Category created successfully",
        data: category,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get all categories with pagination
  getAllCategories: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const categories = await categoryService.getAllCategories(page, limit);
      return sendResponse(res, {
        message: "Categories retrieved successfully",
        data: categories,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get a single category by id
  getCategoryById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const category = await categoryService.getCategoryById(id);

      return sendResponse(res, {
        message: "Category retrieved successfully",
        data: category,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Update a category by id by admin
  updateCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const existingCategory = await categoryService.getCategoryById(id);
      const category = await categoryService.updateCategory(id, data);

      return sendResponse(res, {
        message: `${existingCategory.name} updated successfully`,
        data: category,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Delete a category by id by admin
  deleteCategory: async (req, res, next) => {
    try {
      const id = req.params.id;
      const existingCategory = await categoryService.getCategoryById(id);
      const category = await categoryService.deleteCategory(id);

      return sendResponse(res, {
        message: `${existingCategory.name} deleted successfully`,
        data: category,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = categoryController;
