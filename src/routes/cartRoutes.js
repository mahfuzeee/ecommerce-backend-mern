const express = require("express");
const cartController = require("../controllers/cart.controller");
const authVerificationUser = require("../middlewares/authVerificationUser");

const router = express.Router();

router.post("/", authVerificationUser, cartController.createCart);

module.exports = router;
