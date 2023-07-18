const { isEmpty, isEmail } = require("../helpers/common");

const createPollValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.question)) {
      errors.question = "Question is required";
    }

    if (isEmpty(payload.options)) {
        errors.options = "Options is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

const submitPollValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.optionId)) {
      errors.optionId = "Please select an option";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
}

module.exports = {
  createPollValidation, submitPollValidation
};
