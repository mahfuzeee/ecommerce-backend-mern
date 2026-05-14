const invoiceRepository = require("../repositories/invoice.repository");

const paymentService = {
  paymentSuccess: async (transactionId) => {
    return await invoiceRepository.updateInvoice(transactionId, "paid");
  },
  paymentCancel: async (transactionId) => {
    return await invoiceRepository.updateInvoice(transactionId, "cancelled");
  },
  paymentFail: async (transactionId) => {
    return await invoiceRepository.updateInvoice(transactionId, "failed");
  },
  paymentIpn: async (transactionId) => {
    return await paymentRepository.paymentIpn(transactionId);
  },
};

module.exports = paymentService;
