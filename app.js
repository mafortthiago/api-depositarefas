require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
require("./config/db.js");
const router = require("./routes/Router");
app.use(router);
app.listen(port, () => {
  console.log("App rodando");
});
