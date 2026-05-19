const Brand = require("../models/brand.model");
const ApiError = require("../utils/ApiError");

const brandRepository = {
  createBrand: async (brand) => {
    return await Brand.create(brand);
  },

  getAllBrands: async () => {
    return await Brand.find().sort({ name: 1 });
  },

  getBrandById: async (id) => {
    return await Brand.findById(id);
  },

  updateBrand: async (id, brandData) => {
    return await Brand.findByIdAndUpdate(id, brandData, { new: true });
  },

  deleteBrand: async (id) => {
    return await Brand.findByIdAndDelete(id);
  },

  //Count Brands
  count: async () => {
    return await Brand.countDocuments();
  },
};

module.exports = brandRepository;
