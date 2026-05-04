const userservice = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const sendResponse = require("../utils/apiResponse");

const userController = {
  createUser: async (req, res) => {
    try {
      const user = await userservice.createUser(req.body);
      return sendResponse(res, { data: user });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await userservice.getAllUsers();
      return sendResponse(res, { data: users });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    try {
      const user = await userservice.getUserById(req.params.id);
      return sendResponse(res, { data: user });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },
  getUserByEmail: async (req, res) => {
    try {
      const user = await userservice.getUserByEmail(req.params.email);
      return sendResponse(res, { data: user });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    try {
      const user = await userservice.updateUser(req.params.id, req.body);
      return sendResponse(res, { data: user });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const user = await userservice.deleteUser(req.params.id);
      return sendResponse(res, { data: user });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },
};
module.exports = userController;
