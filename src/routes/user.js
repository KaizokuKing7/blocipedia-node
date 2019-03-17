const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const validation = require("./validation");

router.get("/user/sign_up", userController.new);
router.post("/user/sign_up", validation.validateUsers, userController.sign_up);



module.exports = router;