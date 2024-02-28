const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
        return next;
    }

    const detectedErrors = [];
    errors.array().map((error) => {
        detectedErrors.push(error.msg);
    });

    return res.status(442).json({
        errors: detectedErrors,
    });
};

module.exports = validate;
