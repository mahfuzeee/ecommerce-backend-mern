const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    totalAmount: Number,
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "completed", "cancelled"],
      default: "pending",
    },

    paymentMethod: String,

    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
  },
  { timestamps: true },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
