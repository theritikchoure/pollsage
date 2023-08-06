const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../../utils/helpers");
const Poll = require("../../models/poll.model");
const PollCreator = require("../../models/creator.model");
const PollResponse = require("../../models/poll_response.model");
const {
  createPollValidation, updatePollValidation,
} = require("../../../validations/creators/poll.validations");
const { getDatabaseConnection } = require("../../../config/db");
const getPaginatedResults = require("../../utils/get_paginated_result.js");

// Module Exports
module.exports = {
  addPoll,
  getAllPolls,
  getPollById,
  updatePollById,
  submitPoll,
  pollResult,
  deletePoll,
};

/**
 * @description add poll
 */
async function addPoll(req) {
  try {
    const { error } = createPollValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { body } = req;

    body.pollId = generateString(6);

    console.log("poll_controller line 35", req);

    const poll = await new Poll(body).save();

    // Update PollCreator inside the transaction
    const pollCreatorUpdateResult = await PollCreator.findByIdAndUpdate(
      req.user._id,
      {
        $push: { createdPolls: poll._id },
        $inc: { totalPollsCreated: 1 },
      }
    );

    // Check if the PollCreator update was successful
    if (!pollCreatorUpdateResult) {
      throw new Error("Failed to update poll creator with " + req.user._id);
    }

    return poll;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getAllPolls(req) {
  try {
    
    const polls = await PollCreator.aggregate([
      {
        $lookup: {
          from: "polls",
          localField: "createdPolls",
          foreignField: "_id",
          as: "createdPolls",
        },
      },
      {
        $unwind: "$createdPolls",
      },
      {
        $sort: { "createdPolls.createdAt": -1 }, // Sort by createdAt field in descending order
      },
      {
        $group: {
          _id: "$_id",
          createdPolls: { $push: "$createdPolls" },
        },
      },
    ]);

    let currentPage = req.query.page || 1;
    let perPage = req.query.limit || 10;

    if (polls.length > 0) {
      const createdPolls = polls[0].createdPolls;

      // Calculate pagination details
      const totalPolls = createdPolls.length;
      const skipCount = (currentPage - 1) * perPage;
      const totalPages = Math.ceil(totalPolls / perPage);
      const paginatedPolls = createdPolls.slice(skipCount, skipCount + perPage);

      const pagination = {
        itemCount: totalPolls,
        docs: paginatedPolls,
        perPage: perPage,
        currentPage: currentPage,
        next: Number(currentPage) < totalPages ? Number(currentPage) + 1 : null,
        prev: currentPage > 1 ? currentPage - 1 : null,
        pageCount: totalPages,
        slNo: skipCount + 1,
      };

      return pagination;
    }

    return [];
  } catch (e) {
    console.log(e)
    throw handleControllerError(e);
  }
}

async function getPollById(req) {
  try {
    const pollId = req.params.pollId;

    //check pollId is exist or not
    if (!pollId) {
      throw Error("poll id is required");
    }

    // retrieve the poll from the database
    let poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    return poll;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function updatePollById(req) {
  try {
    const pollId = req.params.pollId;

    //check pollId is exist or not
    if (!pollId) {
      throw Error("poll id is required");
    }

    const { error } = updatePollValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    // Retrieve the poll from the database
    let poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // Update the poll
    let updatePoll = await Poll.findOneAndUpdate(
      { pollId },
      {
        $set: req.body,
      },
      { new: true }
    );

    return updatePoll;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function submitPoll(req) {
  try {
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
      poll: poll._id,
      ipAddress: req.body.ip,
      optionId: optionId,
      country: req.body.country,
    }).save();

    return poll;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function pollResult(req) {
  try {
    const pollId = req.params.pollId;

    // Retrieve the poll from the database
    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // Find the poll responses for the poll
    const pollResponses = await PollResponse.find({ poll: poll._id });

    // Calculate total votes
    const totalVotes = poll.options.reduce(
      (total, option) => total + option.votes,
      0
    );

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

async function deletePoll(req) {
  try {
    const pollId = req.params.pollId;

    // Retrieve the poll from the database
    const poll = await Poll.findOne({ pollId });

    if (!poll) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // Delete the poll
    await Poll.findByIdAndDelete(poll._id);

    // delete poll responses for the poll
    await PollResponse.deleteMany({ poll: poll._id });

    // Update PollCreator createdPolls
    await PollCreator.findByIdAndUpdate(req.user._id, {
      $pull: { createdPolls: poll._id },
      $inc: { totalPollsCreated: -1 },
    });

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}
