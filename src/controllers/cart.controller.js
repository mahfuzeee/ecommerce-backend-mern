const cartService = require("../services/cart.service");

const sendResponse = require("../utils/apiResponse");

const cartController = {
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
};

module.exports = cartController;
