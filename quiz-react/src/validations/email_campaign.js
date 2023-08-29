const { isEmpty } = require("../helpers/common");

const emailCampaignValidation = (payload) => {
  try {
    let errors = {};

    if (!payload.name) {
      errors.name = "Campaign name is required";
    }

    if (!payload.recipient_list) {
      errors.recipient_list = "Recipient list is required";
    }

    // check email is valid from recipient list
    if (payload.recipient_list) {
      let emails = payload.recipient_list.split("\n").map((email) => email.trim());

      emails.forEach((email, index) => {
        if (index !== 0 && !email.includes("@")) {
          errors.recipient_list = "Recipient list is invalid";
        }
      });
    }

    if (!payload.status) {
      errors.status = "Status is required";
    }

    if (payload.status === "scheduled" && !payload.schedule) {
      errors.schedule = "Schedule is required";
    }

    if (payload.status === "sent" && !payload.sentAt) {
      errors.sentAt = "Sent date is required";
    }

    return { errors, isValid: isEmpty(errors) };
  } catch (error) {
    return { errors: error, isValid: false };
  }
};

module.exports = {
  emailCampaignValidation,
};
