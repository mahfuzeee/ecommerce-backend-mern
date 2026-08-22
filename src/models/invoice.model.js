const mongoose = require("mongoose");

const contactDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false },
);

const invoiceSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    payableAmount: { type: Number, required: true },
    cus_details: { type: contactDetailsSchema, required: true },
    ship_details: { type: contactDetailsSchema, required: true },
    tran_id: { type: String, required: true, unique: true },
    val_id: { type: String, required: true },
    delivery_status: {
      type: String,
      required: true,
      enum: ["pending", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    payment_status: {
      type: String,
      required: true,
      enum: ["pending", "paid", "failed", "cancelled"],
      default: "pending",
    },

    vat: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true, versionKey: false },
);

const Invoice = mongoose.model("Invoice", invoiceSchema);

module.exports = Invoice;
