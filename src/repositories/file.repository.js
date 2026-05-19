const File = require("../models/file.model");

const fileRepository = {
  uploadFile: async (file) => {
    return await File.create({ fileName: file });
  },

  //Get all files
  getAllFiles: async (page, limit) => {
    const skip = (page - 1) * limit;

    const sortStage = { createdAt: -1 };

    const facetStage = {
      $facet: {
        totalCount: [{ $count: "count" }],
        files: [
          { $sort: sortStage },
          { $skip: skip },
          { $limit: limit },
          { $project: { updatedAt: 0 } },
        ],
      },
    };
    const pipeline = [facetStage];
    const result = await File.aggregate(pipeline);
    if (result.length === 0) {
      return [];
    }
    return result;
  },
};

module.exports = fileRepository;
