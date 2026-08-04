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
        tran_id: invoiceData.transactionId,
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
    return await Invoice.findById(invoiceId);
  },

  // Retrieve all invoices from invoice Product for a user
  getInvoicesByUser: async (userId, page, limit, skip) => {
    const id = new objectId(userId);
    const matchStage = { $match: { user_id: id } };
    const sortStage = { createdAt: -1 };
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        invoices: [{ $sort: sortStage }, { $skip: skip }, { $limit: limit }],
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

  //Update invoice payment status
  updateInvoice: async (transactionId, paymentStatus) => {
    return await Invoice.updateOne(
      {
        tran_id: transactionId,
      },
      {
        payment_status: paymentStatus,
      },
    );
  },

  deleteInvoice: async (invoiceId) => {
    return await Invoice.findByIdAndDelete(invoiceId);
  },

  //Get all invoices list
  getAllOrders: async (page, limit, fromDate, toDate) => {
    const skip = (page - 1) * limit;

    const matchStage = {
      $match: {
        createdAt: {
          $gte: fromDate,
          $lte: toDate,
        },
      },
    };

    const joinWithProductStage = {
      $lookup: {
        from: "invoiceproducts",
        localField: "_id",
        foreignField: "invoice_id",
        as: "invoiceProducts",
      },
    };

    const unwindProductStage = { $unwind: "$invoiceProducts" };
    const projectionStage = {
      $project: {
        totalCount: 1,
        data: {
          _id: 1,
          user_id: 1,
          payableAmount: 1,
          cus_details: 1,
          ship_details: 1,
          tran_id: 1,
          val_id: 1,
          delivery_status: 1,
          payment_status: 1,
          vat: 1,
          totalAmount: 1,
          createdAt: 1,
          invoiceProducts: {
            product_id: 1,
            product_name: 1,
            quantity: 1,
            price: 1,
            color: 1,
            size: 1,
          },
        },
      },
    };
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
      },
    };
    const pipeline = [
      matchStage,
      joinWithProductStage,
      unwindProductStage,
      facetStage,
      projectionStage,
    ];
    const result = await Invoice.aggregate(pipeline);
    if (result.length === 0) {
      return [];
    }
    return result;
  },

  //update oreders delivery status
  updateOrder: async (id, user_id, delivery_status) => {
    return await Invoice.updateOne(
      {
        _id: new objectId(id),
        user_id: new objectId(user_id),
      },
      {
        delivery_status: delivery_status,
      },
      { new: true },
    );
  },

  //Count Invoices
  count: async (status) => {
    if (status) {
      return await Invoice.countDocuments({ delivery_status: status });
    }
    return await Invoice.countDocuments();
  },

  //Calculate total amount for successful payment
  totalAmount: async () => {
    return await Invoice.aggregate([
      {
        $match: {
          payment_status: "paid",
        },
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$totalAmount" },
        },
      },
    ]);
  },
};

module.exports = invoiceRepository;
