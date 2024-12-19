const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");

router.get("/users", userController.getUsers);
router.post("/users/create", userController.createUser);
router.put("/users", userController.resetPassword);
router.post("/users", userController.googleSignIn);

module.exports = router;
