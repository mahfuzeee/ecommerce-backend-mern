const express = require("express");
const productRoutes = require("./productRoutes");
const adminRoutes = require("./adminRoutes");
const userRoutes = require("./userRoutes");
const brandRoutes = require("./brandRoutes");
const categoryRoutes = require("./categoryRoutes");
const reviewRoutes = require("./reviewRoutes");
const cartRoutes = require("./cartRoutes");
const invoiceRoutes = require("./invoiceRoutes");
const paymentRoutes = require("./paymentRoutes");
const orderRoutes = require("./orderRoutes");
const fileRoutes = require("./fileRoutes");

const router = express.Router();

router.use("/products", productRoutes);
router.use("/admin", adminRoutes);
router.use("/user", userRoutes);
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/reviews", reviewRoutes);
router.use("/cart", cartRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/payment", paymentRoutes);
router.use("/orders", orderRoutes);
router.use("/files", fileRoutes);
router.use("/get-file", express.static("uploads"));

module.exports = router;
