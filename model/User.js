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

module.exports = User = mongoose.model("User", userSchema);
