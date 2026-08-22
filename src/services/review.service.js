const reviewRepository = require("../repositories/review.repository");

const reviewService = {
  createReview: async (reviewData) => {
    return await reviewRepository.create(reviewData);
  },
  // This method is added to retrieve all reviews, which can be useful for admin purposes
  getAllReviews: async (query) => {
    // For simplicity, we will just return all reviews here
    return await reviewRepository.getAllReviews(query);
  },
  getReviewsByProduct: async (productId) => {
    return await reviewRepository.getReviewsByProduct(productId);
  },

  getReviewsByUser: async (userId) => {
    return await reviewRepository.getReviewsByUser(userId);
  },

  updateReview: async (id, reviewData) => {
    return await reviewRepository.update(id, reviewData);
  },

  deleteReview: async (id) => {
    return await reviewRepository.delete(id);
  },
};

module.exports = reviewService;
