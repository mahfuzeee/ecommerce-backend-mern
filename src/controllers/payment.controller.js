const paymentService = require("../services/payment.service");
const sendResponse = require("../utils/apiResponse");

let redirect_url = "/cart-thank-you"; //redirect if payment success
const paymentController = {
  paymentSuccess: async (req, res, next) => {
    const transactionId = req.params.trx_id;
    try {
      const payment = await paymentService.paymentSuccess(transactionId);
      res.redirect(redirect_url);
    } catch (error) {
      next(error);
    }
  },
  paymentCancel: async (req, res, next) => {
    const transactionId = req.params.trx_id;
    try {
      const payment = await paymentService.paymentCancel(transactionId);
      sendResponse(res, {
        statusCode: 200,
        message: "Payment canceled",
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },
  paymentFail: async (req, res, next) => {
    const transactionId = req.params.trx_id;
    try {
      const payment = await paymentService.paymentFail(transactionId);
      //Sent email, or invoice or something

      sendResponse(res, {
        statusCode: 200,
        message: "Payment failed",
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },
  paymentIpn: async (req, res, next) => {
    const transactionId = req.params.trx_id;
    try {
      const payment = await paymentService.paymentIpn(transactionId);
      sendResponse(res, {
        statusCode: 200,
        message: "Payment ipn",
        data: payment,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = paymentController;
