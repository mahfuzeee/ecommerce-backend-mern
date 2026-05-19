const fileService = require("../services/file.service");
const sendResponse = require("../utils/apiResponse");

const fileController = {
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
};

module.exports = fileController;
