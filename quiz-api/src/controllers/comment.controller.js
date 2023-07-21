const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../utils/helpers");
const Poll = require("../models/poll.model");
const Comment = require("../models/comment.model");
const { getIO } = require("../../websocket");
const Sentiment = require("sentiment");

// add comment validation
const commentSchema = Joi.object({
  comment: Joi.string().required(),
  display_name: Joi.string().required(),
  // ip: Joi.string().required(),
  // geo_location: Joi.object().required(),
});

// Module Exports
module.exports = {
  addComment,
  getAllComments,
};

/**
 * @description add poll
 */
async function addComment(req) {
  try {
    // check pollId exists or not
    if (!req.params.pollId) {
      throw Error("Poll id is required");
    }

    const { error } = commentSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const pollId = req.params.pollId;

    // check pollId exists or not
    const poll = await Poll.findOne({
      pollId,
      publish_status: "published",
      allow_comments: true,
    });
    if (!poll) {
      throw Error("Poll not found");
    }

    const { body } = req;

    const sentiment = new Sentiment();

    // Analyze sentiment of the comment
    const result = sentiment.analyze(body.comment);

    // Get sentiment score (-5 to 5, where -5 is very negative, 5 is very positive, and 0 is neutral)
    const sentimentScore = result.score;

    // Determine sentiment label
    let sentimentLabel;
    if (sentimentScore > 0) {
      sentimentLabel = "positive";
    } else if (sentimentScore < 0) {
      sentimentLabel = "negative";
    } else {
      sentimentLabel = "neutral";
    }

    body.pollId = pollId;
    body.sentiment = {
      score: sentimentScore,
      label: sentimentLabel,
    };

    let comment =  await new Comment(body).save();

    // Emit the event to all connected clients
    getIO().emit(`commentAdded-${pollId}`, {live: true});

    return comment;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get all comments
 */
async function getAllComments(req) {
  try {
    // check pollId exists or not
    if (!req.params.pollId) {
      throw Error("Poll id is required");
    }

    // check poll exists or not
    const poll = await Poll.findOne({
      pollId: req.params.pollId,
      publish_status: "published",
      allow_comments: true,
    });

    if (!poll) {
      throw Error("Poll not found");
    }

    // get all comments by pollId, latest first
    const comments = await Comment.find({
      pollId: req.params.pollId,
      is_active: true,
    })
      .sort({ createdAt: -1 })
      .populate("replies");

    return comments;
  } catch (error) {
    throw handleControllerError(error);
  }
}
