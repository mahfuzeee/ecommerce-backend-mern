const Review = require("../models/review.model");
const { getReviewsByProduct } = require("../services/review.service");
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

  // This method is added to retrieve all reviews, which can be useful for admin purposes
  getAllReviews: async (query) => {
    // Implement pagination, filtering, and sorting logic based on the query parameters
    try {
      const {
        page = 1,
        limit = 10,
        sortBy = "createdAt",
        order = "desc",
      } = query;

      const skip = (page - 1) * limit;
      const sortOrder = order === "asc" ? 1 : -1;

      const sortStage = { [sortBy]: sortOrder };
      const joinWithUserStage = {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      };
      const joinWithProductStage = {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      };

      const unwindUserStage = { $unwind: "$user" };
      const unwindProductStage = { $unwind: "$product" };

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
          product: {
            _id: 1,
            name: 1,
            price: 1,
          },
        },
      };

      const facetStage = {
        $facet: {
          totalCount: [{ $count: "count" }],
          reviews: [
            { $sort: sortStage },
            { $skip: skip },
            { $limit: limit },
            joinWithUserStage,
            unwindUserStage,
            joinWithProductStage,
            unwindProductStage,
            projectionStage,
          ],
        },
      };

      const reviews = await Review.aggregate([facetStage]);

      if (reviews.length === 0) {
        throw new Error("No reviews found");
      }

      return reviews;
    } catch (error) {
      throw error;
    }
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
};

module.exports = reviewRepository;
