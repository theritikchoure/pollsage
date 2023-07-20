const { isEmpty, isEmail } = require("../helpers/common");

const createPollValidation = (payload) => {
  try {
    console.log(payload)
    let errors = {};

    if (isEmpty(payload.question)) {
      errors.question = "Question is required";
    }

    // options are array of object, object containing text as key, validate each option is required
    payload.options.forEach((option, index) => {
      if (isEmpty(option.text)) {
        errors[`option${index}`] = "Option is required";
      }
    });

    if (isEmpty(payload.options)) {
        errors.options = "Options is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

const submitPollValidation = (payload, requireName) => {
  try {
    let errors = {};

    if (isEmpty(payload.optionId)) {
      errors.optionId = "Please select an option";
    }

    if (requireName && isEmpty(payload.name)) {
      errors.name = "Name is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
}

module.exports = {
  createPollValidation, submitPollValidation
};
