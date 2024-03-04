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
    }
    res.status(201).json(newPost);
};

module.exports = { insertPost };
