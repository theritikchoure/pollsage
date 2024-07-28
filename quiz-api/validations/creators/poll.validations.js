const Joi = require("joi");

const createPollValidation = Joi.object({
  question: Joi.string().required(),
  allow_multiple_selection: Joi.boolean().default(false),
  description: Joi.string().allow(null).default(null),
  options: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      votes: Joi.number().default(0),
    })
  ),
  publish_status: Joi.string()
    .valid("published", "draft", "archived")
    .default("published"),
  start_date: Joi.string().allow(null).default(null),
  end_date: Joi.string().allow(null).default(null),
  result_visibility: Joi.string().valid("public", "private").default("public"),
  password: Joi.string().allow(null).default(null),
  share_btn: Joi.boolean().default(true),
  require_name: Joi.boolean().default(false),
  allow_comments: Joi.boolean().default(false),
  thank_you_message: Joi.string().allow(null).default(null),
  send_mail: Joi.boolean().default(false),
  logo: Joi.string().allow(null).default(null),
  selected_theme: Joi.string().allow(null).default(null),
});

const updatePollValidation = Joi.object({
  _id: Joi.string().optional(),
  question: Joi.string().required(),
  allow_multiple_selection: Joi.boolean().default(false),
  description: Joi.string().allow(null).default(null),
  options: Joi.array().items(
    Joi.object({
      text: Joi.string().required(),
      votes: Joi.number().default(0),
      _id: Joi.string().optional(),
    })
  ),
  publish_status: Joi.string()
    .valid("published", "draft", "archived")
    .default("published"),
  start_date: Joi.string().allow(null).default(null),
  end_date: Joi.string().allow(null).default(null),
  result_visibility: Joi.string().valid("public", "private").default("public"),
  password: Joi.string().allow(null).default(null),
  share_btn: Joi.boolean().default(true),
  require_name: Joi.boolean().default(false),
  allow_comments: Joi.boolean().default(false),
  thank_you_message: Joi.string().allow(null).default(null),
  send_mail: Joi.boolean().default(false),
  logo: Joi.string().allow(null).default(null),
  selected_theme: Joi.string().allow(null).default(null),
});

module.exports = { createPollValidation, updatePollValidation };