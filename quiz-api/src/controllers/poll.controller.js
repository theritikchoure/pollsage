const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../utils/helpers");
const Poll = require("../models/poll.model");
const PollResponse = require("../models/poll_response.model");
const { getIO } = require("../../websocket");
const moment = require("moment");

// Polls Add Validation Schema
const pollSchema = Joi.object({
  question: Joi.string().required(),
  options: Joi.array()
    .items(
      Joi.object({
        text: Joi.string().required(),
        votes: Joi.number().default(0),
      })
    )
    .required(),
    allow_multiple_selection: Joi.boolean().default(false),
  // creator: Joi.string().required(),
});

// Module Exports
module.exports = {
  addPoll,
  getPoll,
  submitPoll,
  pollResult,
  checkPasswordProtection,
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

async function getPoll(req) {
  try {
    // check req.params.pollId is exist or not
    if (!req.params.pollId) {
      throw Error(resMsg.BAD_REQUEST);
    }

    // find poll by pollId and publish status, exclude password field
    const poll = await Poll.findOne({ pollId: req.params.pollId, publish_status: 'published' }).populate('selected_theme');

    // check poll is exist or not
    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    if(poll.password) {
      // check password from query string
      if(!req.query.password) {
        throw Error("Password is required");
      }

      // check password is correct or not
      if(poll.password !== req.query.password) {
        throw Error("Password is incorrect");
      }
    }

    // Check if start_date is valid and in the future
    if (poll.start_date && moment(poll.start_date).isAfter(moment())) {
      // If the start_date is in the future, add a {poll_start} key in the response with the start date and time
      return {
        poll_start: poll.start_date,
      };
    }

    // Check if end_date is valid and in the past
    if (poll.end_date && moment(poll.end_date).isBefore(moment())) {
      // If the end_date is in the past, add a {poll_end} key in the response with the end date and time
      return {
        poll_expired: true,
      };
    }

    // remove password field from poll object
    const response = poll.toObject();
    delete response.password;

    if (poll?.selected_theme && !poll?.selected_theme.is_active) {
      delete response.selected_theme;
    }

    return response;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function submitPoll(req) {
  try {

    const io = getIO();

    console.log(io);

    // check req.body.optionId is exist or not
    if (!req.body.optionId) {
      throw Error("option id is required");
    }
    const pollId = req.params.pollId;
    const { optionId } = req.body;

    // Retrieve the poll from the database
    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // check user is already voted or not
    const pollResponse = await PollResponse.findOne({
      poll: poll._id,
      ipAddress: req.body.ip,
    });

    if (pollResponse) {
      throw Error("You have already voted");
    }

    // find the index of option by optionId
    const optionIndex = poll.options.findIndex(
      (option) => option._id == optionId
    );

    poll.options[optionIndex].votes += 1;

    // save the poll
    await poll.save();

    // save the poll response
    await new PollResponse({
      name: req.body.name || "Guest",
      poll: poll._id,
      ipAddress: req.body.ip,
      optionId: optionId,
      country: req.body.geo_location.country,
      geo_location: req.body.geo_location,
    }).save();

    const result = await getResult(pollId);

    io.emit(`pollResultUpdated-${req.params.pollId}`, {pollId: req.params.pollId, result});

    return poll;
  } catch (e) {
    throw handleControllerError(e);
  }
}


async function pollResult(req) {
  try {
    const pollId = req.params.pollId;
    
    return await getResult(pollId);
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getResult(pollId) {
  try {
    // Retrieve the poll from the database
    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // Find the poll responses for the poll
    const pollResponses = await PollResponse.find({ poll: poll._id }).sort({ createdAt: -1 });;

    // Calculate total votes
    const totalVotes = poll.options.reduce((total, option) => total + option.votes, 0);

    // Prepare the response object
    const pollResults = {
      poll,
      totalVotes,
      pollResponses,
    };

    return pollResults;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function checkPasswordProtection(req) {
  try {
    // check only poll is password protected or not
    const poll = await Poll.findOne({ pollId: req.params.pollId, publish_status: 'published' });

    // check poll is exist or not
    if(!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    if(poll.password) {
      return { password_protected: true };
    }

    return { password_protected: false };
  } catch (e) {
    throw handleControllerError(e);
  }
}