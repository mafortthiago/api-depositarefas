const { body } = require("express-validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("O nome é obrigatório")
            .isLength({ min: 2 })
            .withMessage("O nome precisa ter ao menos 2 caracteres"),
        body("email")
            .isString()
            .withMessage("O email é obrigatório.")
            .isEmail()
            .withMessage("O email deve ser válido"),
        body("password")
            .isString()
            .withMessage("A senha é obrigatória")
            .isLength({ min: 6 })
            .withMessage("A senha precisa ter ao menos 6 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória")
            .custom((value, { req }) => {
                if (value != req.body.password) {
                    throw new Error("As senhas devem ser iguais");
                }
                return true;
            }),
    ];
};
const userLoginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O preenchimento do email é obrigatório")
            .isEmail()
            .withMessage("Preencha um email válido."),
        body("password").isString().withMessage("A senha é obrigatória"),
    ];
};
module.exports = { userCreateValidation, userLoginValidation };
