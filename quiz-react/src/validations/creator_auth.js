const { isEmpty, isEmail } = require("../helpers/common");

const creatorRegisterValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.name)) {
      errors.name = "Name is required";
    }

    if (isEmpty(payload.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(payload.email)) {
      errors.email = "Email is not valid";
    }

    if (isEmpty(payload.password)) {
      errors.password = "Password is required";
    }

    if (isEmpty(payload.confirm_password)) {
      errors.confirm_password = "Confirm password is required";
    } else if (payload.password !== payload.confirm_password) {
      errors.confirm_password = "Password and confirm password must be same";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

const creatorLoginValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(payload.email)) {
      errors.email = "Email is not valid";
    }

    if (isEmpty(payload.password)) {
      errors.password = "Password is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

const creatorForgetPasswordValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.email)) {
      errors.email = "Email is required";
    } else if (!isEmail(payload.email)) {
      errors.email = "Email is not valid";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

const creatorResetPasswordValidation = (payload) => {
  try {
    let errors = {};

    if (isEmpty(payload.password)) {
      errors.password = "Password is required";
    }

    if (isEmpty(payload.confirm_password)) {
      errors.confirm_password = "Confirm password is required";
    } else if (payload.password !== payload.confirm_password) {
      errors.confirm_password = "Password and confirm password must be same";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

module.exports = {
  creatorRegisterValidation,
  creatorLoginValidation,
  creatorForgetPasswordValidation,
  creatorResetPasswordValidation,
};
