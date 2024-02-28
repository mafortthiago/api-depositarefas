const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

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

module.exports = { register };
