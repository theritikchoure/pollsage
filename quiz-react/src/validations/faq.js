const { isEmpty } = require("../helpers/common");

const createFAQValidation = (payload) => {
  try {
    console.log(payload)
    let errors = {};

    if (isEmpty(payload.title)) {
        errors.title = "Title is required";
    }

    if (isEmpty(payload.tags)) {
        errors.tags = "Tags is required";
    }

    if (isEmpty(payload.faqs)) {
        errors.faqs = "FAQs is required";
    }

    if (isEmpty(payload.is_active)) {
        errors.is_active = "Is Active is required";
    }

    if (payload.faqs && payload.faqs.length > 0) {
        payload.faqs.forEach((faq, index) => {
            if (isEmpty(faq.question)) {
                errors[`faqs[${index}].question`] = "Question is required";
            }

            if (isEmpty(faq.answer)) {
                errors[`faqs[${index}].answer`] = "Answer is required";
            }

            if (isEmpty(faq.is_active)) {
                errors[`faqs[${index}].is_active`] = "Is Active is required";
            }
        });
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};


module.exports = {
  createFAQValidation
};
