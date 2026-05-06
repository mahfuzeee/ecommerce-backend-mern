const express = require("express");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const brandRoutes = require("./brandRoutes");
const categoryRoutes = require("./categoryRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;
