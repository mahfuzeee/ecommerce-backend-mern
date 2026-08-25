const Brand = require("../models/brand.model");
const Product = require("../models/product.model");
const ApiError = require("../utils/ApiError");

const brandRepository = {
  createBrand: async (brand) => {
    return await Brand.create(brand);
  },

  ///Get all brands with pagination
  getAllBrands: async (page, limit) => {
    const skip = (page - 1) * limit;

    const sortStage = { createdAt: -1 };

    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
          {
            $lookup: {
              from: Product.collection.name,
              let: { brandId: "$_id" },
              pipeline: [
                { $match: { $expr: { $eq: ["$brand", "$$brandId"] } } },
                { $count: "count" },
              ],
              as: "productCount",
            },
          },
          {
            $set: {
              productCount: {
                $ifNull: [{ $arrayElemAt: ["$productCount.count", 0] }, 0],
              },
            },
          },
          { $project: { updatedAt: 0 } },
        ],
      },
    };
    const pipeline = [facetStage];
    const result = await Brand.aggregate(pipeline);
    const totalBrands = result[0]?.totalCount[0]?.count || 0;
    const brands = result[0]?.data || [];

    return { brands, totalBrands };
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
