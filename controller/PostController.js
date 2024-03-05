const Post = require("../model/Post");
const mongoose = require("mongoose");
const User = require("../model/User");

const insertPost = async (req, res) => {
    const { title, text } = req.body;
    const image = req.file.filename;
    const user = await User.findById(req.user._id);

    const newPost = await Post.create({
        image,
        title,
        text,
        userId: user._id,
        userName: user.name,
    });

    if (!newPost) {
        res.status(422).json({ errors: "Houve um erro, tente novamente." });
        return;
    }
    res.status(201).json(newPost);
};

const removePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(mongoose.Types.ObjectId(id));

        if (post) {
            res.status(404).json({ errors: ["O post não existe"] });
            return;
        }

        if (!post.userId.equals(req.user._id)) {
            res.status(422).json({ errors: ["Erro! Tente novamente"] });
            return;
        }
        await Post.findByIdAndDelete(post._id);
        res.status(200).json({
            id: post._id,
            message: "Foto excluida!",
        });
    } catch (error) {
        res.status(404).json({ errors: ["Post não encontrado."] });
        return;
    }
};

const getPosts = async (req, res) => {
    const posts = await Post.find({})
        .sort([["createdAt", -1]])
        .exec();
    res.status(200).json(posts);
};

const getUserPosts = async (req, res) => {
    const { id } = req.params;
    const posts = await Post.find({ userId: id })
        .sort([["createdAt", -1]])
        .exec();

    res.status(200).json(posts);
};
const getPostById = async (req, res) => {
    const { id } = req.params;
    const post = await Post.findById(mongoose.Types.ObjectId(id));

    if (post) {
        res.status(404).json({ errors: ["Post não encontrado"] });
        return;
    }

    res.status(200).json(post);
};

module.exports = {
    insertPost,
    removePost,
    getPosts,
    getUserPosts,
    getPostById,
};
