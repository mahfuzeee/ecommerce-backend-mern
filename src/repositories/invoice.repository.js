const mongoose = require("mongoose");
const Invoice = require("../models/invoice.model");
const { transform } = require("zod");

const objectId = mongoose.Types.ObjectId;

//Invoice Repository

const invoiceRepository = {
  // Create a new invoice
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

  // Retrieve all invoices from invoice Product for a user
  getInvoicesByUser: async (userId, page, limit, skip) => {
    const id = new objectId(userId);
    const matchStage = { $match: { user_id: id } };
    const sortStage = { createdAt: -1 };
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: [{ $sort: sortStage }, { $skip: skip }, { $limit: limit }],
      },
    };
    const pipeline = [matchStage, facetStage];
    const result = await Invoice.aggregate(pipeline);
    if (result.length === 0) {
      return [];
    }
    return result;
  },

  // Retrieve a single invoice from invoice Product for a user
  getSingleInvoiceByUser: async (invoiceId) => {
    const invoice_id = new objectId(invoiceId);

    const matchStage = { $match: { _id: invoice_id } };

    const lookupStage = {
      $lookup: {
        from: "invoiceproducts",
        localField: "_id",
        foreignField: "invoice_id",
        as: "invoiceProducts",
      },
    };

    const unwindStage = { $unwind: "$invoiceProducts" };
    const products = await Invoice.aggregate([
      matchStage,
      lookupStage,
      unwindStage,
    ]);
    return products;
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
