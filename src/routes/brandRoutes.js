const express = require("express");
const brandController = require("../controllers/brand.controller");
const authVericationAdmin = require("../middlewares/authVerificationAdmin");

const router = express.Router();

router.post("/create", authVericationAdmin, brandController.createBrand);
router.get("/", brandController.getAllBrands);

router
  .route("/:id")
  .get(brandController.getBrandById)
  .put(authVericationAdmin, brandController.updateBrand)
  .delete(authVericationAdmin, brandController.deleteBrand);

module.exports = router;
