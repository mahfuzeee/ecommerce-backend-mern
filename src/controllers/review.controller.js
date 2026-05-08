const reviewService = require("../services/review.service");
const ApiError = require("../utils/ApiError");

const reviewController = {
  createReview: async (req, res, next) => {
    try {
      const review = await reviewService.createReview(req.body);
      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  },

  getReviewsByProduct: async (req, res, next) => {
    try {
      const reviews = await reviewService.getReviewsByProduct(
        req.params.productId,
      );
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  },

  getReviewsByUser: async (req, res, next) => {
    try {
      const reviews = await reviewService.getReviewsByUser(req.params.userId);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  },

  updateReview: async (req, res, next) => {
    try {
      const review = await reviewService.updateReview(req.params.id, req.body);
      if (!review) {
        throw new ApiError(404, "Review not found");
      }
      res.json(review);
    } catch (error) {
      next(error);
    }
  },

  deleteReview: async (req, res, next) => {
    try {
      const review = await reviewService.deleteReview(req.params.id);
      if (!review) {
        throw new ApiError(404, "Review not found");
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reviewController;
