const brandRepository = require("../repositories/brand.repository");
const ApiError = require("../utils/ApiError");

const brandService = {
  createBrand: async (brand) => {
    if (!brand.slug) {
      brand.slug = brand.name.trim().toLowerCase().replace(/\s+/g, "-");
    }
    return await brandRepository.createBrand(brand);
  },

  getAllBrands: async (page, limit) => {
    return await brandRepository.getAllBrands(page, limit);
  },

  getBrandById: async (id) => {
    const brand = await brandRepository.getBrandById(id);
    if (!brand) {
      throw new ApiError(404, "Brand not found");
    }
    return brand;
  },

  updateBrand: async (id, brandData) => {
    const updatedBrand = await brandRepository.updateBrand(id, brandData);
    if (!updatedBrand) {
      throw new ApiError(404, "Brand not found");
    }
    return updatedBrand;
  },

  deleteBrand: async (id) => {
    const deletedBrand = await brandRepository.deleteBrand(id);
    if (!deletedBrand) {
      throw new ApiError(404, "Brand not found");
    }
    return deletedBrand;
  },
};

module.exports = brandService;
