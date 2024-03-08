const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
} = require("../controller/UserController");
const { imageUpload } = require("../middlewares/imageUpload");
const validate = require("../middlewares/handleValidation");
const { authGuard } = require("../middlewares/authGuard");
const {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation,
} = require("../middlewares/userValidations");
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login);
router.get("/profile", authGuard, getCurrentUser);

router.put(
    "/",
    authGuard,
    imageUpload.single("image"),
    userUpdateValidation(),
    validate,
    update
);

router.get("/:id", getUserById);
module.exports = router;
