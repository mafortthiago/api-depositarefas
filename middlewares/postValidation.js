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

const postUpdateValidation = () => {
    return [
        body("title")
            .optional()
            .isString()
            .withMessage("Preencha o título")
            .isString({ min: 3 })
            .withMessage("O título deve ter ao menos 3 caracteres."),
        body("text")
            .optional()
            .isString()
            .withMessage("Preencha o texto")
            .isString({ min: 20 })
            .withMessage("O texto deve ter ao menos 20 caracteres."),
    ];
};

const commentValidation = () => {
    return [body("comment").isString().withMessage("Preencha o comentário.")];
};

module.exports = {
    postInsertValidation,
    postUpdateValidation,
    commentValidation,
};
