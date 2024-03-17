const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: String,
        email: String,
        password: String,
        image: String,
        bio: String,
    },
    {
        timestamps: true,
    }
);

User = mongoose.model("user", userSchema);
module.exports = User;
