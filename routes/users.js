const express = require("express");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/me", auth, userController.getCurrentUser);

router.post("/", userController.createUser);

module.exports = router;
