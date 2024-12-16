const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");

router.post("/auth", authController.loginUser);
router.post("/auth/sso", authController.googleSSOSignIn);

module.exports = router;
