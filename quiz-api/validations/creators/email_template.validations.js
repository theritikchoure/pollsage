const Joi = require("joi");

const emailTemplateValidation = Joi.object({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    html_content: Joi.string().required(),
    css_content: Joi.string().allow(null).allow(''),
    is_active: Joi.boolean().optional().default(true),
});


module.exports = { emailTemplateValidation };