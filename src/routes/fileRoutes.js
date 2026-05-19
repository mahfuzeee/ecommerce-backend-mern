const fileController = require("../controllers/file.controller");
const fileUpload = require("../middlewares/upload.middleware");

const express = require("express");
const router = express.Router();

router.post("/upload", fileUpload, fileController.uploadFile);

module.exports = router;
