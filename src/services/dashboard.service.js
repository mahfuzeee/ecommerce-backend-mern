const userRepository = require("../repositories/user.repository");
const productRepository = require("../repositories/product.repository");
const brandRepository = require("../repositories/brand.repository");
const categoryRepository = require("../repositories/category.repository");
const invoiceRepository = require("../repositories/invoice.repository");
const orderRepository = require("../repositories/order.repository");
const reviewRepository = require("../repositories/review.repository");
const ApiError = require("../utils/ApiError");

const dashboardService = {
  async getDashboard() {
    try {
      const totalUsers = await userRepository.count();
      const totalProducts = await productRepository.count();
      const totalBrands = await brandRepository.count();
      const totalCategories = await categoryRepository.count();
      const totalInvoices = await invoiceRepository.count();
      const totalOrders = await invoiceRepository.count();
      const totalReviews = await reviewRepository.count();
      const deliveredOrders = await invoiceRepository.count("delivered");
      const pendingOrders = await invoiceRepository.count("pending");
      const cancelledOrders = await invoiceRepository.count("cancelled");
      const totalAmount = await invoiceRepository.totalAmount();

      const totalSalesAmount =
        totalAmount.length > 0 ? totalAmount[0].totalAmount : 0;

      return {
        totalUsers,
        totalProducts,
        totalBrands,
        totalCategories,
        totalInvoices,
        totalOrders,
        totalSalesAmount,
        pendingOrders,
        cancelledOrders,
        deliveredOrders,
        totalReviews,
      };
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  },
};

module.exports = dashboardService;
