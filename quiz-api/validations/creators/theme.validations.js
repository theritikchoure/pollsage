const Joi = require("joi");

const themeValidations = Joi.object({
    theme_name: Joi.string().required(),
    is_dark_theme: Joi.boolean().required(),
    colors: Joi.object({
        pollContainerBackgroundColor: Joi.string().required(),
        pollBoxBackgroundColor: Joi.string().required(),
        pollQuestionColor: Joi.string().required(),
        formLabelColor: Joi.string().required(),
        pollOptionsLabelColor: Joi.string().required(),
        voteButtonBackgroundColor: Joi.string().required(),
        inputFieldPlaceholderColor: Joi.string().required(),
        inputFieldColor: Joi.string().required(),
        commentNameColor: Joi.string().required(),
        commentTextColor: Joi.string().required(),
    }).required(),
    is_active: Joi.boolean().required(),
});


module.exports = { themeValidations };