const fs = require("fs");
const fileService = require("../services/file.service");
const sendResponse = require("../utils/apiResponse");
const path = require("path");

const fileController = {
  // Upload a file
  uploadFile: async (req, res, next) => {
    try {
      const { filename } = req.file;

      const file = await fileService.uploadFile(filename.toString());
      return sendResponse(res, {
        message: "File uploaded successfully",
        data: file,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get all files
  getAllFiles: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const files = await fileService.getAllFiles(page, limit);
      return sendResponse(res, {
        message: "Files retrieved successfully",
        data: files,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Get a single file by id
  getFileById: async (req, res, next) => {
    try {
      const id = req.params.id;
      const file = await fileService.getFileById(id);
      return sendResponse(res, {
        message: "File retrieved successfully",
        data: file,
      });
    } catch (error) {
      return next(error);
    }
  },

  //Delete a file
  deleteFile: async (req, res, next) => {
    try {
      const id = req.body?._id;
      const filename = req.body?.filename;

      const filePath = path.join(__dirname, `../../uploads/${filename}`);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
        }
      });

      const file = await fileService.deleteFile(id);
      return sendResponse(res, {
        message: "File deleted successfully",
        data: file,
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = fileController;
