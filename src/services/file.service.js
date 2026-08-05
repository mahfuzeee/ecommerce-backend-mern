const fileRepository = require("../repositories/file.repository");
const ApiError = require("../utils/ApiError");

//File Service
const fileService = {
  uploadFile: async (file) => {
    return await fileRepository.uploadFile(file);
  },

  //Get all files
  getAllFiles: async (page, limit) => {
    return await fileRepository.getAllFiles(page, limit);
  },

  //Get a single file by id
  getFileById: async (id) => {
    const file = await fileRepository.getFileById(id);
    if (!file) {
      throw new ApiError(404, "File not found");
    }
    return file;
  },

  //Delete a file
  deleteFile: async (id) => {
    const file = await fileRepository.getFileById(id);
    if (!file) {
      throw new ApiError(404, "File not found");
    }
    return await fileRepository.deleteFile(id);
  },
};

module.exports = fileService;
