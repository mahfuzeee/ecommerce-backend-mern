const invoiceService = require("../services/invoice.service");
const ApiError = require("../utils/ApiError");
const sendResponse = require("../utils/apiResponse");

//Invoice Controller

const invoiceController = {
  createInvoice: async (req, res, next) => {
    try {
      const userId = req.headers._id; // Assuming user ID is sent in headers
      const cusEmail = req.headers.email; // Assuming customer email is sent in headers
      console.log(`Creating invoice for user ${userId} with email ${cusEmail}`);
      const newInvoice = await invoiceService.createInvoice(userId, cusEmail);
      sendResponse(res, {
        statusCode: 201,
        message: "Invoice created successfully",
        data: newInvoice,
      });
    } catch (error) {
      next(error);
    }
  },

  getInvoiceById: async (req, res, next) => {
    try {
      const invoiceId = req.params.id;
      const invoice = await invoiceService.getInvoiceById(invoiceId);
      if (!invoice) {
        throw new ApiError(404, "Invoice not found");
      }
      sendResponse(res, {
        statusCode: 200,
        message: "Invoice retrieved successfully",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  },

  // Retrieve all invoices for a user
  getInvoicesByUser: async (req, res, next) => {
    try {
      const userId = req.headers._id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const invoices = await invoiceService.getInvoicesByUser(
        userId,
        page,
        limit,
        skip,
      );
      sendResponse(res, {
        statusCode: 200,
        message: "Invoices retrieved successfully",
        data: invoices,
      });
    } catch (error) {
      next(error);
    }
  },

  // Retrieve a single invoice for a user
  getSingleInvoiceByUser: async (req, res, next) => {
    try {
      const invoiceId = req.params.invoice_id;

      if (!invoiceId) {
        throw new ApiError(404, "Invoice id is required");
      }

      const invoice = await invoiceService.getSingleInvoiceByUser(invoiceId);
      if (!invoice) {
        throw new ApiError(404, "Invoice not found");
      }
      sendResponse(res, {
        statusCode: 200,
        message: "Invoice retrieved successfully",
        data: invoice,
      });
    } catch (error) {
      next(error);
    }
  },

  //Retrieve all invoice Product list
  getInvoiceProductList: async (req, res, next) => {
    try {
      const userId = req.headers._id;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const invoiceProductList = await invoiceService.getInvoiceProductList(
        userId,
        page,
        limit,
      );
      sendResponse(res, {
        statusCode: 200,
        message: "Invoice Product List retrieved successfully",
        data: invoiceProductList,
      });
    } catch (error) {
      next(error);
    }
  },

  updateInvoice: async (req, res, next) => {
    try {
      const invoiceId = req.params.id;
      const updateData = req.body;
      const updatedInvoice = await invoiceService.updateInvoice(
        invoiceId,
        updateData,
      );
      if (!updatedInvoice) {
        throw new ApiError(404, "Invoice not found");
      }
      sendResponse(res, {
        statusCode: 200,
        message: "Invoice updated successfully",
        data: updatedInvoice,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteInvoice: async (req, res, next) => {
    try {
      const invoiceId = req.params.id;
      const deletedInvoice = await invoiceService.deleteInvoice(invoiceId);
      if (!deletedInvoice) {
        throw new ApiError(404, "Invoice not found");
      }
      sendResponse(res, {
        statusCode: 200,
        message: "Invoice deleted successfully",
        data: deletedInvoice,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = invoiceController;
