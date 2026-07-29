const Product = require("../models/product.model");
const logger = require("../utils/logger");
const objectId = require("mongoose").Types.ObjectId;

const productRepository = {
  createProduct: async (product) => {
    return await Product.create(product);
  },
  getAllProducts: async (query) => {
    try {
      const { page, limit, category_id, brand_id, remark, keyword } = query;
      const skip = (page - 1) * limit;

      let matchStage;
      if (category_id) {
        matchStage = { $match: { category: new objectId(category_id) } };
      } else if (brand_id) {
        matchStage = { $match: { brand: new objectId(brand_id) } };
      } else if (remark) {
        matchStage = { $match: { remark } };
      } else if (keyword) {
        let searchRegex = {
          $regex: keyword,
          $options: "i",
        };
        let searchParams = [{ name: searchRegex }];

        let searchStage = {
          $or: searchParams,
        };
        matchStage = { $match: { $and: [searchStage] } };
      } else {
        matchStage = { $match: {} };
      }
      const sortStage = { createdAt: -1 };
      const joinWithCategoryStage = {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      };
      const joinWithBrandStage = {
        $lookup: {
          from: "brands",
          localField: "brand",
          foreignField: "_id",
          as: "brand",
        },
      };

      const unwindCategoryStage = { $unwind: "$category" };
      const unwindBrandStage = { $unwind: "$brand" };

      const facetStage = {
        $facet: {
          totalCount: [{ $count: "count" }],
          data: [
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit },
            joinWithCategoryStage,
            joinWithBrandStage,
            unwindCategoryStage,
            unwindBrandStage,
            { $project: { updatedAt: 0 } },
          ],
        },
      };
      const pipeline = [matchStage, facetStage];
      const result = await Product.aggregate(pipeline);
      const totalProducts = result[0]?.totalCount[0]?.count || 0;
      const products = result[0]?.data || [];

      return { products, totalProducts };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  },
  //Get a product by Id
  getProductById: async (id) => {
    return await Product.findById(id);
  },
  updateProduct: async (id, product) => {
    return await Product.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  },

  //Update stock quantity of a product
  updateProductStock: async (id, quantity) => {
    const _id = new objectId(id);
    return await Product.findByIdAndUpdate(_id, {
      $inc: { stock: -parseInt(quantity) },
    });
  },

  //Restore stock quantity of a product
  restoreProductStock: async (id, quantity) => {
    const _id = new objectId(id);
    return await Product.findByIdAndUpdate(_id, {
      $inc: { stock: parseInt(quantity) },
    });
  },
  deleteProduct: async (id) => {
    return await Product.findByIdAndDelete(id);
  },

  getProductsByCategoryId: async (categoryId) => {
    return await Product.find({ category: categoryId });
  },

  // Additional repository methods for product filtering and searching
  searchProducts: async (query) => {
    const safeQuery = String(query);
    logger.info(`Searching products with query: ${safeQuery}`);
    if (!safeQuery) {
      return await Product.find();
    }
    return await Product.find({
      $or: [
        { name: { $regex: safeQuery, $options: "i" } },
        { description: { $regex: safeQuery, $options: "i" } },
      ],
    });
  },

  filterProducts: async (query) => {
    //1. Extract filter parameters from query
    const { category, brand, minPrice, maxPrice, sort, page, limit } = query;

    //2. Build the filter object based on provided parameters
    const filter = {};
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 3. Initialize the query (but don't execute it yet)

    const productQuery = Product.find(filter);

    // 4. Apply sorting
    if (sort) {
      // Allow sorting by multiple fields: ?sort=-price,rating
      const sortBy = sort.split(",").join(" ");
      productQuery.sort(sortBy);
    } else {
      productQuery.sort({ createdAt: -1 });
    }

    // 5. Apply pagination
    const pageNumber = parseInt(page) || 1;
    const pageSize = parseInt(limit) || 10;
    const skip = (pageNumber - 1) * pageSize;
    productQuery.skip(skip).limit(pageSize);

    // 6. Execute the query and return results
    const products = await productQuery;
    return products;
  },

  //Count Products
  count: async () => {
    return await Product.countDocuments();
  },
};

module.exports = productRepository;
