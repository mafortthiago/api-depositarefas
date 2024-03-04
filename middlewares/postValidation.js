const { body } = require("express-validator");

const postInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("O título é obrigatório.")
            .isString("O título é obrigatório.")
            .isString({ min: 3 })
            .withMessage("O título precisa de ao menos 3 caracteres."),
        body("text")
            .isString()
            .withMessage("O conteúdo deve ser preenchido")
            .isString({ min: 20 })
            .withMessage("O conteúdo deve ser maior."),
    ];
};

module.exports = { postInsertValidation };
