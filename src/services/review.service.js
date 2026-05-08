const reviewRepository = require("../repositories/review.repository");

const reviewService = {
  createReview: async (reviewData) => {
    return await reviewRepository.create(reviewData);
  },

  getReviewsByProduct: async (productId) => {
    return await reviewRepository.findByProductId(productId);
  },

  getReviewsByUser: async (userId) => {
    return await reviewRepository.findByUserId(userId);
  },

  updateReview: async (id, reviewData) => {
    return await reviewRepository.update(id, reviewData);
  },

  deleteReview: async (id) => {
    return await reviewRepository.delete(id);
  },
};

module.exports = reviewService;
