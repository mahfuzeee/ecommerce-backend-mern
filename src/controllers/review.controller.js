const reviewService = require("../services/review.service");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

const reviewController = {
  createReview: async (req, res, next) => {
    try {
      const userId = req.headers._id;

      if (!userId) {
        return next(new ApiError(401, "Unauthorized"));
      }

      const reviewData = {
        ...(req.body || {}),
        user_id: userId,
      };

      const review = await reviewService.createReview(reviewData);
      return sendResponse(res, {
        statusCode: 201,
        message: "Review created successfully",
        data: review,
      });
    } catch (error) {
      next(error);
    }
  },

  // This method is added to retrieve all reviews, which can be useful for admin purposes
  getAllReviews: async (req, res, next) => {
    try {
      const reviews = await reviewService.getAllReviews(req.query);
      return sendResponse(res, {
        message: "All reviews retrieved successfully",
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  },

  // This method is added to retrieve reviews for a specific product
  getReviewsByProduct: async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const reviews = await reviewService.getReviewsByProduct(productId);

      return sendResponse(res, {
        message: "Reviews retrieved successfully",
        data: reviews,
      });
    } catch (error) {
      next(error);
    }
  },

  // This method is added to retrieve reviews made by a specific user
  getReviewsByUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const reviews = await reviewService.getReviewsByUser(userId);
      return sendResponse(res, {
        message: "Reviews retrieved successfully",
        data: reviews,
      });
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
      return sendResponse(res, {
        message: "Review updated successfully",
        data: review,
      });
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
      return sendResponse(res, {
        statusCode: 204,
        message: "Review deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = reviewController;
