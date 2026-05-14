const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, unique: true },
    description: { type: String, default: "", trim: true },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be greater than 0"],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      index: true,
    },

    stock: { type: Number, required: true, min: 0, default: 0 },
    color: { type: String, trim: true },
    size: { type: String, trim: true },
    discountPrice: Number,
    isDiscounted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    sku: { type: String, unique: true },
    images: [{ type: String }], // Array of image URLs
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true, versionKey: false },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
