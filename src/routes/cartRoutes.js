const express = require("express");
const cartController = require("../controllers/cart.controller");
const authVerificationUser = require("../middlewares/authVerificationUser");

const router = express.Router();

router.post("/", authVerificationUser, cartController.createCart);
router.get("/", authVerificationUser, cartController.getCart);
router.put("/update/:id", authVerificationUser, cartController.updateCart);
router.delete("/delete/:id", authVerificationUser, cartController.deleteCart);

module.exports = router;
