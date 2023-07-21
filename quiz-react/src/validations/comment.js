const { isEmpty, isEmail } = require("../helpers/common");

const commentValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.comment)) {
        errors.comment = "Comment is required";
    }

    if (isEmpty(payload.display_name)) {
        errors.display_name = "Name is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};


module.exports = {
  commentValidation
};
