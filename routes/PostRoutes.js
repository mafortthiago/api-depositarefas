const express = require("express");
const router = express.Router();

const {
    insertPost,
    removePost,
    getPosts,
    getUserPosts,
    getPostById,
} = require("../controller/PostController");
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
router.get("/", authGuard, getPosts);
router.get("/user/:id", authGuard, getUserPosts);
router.get("/:id", authGuard, getPostById);
module.exports = router;
