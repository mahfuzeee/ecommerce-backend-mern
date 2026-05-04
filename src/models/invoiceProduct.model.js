const mongoose = require("mongoose");

const invoiceProductSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
  },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },

  quantity: Number,
  price: Number, // snapshot price
});

const InvoiceProduct = mongoose.model("InvoiceProduct", invoiceProductSchema);

module.exports = InvoiceProduct;
