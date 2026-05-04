const express = require("express");
const adminController = require("../controllers/admin.controller");
const authVerificationAdmin = require("../middlewares/authVerificationAdmin");

const router = express.Router();

router.post("/register", adminController.createAdmin);
router.post("/login", adminController.login);
router.get("/", authVerificationAdmin, adminController.admin);
router.get("/verify", authVerificationAdmin, adminController.adminVerify);
router.get("/logout", adminController.adminLogout);
router.put("/update", authVerificationAdmin, adminController.adminUpdate);

module.exports = router;
