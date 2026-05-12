const Cart = require("../models/cart.model");
const mongoose = require("mongoose");

const cartRepository = {
  createCart: async (cartData) => {
    const cart = new Cart(cartData);
    return await cart.save();
  },

  getCartByProductId: async (productId) => {
    const product_id = new mongoose.Types.ObjectId(productId);
    return await Cart.findOne({ product_id }).select("quantity");
  },

  findCartsByProductId: async (productId) => {
    const product_id = new mongoose.Types.ObjectId(productId);
    return await Cart.find({ product_id }).select("quantity");
  },

  getCartItemsByUserAndProduct: async (
    user_id,
    product_id,
    product_name,
    color,
    size,
  ) => {
    return await Cart.findOne({
      user_id,
      product_id,
      product_name,
      color,
      size,
    });
  },

  updateCart: async (existingCart, newReqBody) => {
    //console.log(existingCart, newReqBody);
    const newQuantity = parseInt(newReqBody.quantity);
    const _id = new mongoose.Types.ObjectId(existingCart._id),
      user_id = new mongoose.Types.ObjectId(existingCart.user_id);
    return await Cart.updateOne(
      { _id: _id, user_id: user_id },
      { $set: { quantity: newQuantity } },
    );
  },
};

module.exports = cartRepository;
