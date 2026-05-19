const fileRepository = require("../repositories/file.repository");

const fileService = {
  uploadFile: async (file) => {
    return await fileRepository.uploadFile(file);
  },
};

module.exports = fileService;
