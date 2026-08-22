const orderService = require("../services/order.service");
const sendResponse = require("../utils/apiResponse");

const orderController = {
  getAllOrders: async (req, res, next) => {
    try {
      //Retrieve query data
      const page = Math.max(Number.parseInt(req.query.page, 10) || 1, 1);
      const limit = Math.max(Number.parseInt(req.query.limit, 10) || 10, 1);
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

  //Update delivery status of an order
  updateOrder: async (req, res, next) => {
    try {
      const { _id, user_id, delivery_status } = req.body;
      if (!_id || !user_id || !delivery_status) {
        return sendResponse(res, {
          success: false,
          statusCode: 400,
          message: "Missing required fields",
        });
      }
      const updatedOrder = await orderService.updateOrder(
        _id,
        user_id,
        delivery_status,
      );
      return sendResponse(res, {
        message: "Order updated successfully",
        data: updatedOrder,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get all orders as csv file
  getAllOrdersAsCsv: async (req, res, next) => {
    try {
      const { from, to } = req.query;

      const fromDate = from
        ? new Date(`${from}T00:00:00`)
        : new Date("2000-01-01T00:00:00");

      const toDate = to ? new Date(`${to}T23:59:59.999`) : new Date();

      const ordersCSV = await orderService.exportCSV(fromDate, toDate);

      res.header("Content-Type", "text/csv");
      res.attachment("orders.csv");
      return res.send(ordersCSV);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = orderController;
