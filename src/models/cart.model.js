const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    product_name: String,
    color: String,
    size: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true, versionKey: false },
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
