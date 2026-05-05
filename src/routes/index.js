const express = require("express");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const brandRoutes = require("./brandRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/brands", brandRoutes);

module.exports = router;
