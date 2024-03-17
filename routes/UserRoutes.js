const express = require("express");
const router = express.Router();

const {
    register,
    login,
    getCurrentUser,
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
const { imageUpload } = require("../middlewares/imageUpload");



router.post("/register", userCreateValidation(), validate, register);
router.get("/profile", authGuard, getCurrentUser);
router.post("/login", userLoginValidation(), validate, login);


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
