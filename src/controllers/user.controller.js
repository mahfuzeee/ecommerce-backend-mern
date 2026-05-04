const userservice = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const sendResponse = require("../utils/apiResponse");

const options = {
  maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  httpOnly: false,
  sameSite: "none",
  secure: true,
};

const userController = {
  // Create a new user
  createUser: async (req, res, next) => {
    try {
      const user = await userservice.createUser(req.body);

      return sendResponse(res, {
        message: "User created successfully",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  },

  // User Login
  loginUser: async (req, res, next) => {
    try {
      const user = await userservice.loginUser(req.body);

      //set cookie
      res.cookie("u_token", user.token, options);

      return sendResponse(res, {
        message: "User logged in successfully",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  },

  //logout user
  logoutUser: async (req, res, next) => {
    try {
      res.clearCookie("u_token");
      return sendResponse(res, { message: "User logged out successfully" });
    } catch (error) {
      return next(error);
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

  getUser: async (req, res) => {
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
