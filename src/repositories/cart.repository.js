const Cart = require("../models/cart.model");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

const cartRepository = {
  createCart: async (cartData) => {
    const cart = new Cart(cartData);
    return await cart.save();
  },

  getCartByProductId: async (productId) => {
    const product_id = new objectId(productId);
    return await Cart.findOne({ product_id }).select("quantity");
  },

  findCartsByProductId: async (productId) => {
    const product_id = new objectId(productId);
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
    const _id = new objectId(existingCart._id),
      user_id = new objectId(existingCart.user_id);
    return await Cart.updateOne(
      { _id: _id, user_id: user_id },
      { $set: { quantity: newQuantity } },
    );
  },

  // Get cart items for a user
  getCart: async (userId) => {
    try {
      const user_id = new objectId(userId);

      //Create mathch stage to filter cart items by user_id
      const matchStage = { $match: { user_id } };
      //Create aggregation pipeline to join cart items with product details
      const joinWithProductStage = {
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "product",
        },
      };

      const joinWithBrandStage = {
        $lookup: {
          from: "brands",
          localField: "product.brand",
          foreignField: "_id",
          as: "brand",
        },
      };

      const joinWithCategoryStage = {
        $lookup: {
          from: "categories",
          localField: "product.category",
          foreignField: "_id",
          as: "category",
        },
      };

      const unwindProductStage = { $unwind: "$product" };
      const unwindBrandStage = { $unwind: "$brand" };
      const unwindCategoryStage = { $unwind: "$category" };

      //Project the required fields from the cart and joined collections
      const projectionStage = {
        $project: {
          _id: 0,
          user_id: 0,
          createdAt: 0,
          updatedAt: 0,
          brand: {
            _id: 0,
            slug: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
          product: {
            _id: 0,
            slug: 0,
            description: 0,
            brand: 0,
            category: 0,
            sku: 0,
            images: 0,
            createdAt: 0,
            updatedAt: 0,
          },
          category: {
            _id: 0,
            slug: 0,
            parent: 0,
            description: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      };

      return await Cart.aggregate([
        matchStage,
        joinWithProductStage,
        joinWithBrandStage,
        joinWithCategoryStage,
        unwindProductStage,
        unwindBrandStage,
        unwindCategoryStage,
        projectionStage,
      ]);
    } catch (error) {
      throw error;
    }
  },

  //Delete a cart item
  deleteCart: async (cartId) => {
    const _id = new objectId(cartId);
    return await Cart.deleteOne({ _id });
  },

  //Delete all cart items for a user
  deleteCartsByUser: async (userId) => {
    const user_id = new objectId(userId);
    return await Cart.deleteMany({ user_id });
  },
};

module.exports = cartRepository;
