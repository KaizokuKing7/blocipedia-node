const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");
const helper = require("../auth/helpers");

router.get("/user/sign_up", userController.signUpForm);
router.post("/user/sign_up", validation.validateUsers, userController.sign_up);
router.get("/user/sign_in", userController.signInForm);
router.post("/user/sign_in", validation.validateUsers, userController.sign_in);
router.get("/user/sign_out", userController.signOut);
router.get("/user/:id/info", helper.ensureUserAuthenticated, userController.info);
router.post("/user/upgrade", userController.upgrade);
router.get("/user/downgrade", userController.downgrade);

module.exports = router;