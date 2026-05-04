const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema(
  {
    filename: String,
    url: String,
    mimetype: String,
    size: Number,

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
