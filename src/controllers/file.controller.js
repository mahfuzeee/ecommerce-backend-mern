const fileService = require("../services/file.service");
const sendResponse = require("../utils/apiResponse");

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
};

module.exports = fileController;
