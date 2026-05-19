const Order = require("../models/order.model");

const orderRepository = {
  createOrder: async (order) => {
    return await Order.create(order);
  },
  getAllOrders: async () => {
    return await Order.find().sort({ createdAt: -1 });
  },
  getOrderById: async (id) => {
    return await Order.findById(id);
  },
  updateOrder: async (id, order) => {
    return await Order.findByIdAndUpdate(id, order, { new: true });
  },
  deleteOrder: async (id) => {
    return await Order.findByIdAndDelete(id);
  },

  //Count orders
  count: async () => {
    return await Order.countDocuments();
  },
};

module.exports = orderRepository;
