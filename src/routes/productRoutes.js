const express = require("express");
const productController = require("../controllers/product.controller");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");

const router = express.Router();

//Basic CRUD routes for products
router
  .route("/")
  .get(productController.getAllProducts)
  .post(authVerificationAdmin, productController.createProduct);

/*
//Additional routes for product filtering and searching
router.get("/search", productController.searchProducts);
router.get("/filter", productController.filterProducts);
*/

router
  .route("/:id")
  .get(productController.getProductById)
  .put(authVerificationAdmin, productController.updateProduct)
  .delete(authVerificationAdmin, productController.deleteProduct);

module.exports = router;
