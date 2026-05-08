const reviewController = require("../controllers/review.controller");
const express = require("express");
const router = express.Router();

router.post("/", reviewController.createReview);
router.get("/product/:productId", reviewController.getReviewsByProduct);
router.get("/user/:userId", reviewController.getReviewsByUser);
router.put("/:id", reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
