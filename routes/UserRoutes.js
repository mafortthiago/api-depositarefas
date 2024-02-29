const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getCurrentUser,
} = require("../controller/UserController");

const validate = require("../middlewares/handleValidation");
const authGuard = require("../middlewares/authGuard");
const {
    userCreateValidation,
    userLoginValidation,
} = require("../middlewares/userValidations");
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);
module.exports = router;
