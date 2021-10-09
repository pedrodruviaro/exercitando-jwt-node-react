const Joi = require("joi");

function registerValidtion(data) {
    const schema = Joi.object({
        username: Joi.string().required().min(6).max(100),
        password: Joi.string().required().min(6).max(72),
        email: Joi.string().required().min(6).max(200).email(),
    });

    return schema.validate(data);
}

function loginValidation(data) {
    const schema = Joi.object({
        username: Joi.string().required().min(6).max(100),
        password: Joi.string().required().min(6).max(72),
    });

    return schema.validate(data);
}

function newPostValidation(data) {
    const schema = Joi.object({
        title: Joi.string().required().min(6).max(200),
        description: Joi.string().required().min(6).max(500),
        body: Joi.string().required().min(10),
    });

    return schema.validate(data);
}

module.exports = {
    registerValidtion,
    loginValidation,
    newPostValidation,
};
