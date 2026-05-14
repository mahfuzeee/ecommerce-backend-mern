const express = require("express");
const invoiceController = require("../controllers/invoice.controller");
const authVerificationUser = require("../middlewares/authVerificationUser");

const router = express.Router();

//Routes for invoice management by users
router.post("/", authVerificationUser, invoiceController.createInvoice);
router.get("/:id", authVerificationUser, invoiceController.getInvoiceById);
router.get(
  "/user/:userId",
  authVerificationUser,
  invoiceController.getInvoicesByUser,
);
router.put("/:id", authVerificationUser, invoiceController.updateInvoice);
router.delete("/:id", authVerificationUser, invoiceController.deleteInvoice);

module.exports = router;
