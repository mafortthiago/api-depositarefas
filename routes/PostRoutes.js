const express = require("express");
const router = express.Router();

const {
    insertPost,
    removePost,
    getPosts,
    getUserPosts,
    getPostById,
    updatePost,
    likePost,
    commentPost,
    searchPostByTitle,
} = require("../controller/PostController");
const { imageUpload } = require("../middlewares/imageUpload");
const {
    postInsertValidation,
    postUpdateValidation,
    commentValidation,
} = require("../middlewares/postValidation");
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
router.get("/search", authGuard, searchPostByTitle);
router.get("/:id", authGuard, getPostById);
router.put(
    "/:id",
    imageUpload.single("image"),
    authGuard,
    postUpdateValidation(),
    validate,
    updatePost
);
router.put("/like/:id", authGuard, likePost);
router.put(
    "/comment/:id",
    authGuard,
    commentValidation(),
    validate,
    commentPost
);
module.exports = router;
