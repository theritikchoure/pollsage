const Joi = require("joi");
const {
  handleControllerError,
} = require("../../../utils/helpers");
const Unsubscribe = require("../../models/unsubscribe.model.js");


// unsubscribe validation schema
const unsubscribeSchema = Joi.object({
    email: Joi.string().email().required(),
    reason: Joi.string().required(),
});

// Module Exports
module.exports = {
 unsubscribeEmail,
};

/**
 * @description unsubscribe email
 */
async function unsubscribeEmail(req) {
  try {
    
    const { error } = unsubscribeSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { email, reason } = req.body;

    // first check if email already exists
    const existingEmail = await Unsubscribe.findOne({ email});
    if (existingEmail) {
        throw Error("Email already unsubscribed");
    }

    const unsubscribe = new Unsubscribe({
        email,
        reason,
    });

    const unsubscribeData = await unsubscribe.save();

    return unsubscribeData;
  } catch (e) {
    throw handleControllerError(e);
  }
}