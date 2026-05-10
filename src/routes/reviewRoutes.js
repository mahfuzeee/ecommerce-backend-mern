const reviewController = require("../controllers/review.controller");
const express = require("express");
const authVerificationUser = require("../middlewares/authVerificationUser");
const router = express.Router();

router.post("/", authVerificationUser, reviewController.createReview);
router.get("/all", authVerificationUser, reviewController.getAllReviews);
router.get(
  "/product/:productId",
  authVerificationUser,
  reviewController.getReviewsByProduct,
);

router.get(
  "/user/:userId",
  authVerificationUser,
  reviewController.getReviewsByUser,
);
router.put("/:id", authVerificationUser, reviewController.updateReview);
router.delete("/:id", authVerificationUser, reviewController.deleteReview);

module.exports = router;
