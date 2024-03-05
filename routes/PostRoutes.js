const express = require("express");
const router = express.Router();

const { insertPost, removePost } = require("../controller/PostController");
const { imageUpload } = require("../middlewares/imageUpload");
const { postInsertValidation } = require("../middlewares/postValidation");
const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");

router.post(
    "/",
    authGuard,
    imageUpload.single("image"),
    postInsertValidation(),
    validate,
    insertPost
);
router.delete("/:id", authGuard, removePost);
module.exports = router;
