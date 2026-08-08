const brandService = require("../services/brand.service");
const sendResponse = require("../utils/apiResponse");

const brandController = {
  //Create a new brand by admin
  createBrand: async (req, res, next) => {
    try {
      const brand = await brandService.createBrand(req.body);
      return sendResponse(res, {
        message: "Brand created successfully",
        data: brand,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get all brands with pagination
  getAllBrands: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const { brands, totalBrands } = await brandService.getAllBrands(
        page,
        limit,
      );
      return sendResponse(res, {
        message: "Brands retrieved successfully",
        data: { brands, totalBrands },
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get a single brand by id
  getBrandById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const brand = await brandService.getBrandById(id);

      return sendResponse(res, {
        message: "Brand retrieved successfully",
        data: brand,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Update a brand by id by admin
  updateBrand: async (req, res, next) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const existingBrand = await brandService.getBrandById(id);
      const brand = await brandService.updateBrand(id, data);

      return sendResponse(res, {
        message: `${existingBrand.name} updated successfully`,
        data: brand,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Delete a brand by id by admin
  deleteBrand: async (req, res, next) => {
    try {
      const id = req.params.id;
      const brand = await brandService.deleteBrand(id);

      return sendResponse(res, {
        message: `${brand.name} deleted successfully`,
        data: brand.name,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = brandController;
