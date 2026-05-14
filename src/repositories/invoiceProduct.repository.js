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
};

module.exports = invoiceProductRepository;
