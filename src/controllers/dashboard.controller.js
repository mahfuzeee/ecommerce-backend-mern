const dashboardService = require("../services/dashboard.service");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");

const dashboardController = {
  getDashboard: async (_req, res, next) => {
    try {
      const dashboard = await dashboardService.getDashboard();
      return sendResponse(res, {
        message: "Dashboard retrieved successfully",
        data: dashboard,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = dashboardController;
