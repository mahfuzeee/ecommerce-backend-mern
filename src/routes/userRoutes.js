const express = require("express");
const userController = require("../controllers/user.controller");
const authVerificationUser = require("../middlewares/authVerificationUser");

const router = express.Router();

router.post("/register", userController.createUser);
router.post("/login", userController.loginUser);
router.get("/", authVerificationUser, userController.getUser);
router.get("/verify", authVerificationUser, userController.verifyUser);
router.get("/logout", authVerificationUser, userController.logoutUser);
router.put("/update", authVerificationUser, userController.updateUser);
router.delete("/delete", authVerificationUser, userController.deleteUser);

module.exports = router;
