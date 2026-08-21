const express = require("express");
const invoiceController = require("../controllers/invoice.controller");
const authVerificationUser = require("../middlewares/authVerificationUser");
const authVerificationAny = require("../middlewares/authVerificationAny");

const router = express.Router();

//Routes for invoice management by users
router.post("/", authVerificationUser, invoiceController.createInvoice);
router.get("/all", authVerificationAny, invoiceController.getInvoicesByUser);
router.get(
  "/single/:invoice_id",
  authVerificationAny,
  invoiceController.getSingleInvoiceByUser,
);
router.get(
  "/invoice-product-list",
  authVerificationAny,
  invoiceController.getInvoiceProductList,
);
router.get("/:id", authVerificationAny, invoiceController.getInvoiceById);
router.put("/:id", authVerificationUser, invoiceController.updateInvoice);
router.delete("/:id", authVerificationUser, invoiceController.deleteInvoice);

module.exports = router;
