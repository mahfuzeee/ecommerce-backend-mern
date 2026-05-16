const invoiceRepository = require("../repositories/invoice.repository");
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
};

module.exports = orderService;
