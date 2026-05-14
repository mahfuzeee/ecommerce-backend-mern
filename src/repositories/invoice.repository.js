const mongoose = require("mongoose");
const Invoice = require("../models/invoice.model");
const { transform } = require("zod");

const objectId = mongoose.Types.ObjectId;

//Invoice Repository

const invoiceRepository = {
  createInvoice: async (invoiceData) => {
    try {
      const invoice = await Invoice.create({
        user_id: new objectId(invoiceData.userId),
        payableAmount: parseFloat(invoiceData.totalPayable).toFixed(2),
        cus_details: invoiceData.customerDetails,
        ship_details: invoiceData.shippingDetails,
        trans_id: invoiceData.transactionId,
        val_id: invoiceData.validationId,
        vat: invoiceData.vat,
        totalAmount: invoiceData.totalAmount,
      });
      return invoice;
    } catch (error) {
      throw new Error("Failed to create invoice");
    }
  },

  getInvoiceById: async (invoiceId) => {
    return await Invoice.findById(invoiceId).populate("user", "name email");
  },

  getInvoicesByUser: async (userId) => {
    return await Invoice.find({ user: userId }).populate("user", "name email");
  },

  updateInvoice: async (invoiceId, updateData) => {
    return await Invoice.findByIdAndUpdate(invoiceId, updateData, {
      new: true,
    });
  },

  deleteInvoice: async (invoiceId) => {
    return await Invoice.findByIdAndDelete(invoiceId);
  },
};

module.exports = invoiceRepository;
