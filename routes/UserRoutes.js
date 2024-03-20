const express = require("express");
const router = express.Router();

const {
    register,
    getCurrentUser,
    login,
    update,
    getUserById,
} = require("../controller/UserController");
const validate = require("../middlewares/handleValidation");

const {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation,
} = require("../middlewares/userValidations");
const { authGuard } = require("../middlewares/authGuard");
router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", userLoginValidation(), validate, login);
router.put(
    "/",
    authGuard,
    userUpdateValidation(),
    validate,
    imageUpload.single("image"),
    update
);

router.get("/:id", getUserById);
module.exports = router;
