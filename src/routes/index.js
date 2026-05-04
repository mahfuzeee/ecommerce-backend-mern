const express = require("express");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/admin", adminRoutes);
router.use("/users", userRoutes);

module.exports = router;
