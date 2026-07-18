const categoryRepository = require("../repositories/category.repository");
const productRepository = require("../repositories/product.repository");
const ApiError = require("../utils/ApiError");
const logger = require("../utils/logger");

const categoryService = {
  createCategory: async (category) => {
    return await categoryRepository.createCategory(category);
  },

  //Get all categories with pagination
  getAllCategories: async (page, limit) => {
    return await categoryRepository.getAllCategories(page, limit);
  },

  getCategoryById: async (id) => {
    const category = await categoryRepository.getCategoryById(id);
    if (!category) {
      throw new ApiError(404, "Category not found");
    }
    return category;
  },

  updateCategory: async (id, categoryData) => {
    const updatedCategory = await categoryRepository.updateCategory(
      id,
      categoryData,
    );
    if (!updatedCategory) {
      throw new ApiError(404, "Category not found");
    }
    return updatedCategory;
  },

  //Delete a category by id by admin
  deleteCategory: async (id) => {
    const products = await productRepository.getProductsByCategoryId(id);
    //logger.info(`Products in category ${id}: ${products.length}`);

    if (Number(products.length) > 0) {
      throw new ApiError(400, "Category has products");
    }

    const child = await categoryRepository.getCategoriesByParent(id);
    //logger.info(`Child categories in category ${id}: ${child.length}`);
    if (Number(child.length) > 0) {
      throw new ApiError(400, "Category has child categories");
    }

    const deletedCategory = await categoryRepository.deleteCategory(id);
    if (!deletedCategory) {
      throw new ApiError(404, "Category not found");
    }
    return deletedCategory;
  },
};

module.exports = categoryService;
