const cartService = require("../services/cart.service");

const sendResponse = require("../utils/apiResponse");

const cartController = {
  //Add a product to the cart
  createCart: async (req, res, next) => {
    try {
      const userId = req.headers._id;
      const { product_id, product_name, color, size, price, quantity } =
        req.body;

      const cartData = {
        user_id: userId,
        product_id,
        product_name,
        color,
        size,
        price,
        quantity,
      };
      const cart = await cartService.createCart(cartData);
      sendResponse(res, {
        statusCode: 201,
        message: "Cart created successfully",
        data: cart,
      });
    } catch (error) {
      next(error);
    }
  },

  //Retrieve the cart items for a user
  getCart: async (req, res, next) => {
    try {
      const userId = req.headers._id;
      const cartItems = await cartService.getCart(userId);
      sendResponse(res, {
        statusCode: 200,
        message: "Cart items retrieved successfully",
        data: cartItems,
      });
    } catch (error) {
      next(error);
    }
  },

  //Update the quantity of a cart item
  updateCart: async (req, res, next) => {
    try {
      const cartId = req.params.cart_id;
      const userId = req.headers._id;
      const { product_id, quantity, increment } = req.body;

      const updatedCart = await cartService.updateCart(
        cartId,
        quantity,
        increment,
        userId,
        product_id,
      );
      sendResponse(res, {
        statusCode: 200,
        message: "Cart updated successfully",
        data: updatedCart,
      });
    } catch (error) {
      next(error);
    }
  },

  //Delete a cart item
  deleteCart: async (req, res, next) => {
    try {
      const cartId = req.params.cart_id;

      await cartService.deleteCart(cartId);
      sendResponse(res, {
        statusCode: 200,
        message: "Cart item deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = cartController;
