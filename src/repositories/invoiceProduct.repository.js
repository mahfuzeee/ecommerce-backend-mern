const InvoiceProduct = require("../models/invoiceProduct.model");
const mongoose = require("mongoose");
const productRepository = require("./product.repository");

const ObjectId = mongoose.Types.ObjectId;

//InvoiceProduct Repository

const invoiceProductRepository = {
  createInvoiceProduct: async (invoiceProductData) => {
    const invoiceProduct = await InvoiceProduct.create({
      user_id: new ObjectId(invoiceProductData.userId),
      product_id: new ObjectId(invoiceProductData.productId),
      invoice_id: new ObjectId(invoiceProductData.invoiceId),
      product_name: invoiceProductData.product_name,
      quantity: parseInt(invoiceProductData.quantity),
      price: parseFloat(invoiceProductData.price).toFixed(2),
      color: invoiceProductData.color,
      size: invoiceProductData.size,
    });
    return invoiceProduct;
  },

  getInvoiceProductList: async (userId, page, limit) => {
    const skip = (page - 1) * limit;

    const matchStage = { $match: { user_id: new ObjectId(userId) } };
    const sortStage = { createdAt: -1 };
    const joinWithProductStage = {
      $lookup: {
        from: "products",
        localField: "product_id",
        foreignField: "_id",
        as: "product",
      },
    };
    const unwindProductStage = { $unwind: "$product" };
    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        data: [{ $sort: sortStage }, { $skip: skip }, { $limit: limit }],
      },
    };
    const pipeline = [
      matchStage,
      joinWithProductStage,
      unwindProductStage,
      facetStage,
    ];
    const result = await InvoiceProduct.aggregate(pipeline);
    if (result.length === 0) {
      return [];
    }
    return result;
  },
};

module.exports = invoiceProductRepository;
