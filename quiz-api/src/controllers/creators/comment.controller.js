const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../../config/constant");
const { handleControllerError } = require("../../../utils/helpers");
const Poll = require("../../models/poll.model");
const Comment = require("../../models/comment.model");

// Module Exports
module.exports = {
  getAllComments,
};

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
      allow_comments: true,
    });

    if (!poll) {
      throw Error("Poll not found");
    }

    let currentPage = req.query.page || 1;
    let perPage = req.query.limit || 10;

    // Calculate the skip count based on the current page and limit
    const skipCount = (currentPage - 1) * perPage;

    // Get the total number of comments for the poll
    const totalComments = await Comment.countDocuments({
      pollId: req.params.pollId,
    });

    // get all comments by pollId, latest first, with pagination
    const comments = await Comment.find({
      pollId: req.params.pollId,
    })
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(perPage)
      .populate("replies");

    // Calculate the total number of pages
    const pageCount = Math.ceil(totalComments / perPage);

    // Create the pagination object with custom property names
    const pagination = {
      itemCount: totalComments,
      docs: comments,
      perPage: perPage,
      currentPage: currentPage,
      next: currentPage < pageCount ? currentPage + 1 : null,
      prev: currentPage > 1 ? currentPage - 1 : null,
      pageCount: pageCount,
      slNo: skipCount + 1,
      poll: poll,
    };

    return pagination;
  } catch (error) {
    throw handleControllerError(error);
  }
}
