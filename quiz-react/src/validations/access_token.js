const { isEmpty, isEmail } = require("../helpers/common");

const createAccessTokenValidation = (payload) => {
  try {
    let errors = {};

    console.log(payload)

    if (!payload.purpose) {
        errors.purpose = "Purpose is required";
    }

    if (!payload.team) {
        errors.team = "Team is required";
    }

    if (!payload.expiration_time || payload.expiration_time === "h") {
        errors.expiration_time = "Expiration time is required";
    }

    if(isEmpty(payload.routes)) {
        errors.routes = "Routes are required";
    }

    if(isEmpty(payload.methods)) {
        errors.methods = "Methods are required";
    }


    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};


module.exports = {
  createAccessTokenValidation
};
