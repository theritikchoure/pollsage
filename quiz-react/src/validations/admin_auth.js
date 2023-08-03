const { isEmpty } = require("../helpers/common");

const adminLoginValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.username)) {
      errors.username = "Username is required";
    }

    if (isEmpty(payload.password)) {
      errors.password = "Password is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

module.exports = {
  adminLoginValidation,
};
