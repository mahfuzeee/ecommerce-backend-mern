const cartRepository = require("../repositories/cart.repository");
const productRepository = require("../repositories/product.repository");
const ApiError = require("../utils/ApiError");

const cartService = {
  createCart: async (cartData) => {
    try {
      const { user_id, product_id, product_name, color, size, quantity } =
        cartData;

      // Check if the product exists
      const product = await productRepository.getProductById(product_id);
      if (!product) {
        throw new ApiError(400, "Product not found");
      }

      console.log(`product.stock: ${product.stock}`);
      //Check if the product is already in the cart for the user
      const existingCart = await cartRepository.getCartItemsByUserAndProduct(
        user_id,
        product_id,
        product_name,
        color,
        size,
      );

      // If the product is already in the cart, update the quantity

      if (existingCart) {
        const newReqBody = {
          user_id,
          product_id,
          product_name,
          color,
          size,
          quantity: parseInt(existingCart.quantity) + parseInt(quantity),
        };

        //console.log(newReqBody);
        const carts = await cartRepository.findCartsByProductId(product_id);
        //console.log(carts);

        const totalQuantity = carts.reduce(
          (total, cart) => total + parseInt(cart.quantity),
          0,
        );

        console.log(
          `totalQuantity: ${totalQuantity}, product.stock: ${product.stock}`,
        );

        if (totalQuantity > product?.stock) {
          throw new ApiError(400, "Requested quantity exceeds available stock");
        }

        const updatedCart = await cartRepository.updateCart(
          existingCart,
          newReqBody,
        );

        //console.log(updatedCart);

        return updatedCart;
      } else {
        const carts = await cartRepository.findCartsByProductId(product_id);

        const totalQuantity = carts.reduce(
          (total, cart) => total + parseInt(cart.quantity),
          0,
        );

        if (totalQuantity > product?.stock) {
          throw new ApiError(400, "Requested quantity exceeds available stock");
        }
        // If the product is not in the cart, create a new cart item
        const newCartData = {
          user_id,
          product_id,
          product_name,
          color,
          size,
          price,
          quantity,
        };
        return await cartRepository.createCart(newCartData);
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = cartService;
