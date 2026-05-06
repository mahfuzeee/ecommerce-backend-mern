const Product = require("../models/product.model");
const logger = require("../utils/logger");

const productRepository = {
  createProduct: async (product) => {
    return await Product.create(product);
  },
  getAllProducts: async () => {
    return await Product.find().sort({ createdAt: -1 });
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
};

module.exports = productRepository;
