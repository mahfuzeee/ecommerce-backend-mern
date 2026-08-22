const Review = require("../models/review.model");
const mongoose = require("mongoose");

const reviewRepository = {
  create: async (reviewData) => {
    try {
      const { user_id, product_id, invoice_id, description, rating, comment } =
        reviewData;

      const data = await Review.updateOne(
        { user_id, product_id, invoice_id },
        { user_id, product_id, invoice_id, description, rating, comment },
        { upsert: true, new: true },
      );
      return data;
    } catch (error) {
      throw error;
    }
  },

  getAllReviews: async (query) => {
    const {
      page = 1,
      limit = 10,
      sortBy = "createdAt",
      order = "desc",
    } = query;
    const pageNumber = Math.max(Number(page) || 1, 1);
    const limitNumber = Math.max(Number(limit) || 10, 1);
    const skip = (pageNumber - 1) * limitNumber;
    const sortOrder = order === "asc" ? 1 : -1;

    const reviews = await Review.aggregate([
      {
        $facet: {
          totalCount: [{ $count: "count" }],
          reviews: [
            { $sort: { [sortBy]: sortOrder } },
            { $skip: skip },
            { $limit: limitNumber },
            {
              $lookup: {
                from: "users",
                localField: "user_id",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $unwind: {
                path: "$user",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "product_id",
                foreignField: "_id",
                as: "product",
              },
            },
            {
              $unwind: {
                path: "$product",
                preserveNullAndEmptyArrays: true,
              },
            },
            {
              $project: {
                _id: 1,
                user_id: 1,
                product_id: 1,
                invoice_id: 1,
                description: 1,
                rating: 1,
                comment: 1,
                createdAt: 1,
                user: { _id: 1, name: 1, email: 1 },
                product: { _id: 1, name: 1, price: 1, images: 1 },
              },
            },
          ],
        },
      },
    ]);

    const result = reviews[0];
    return {
      totalCount: result.totalCount[0]?.count || 0,
      reviews: result.reviews,
    };
  },
  // This method is added to retrieve all reviews for a specific product
  getReviewsByProduct: async (productId) => {
    try {
      const productObjectId = new mongoose.Types.ObjectId(productId);

      const matchStage = { $match: { product_id: productObjectId } };
      const joinWithUserStage = {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      };
      const unwindUserStage = { $unwind: "$user" };

      const projectionStage = {
        $project: {
          _id: 1,
          description: 1,
          rating: 1,
          comment: 1,
          createdAt: 1,
          user: {
            _id: 1,
            name: 1,
          },
        },
      };

      return await Review.aggregate([
        matchStage,
        joinWithUserStage,
        unwindUserStage,
        projectionStage,
      ]);
    } catch (error) {
      throw new Error("Invalid product ID");
    }
  },

  getReviewsByUser: async (userId) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    return await Review.find({ user_id: userObjectId });
  },

  update: async (id, reviewData) => {
    return await Review.findByIdAndUpdate(id, reviewData, { new: true });
  },

  delete: async (id) => {
    return await Review.findByIdAndDelete(id);
  },

  //Count Reviews
  count: async () => {
    return await Review.countDocuments();
  },
};

module.exports = reviewRepository;
