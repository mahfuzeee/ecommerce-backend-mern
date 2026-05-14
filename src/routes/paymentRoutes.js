const express = require("express");
const paymentController = require("../controllers/payment.controller");
const router = express.Router();

router.post("/success/:trx_id", paymentController.paymentSuccess);
router.post("/cancel/:trx_id", paymentController.paymentCancel);
router.post("/fail/:trx_id", paymentController.paymentFail);
router.post("/ipn/:trx_id", paymentController.paymentIpn);

module.exports = router;
