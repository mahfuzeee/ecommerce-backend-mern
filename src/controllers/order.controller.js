const orderService = require("../services/order.service");
const sendResponse = require("../utils/apiResponse");

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      //Retrieve query data
      const page = req.query.page || 1;
      const limit = req.query.limit || 10;
      const { from, to } = req.query;

      const fromDate = from
        ? new Date(`${from}T00:00:00`)
        : new Date("2000-01-01T00:00:00");

      const toDate = to ? new Date(`${to}T23:59:59.999`) : new Date();

      const orders = await orderService.getAllOrders(
        page,
        limit,
        fromDate,
        toDate,
      );
      return sendResponse(res, {
        message: "Orders retrieved successfully",
        data: orders,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = orderController;
