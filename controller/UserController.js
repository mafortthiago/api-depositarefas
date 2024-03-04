const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const mongoose = require("mongoose");
const generateToken = (id) => {
    return jwt.sign({ id }, jwtSecret, { expiresIn: "15d" });
};

const register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        res.status(422).json({ errors: ["Email já cadastrado."] });
        return;
    }
    const passwordEncrypted = await bcrypt.hash(
        password,
        await bcrypt.genSalt()
    );

    const newUser = User.create({
        name,
        email,
        password: passwordEncrypted,
    });

    if (!newUser) {
        res.status(422).json({ errors: ["Erro, tente novamente!"] });
        return;
    }
    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id),
    });
};

const login = async (req, res) => {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({ errors: ["Usuário não existe"] });
        return;
    }

    if (!bcrypt.compare(password, user.password)) {
        res.status(422).json({ errors: ["A senha está incorreta"] });
        return;
    }

    res.status(201).json({
        _id: user._id,
        image: user.image,
        token: generateToken(user._id),
    });
};
const getUserById = (req, res) => {
    const { id } = req.params;
    try {
        const user = User.findById(mongoose.Types.ObjectId(id)).select(
            "-password"
        );
        if (!user) {
            res.status(404).json({ errors: ["Usuário não existe."] });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ errors: ["Usuário não existe."] });
        return;
    }
};
const update = async (req, res) => {
    const { name, password, bio } = req.body;
    let image = null;

    if (req.file) {
        image = req.file.filename;
    }

    const user = await User.findById(
        mongoose.Types.ObjectId(req.user._id)
    ).select("-password");

    if (name) {
        user.name = name;
    }
    if (password) {
        user.password = await bcrypt.hash(password, await bcrypt.genSalt());
    }
    if (image) {
        user.image = image;
    }
    if (bio) {
        user.bio = bio;
    }
    await user.save();
    res.status(200).json(user);
};
const getCurrentUser = async (req, res) => {
    const user = req.user;
    res.status(200).json(user);
};

module.exports = { register, login, getCurrentUser, update, getUserById };
