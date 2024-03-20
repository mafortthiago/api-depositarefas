const mongoose = require("mongoose");

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

const connection = async () => {
    try {
        const dbConnection = await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@cluster0.c6b4zri.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        );
        return dbConnection;
    } catch (e) {
        console.log(e);
    }
};

connection();
module.exports = connection;
