const express = require("express");
const categoryController = require("../controllers/category.controller");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");

const router = express.Router();

router.post(
  "/create",
  authVerificationAdmin,
  categoryController.createCategory,
);
router.get("/", categoryController.getAllCategories);

router
  .route("/:id")
  .get(categoryController.getCategoryById)
  .put(authVerificationAdmin, categoryController.updateCategory)
  .delete(authVerificationAdmin, categoryController.deleteCategory);

module.exports = router;
