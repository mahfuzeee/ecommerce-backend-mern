const File = require("../models/file.model");

const fileRepository = {
  uploadFile: async (file) => {
    return await File.create({ fileName: file });
  },
};

module.exports = fileRepository;
