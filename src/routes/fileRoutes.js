const fileController = require("../controllers/file.controller");
const fileUpload = require("../middlewares/upload.middleware");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");

const express = require("express");
const router = express.Router();

router.post(
  "/upload",
  authVerificationAdmin,
  fileUpload,
  fileController.uploadFile,
);

router.get("/all", fileController.getAllFiles);

router.post("/delete", authVerificationAdmin, fileController.deleteFile);

module.exports = router;
