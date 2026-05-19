const fileRepository = require("../repositories/file.repository");

const fileService = {
  uploadFile: async (file) => {
    return await fileRepository.uploadFile(file);
  },

  //Get all files
  getAllFiles: async (page, limit) => {
    return await fileRepository.getAllFiles(page, limit);
  },
};

module.exports = fileService;
