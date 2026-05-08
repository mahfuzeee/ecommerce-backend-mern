const Review = require("../models/review.model");

const reviewRepository = {
  create: async (reviewData) => {
    const review = new Review(reviewData);
    return await review.save();
  },

  findByProductId: async (productId) => {
    return await Review.find({ product: productId });
  },

  findByUserId: async (userId) => {
    return await Review.find({ user: userId });
  },

  update: async (id, reviewData) => {
    return await Review.findByIdAndUpdate(id, reviewData, { new: true });
  },

  delete: async (id) => {
    return await Review.findByIdAndDelete(id);
  },
};

module.exports = reviewRepository;
