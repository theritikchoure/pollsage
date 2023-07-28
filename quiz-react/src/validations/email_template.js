const { isEmpty } = require("../helpers/common");

const emailTemplateValidation = (payload) => {
  try {
    console.log(payload)
    let errors = {};

    if (!payload.title) {
        errors.title = "Title is required.";
    }

    if (!payload.subject) {
        errors.subject = "Subject is required.";
    }

    if (!payload.html_content) {
        errors.html_content = "HTML Content is required.";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

module.exports = {
  emailTemplateValidation
};
