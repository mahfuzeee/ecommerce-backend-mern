const express = require("express");
const dashboardController = require("../controllers/dashboard.controller");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");

const router = express.Router();

router.get("/", authVerificationAdmin, dashboardController.getDashboard);

module.exports = router;
