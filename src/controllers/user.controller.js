const userservice = require("../services/user.service");
const ApiError = require("../utils/ApiError");
const sendResponse = require("../utils/apiResponse");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenHelpers");

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

  //Verify user
  verifyUser: async (req, res, next) => {
    try {
      sendResponse(res, {
        message: "User verified",
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
      return sendResponse(res, {
        message: "Users retrieved successfully",
        data: users,
      });
    } catch (error) {
      return sendResponse(res, {
        statusCode: error.statusCode,
        message: error.message,
      });
    }
  },

  getUser: async (req, res, next) => {
    try {
      const email = req.headers.email;

      const user = await userservice.getUser(email);

      return sendResponse(res, {
        message: "User Dashboard",
        data: user,
      });
    } catch (error) {
      return next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const _id = req.headers._id;
      const updatedData = { name, email };
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await userservice.updateUser(
        _id.toString(),
        updatedData,
      );

      const token = generateToken(
        updatedUser.email,
        updatedUser._id.toString(),
      );
      res.cookie("u_token", token, options);

      return sendResponse(res, {
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      return next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const user = await userservice.deleteUser(req.headers._id.toString());
      res.clearCookie("u_token");

      return sendResponse(res, {
        message: "User deleted successfully",
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = userController;
