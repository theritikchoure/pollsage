const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../config/constant");
const { handleControllerError, generateString } = require("../../utils/helpers");
const Poll = require("../models/poll.model");

// AboutUs Validation Schema
const pollSchema = Joi.object({
    question: Joi.string().required(),
    options: Joi.array().items(Joi.object({
        text: Joi.string().required(),
        votes: Joi.number().default(0),
    })).required(),
    allowMultipleSelection: Joi.boolean().default(false),
    // creator: Joi.string().required(),
});

// Module Exports
module.exports = {
  addPoll,
};

/**
 * @description add poll
 */
async function addPoll(req) {
  try {
    // req.body.creator = mongoose.Types.ObjectId(req.user.id);
    const { error } = pollSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { body } = req;

    body.pollId = generateString(6);

    return await new Poll(body).save();
  } catch (e) {
    throw handleControllerError(e);
  }
}
