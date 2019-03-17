const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/user/sign_up", userController.signUpForm);
router.post("/user/sign_up", validation.validateUsers, userController.sign_up);
router.get("/user/sign_in", userController.signInForm);
router.post("/user/sign_in", validation.validateUsers, userController.sign_in);
router.get("/user/sign_out", userController.signOut);

module.exports = router;