const express = require("express");
const productController = require("../controllers/product.controller");

const router = express.Router();

//Basic CRUD routes for products
router
  .route("/")
  .get(productController.getAllProducts)
  .post(productController.createProduct);

//Additional routes for product filtering and searching
router.get("/search", productController.searchProducts);
router.get("/filter", productController.filterProducts);

router
  .route("/:id")
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

module.exports = router;
