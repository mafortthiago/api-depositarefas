const multer = require("multer");
const path = require("path");
const uuid = require("uuid");

const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = "";
        if (req.baseUrl.includes("user")) {
            folder = "user";
        } else {
            folder = "post";
        }
        cb(null, `images/${folder}/`);
    },
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    },
});

const imageUpload = multer({
    storage: imageStorage,
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error("Envie apenas imagens .png ou .jpg."));
        }
        cb(undefined, true);
    },
});

module.exports = { imageUpload };
