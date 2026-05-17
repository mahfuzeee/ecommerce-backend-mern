const invoiceRepository = require("../repositories/invoice.repository");
const invoiceProductRepository = require("../repositories/invoiceProduct.repository");
const productRepositoty = require("../repositories/product.repository");
const ApiError = require("../utils/ApiError");

const orderService = {
  getAllOrders: async (page, limit, fromDate, toDate) => {
    const orders = await invoiceRepository.getAllOrders(
      page,
      limit,
      fromDate,
      toDate,
    );
    if (orders.length === 0) {
      throw new ApiError(404, "No orders found");
    }
    return orders;
  },

  //Update delivery status of an order
  updateOrder: async (_id, user_id, delivery_status) => {
    // Step 1: Find the invoice
    const invoice = await invoiceRepository.getInvoiceById(_id);
    if (!invoice) {
      throw new ApiError(404, "Invoice not found");
    }
    // Step 2: Prevent multiple updates
    if (invoice.delivery_status === "delivered") {
      throw new ApiError(400, "Order already delivered");
    }

    if (invoice.delivery_status === "cancelled") {
      throw new ApiError(400, "Order already cancelled");
    }

    // Step 3: Handle logic based on payment_status
    const paymentStatus = invoice.payment_status;
    if (paymentStatus === "paid") {
      //Payment successfull, alow deliver or cancell
      if (delivery_status === "delivered") {
        //update invioice as delivered
        const updatedInvoice = await invoiceRepository.updateOrder(
          _id,
          user_id,
          delivery_status,
        );
        if (!updatedInvoice) {
          throw new ApiError(404, "Invoice not found");
        }
        return updatedInvoice;
      }
      if (delivery_status === "cancelled") {
        //Cannot cancel, already paid
        throw new ApiError(400, "Payment successfull. Cannot cancel order");
      }
    } else {
      //==Payment not successfull. Allow only cancel delivery
      if (delivery_status === "cancelled") {
        //Find invoice product and restock first
        const invoiceProducts =
          await invoiceProductRepository.getInvoiceProductsByInvoiceId(_id);

        //Restock every product
        for (const product of invoiceProducts) {
          await productRepositoty.restoreProductStock(
            product.product_id,
            product.quantity,
          );
        }

        //update invioice as cancelled
        const updatedInvoice = await invoiceRepository.updateOrder(
          _id,
          user_id,
          delivery_status,
        );
        if (!updatedInvoice) {
          throw new ApiError(404, "Invoice not found");
        }
        return updatedInvoice;
      }
      throw new ApiError(
        400,
        "Payment not successfull. Cannot update delivery status",
      );
    }
  },
};

module.exports = orderService;
