const orderController = require("../controllers/order.controller");
const express = require("express");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");
const router = express.Router();

router.get("/", authVerificationAdmin, orderController.getAllOrders);
router.put("/update", authVerificationAdmin, orderController.updateOrder);
router.get(
  "/export-csv",
  authVerificationAdmin,
  orderController.getAllOrdersAsCsv,
);

module.exports = router;
