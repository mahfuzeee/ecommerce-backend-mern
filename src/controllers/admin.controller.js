const adminRepository = require("../repositories/admin.repository");
const sendResponse = require("../utils/apiResponse");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/tokenHelpers");

const options = {
  maxAge: process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
  httpOnly: false,
  sameSite: "none",
  secure: true,
};

const adminController = {
  //Create or Register an admin
  createAdmin: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (await adminRepository.getAdminByEmail(email)) {
        return next(new ApiError(400, "Admin already exists"));
      }

      const admin = await adminRepository.createAdmin(name, email, password);

      return sendResponse(res, {
        message: "Admin created successfully",
        data: admin,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Login an admin
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const admin = await adminRepository.getAdminByEmail(email);

      if (!admin) {
        return next(new ApiError(404, "Admin not found"));
      }

      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return next(new ApiError(401, "Invalid credentials"));
      }

      const token = generateToken(admin.email, admin._id.toString());

      //set cookie
      res.cookie("a_token", token, options);

      //send response
      return sendResponse(res, {
        message: "Admin logged in successfully",
        data: admin,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Admin Dashboard
  admin: async (req, res, next) => {
    try {
      const email = req.headers.email;

      const adminData = await adminRepository.getAdminData(email);

      return sendResponse(res, {
        message: "Admin dashboard",
        data: adminData,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Admin verify
  adminVerify: async (req, res, next) => {
    try {
      sendResponse(res, {
        message: "Admin verified",
      });
    } catch (error) {
      return next(error);
    }
  },

  //Admin Logout
  adminLogout: async (req, res, next) => {
    try {
      res.clearCookie("a_token", options);
      return sendResponse(res, {
        message: "Admin logged out successfully",
      });
    } catch (error) {
      return next(error);
    }
  },

  //Admin update (name, password etc)
  adminUpdate: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;
      const _id = req.headers._id;
      const updatedData = { name, email };

      const admin = await adminRepository.getAdminByIdOrEmail(
        email,
        _id.toString(),
      );

      if (!admin) return next(new ApiError(400, "Admin not found"));

      //If password provided hash it first
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      const updatedAdmin = await adminRepository.updateAdmin(_id, updatedData);

      const token = generateToken(
        updatedAdmin?.email,
        updatedAdmin?._id.toString(),
      );

      //set cookie
      res.cookie("a_token", token, options);

      //send response
      return sendResponse(res, {
        message: "Admin updated successfully",
        data: {
          email: updatedAdmin.email,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = adminController;
