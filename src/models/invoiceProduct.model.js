const mongoose = require("mongoose");
const { required } = require("zod/mini");

const invoiceProductSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    invoice_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
    },

    product_name: {
      type: String,
      required: true,
    },

    quantity: { type: Number, required: true },
    price: { type: Number, required: true }, // snapshot price
    color: { type: String, required: true },
    size: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

const InvoiceProduct = mongoose.model("InvoiceProduct", invoiceProductSchema);

module.exports = InvoiceProduct;
