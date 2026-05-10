const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    invoice_id: { type: mongoose.Schema.Types.ObjectId, ref: "Invoice" },

    description: { type: String, required: true }, // string,
    rating: { type: Number, min: 1, max: 5 },
    comment: { type: String },
  },
  { timestamps: true, versionKey: false },
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
