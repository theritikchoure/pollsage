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
const Comment = require("../../models/comment.model");

// Module Exports
module.exports = {
  fetchPollsOverview,
  fetchPollsPerformance,
  fetchRecentActivity,
    fetchAllActivity,
};

/**
 * @description fetch polls overview
 */
async function fetchPollsOverview(req) {
  try {
    const creator = await PollCreator.findOne({ _id: req.user._id }).populate(
      "createdPolls"
    );

    const totalPolls = creator.createdPolls.length;
    const activePolls = creator.createdPolls.filter(
      (poll) => poll.publish_status === "published"
    ).length;
    const archivedPolls = creator.createdPolls.filter(
      (poll) => poll.publish_status === "archived"
    ).length;

    const draftPolls = creator.createdPolls.filter(
      (poll) => poll.publish_status === "draft"
    ).length;

    return { totalPolls, activePolls, archivedPolls, draftPolls };
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description fetch polls performance
 */
async function fetchPollsPerformance(req) {
  try {
    const creator = await PollCreator.findOne({ _id: req.user._id }).populate(
      "createdPolls"
    );

    const pollIds = creator.createdPolls.map((poll) => poll._id);

    // Get all poll responses for the creator's polls
    const pollResponses = await PollResponse.find({
      poll: { $in: pollIds },
    }).exec();

    // Create an object to store votes for each option
    const optionVotes = {};
    creator.createdPolls.forEach((poll) => {
      poll.options.forEach((option) => {
        optionVotes[option._id.toString()] = 0; // Initialize vote count for each option
      });
    });

    // Create an array to store response rates for each poll
    const responseRates = [];

    // Create an object to store geographic data for poll responses
    const geographicData = {
      totalResponses: 0,
      countries: {},
      geoLocations: [],
    };

    // Count votes for each option and gather geographic data
    pollResponses.forEach((response) => {
      const { optionId, country, geo_location } = response;
      optionVotes[optionId.toString()]++;

      // Gather geographic data
      geographicData.totalResponses++;
      if (country) {
        geographicData.countries[country] =
          (geographicData.countries[country] || 0) + 1;
      }
      if (geo_location) {
        geographicData.geoLocations.push(geo_location);
      }
    });

    // Find the option with the maximum votes (popular option)
    let popularOptionId;
    let maxVotes = 0;
    for (const optionId in optionVotes) {
      if (optionVotes[optionId] > maxVotes) {
        maxVotes = optionVotes[optionId];
        popularOptionId = optionId;
      }
    }

    // Find the corresponding option object
    const popularOption = creator.createdPolls.reduce((result, poll) => {
      const option = poll.options.find(
        (opt) => opt._id.toString() === popularOptionId
      );
      if (option) {
        result = {option, poll};
      }
      return result;
    }, null);

    // Calculate the average response rate
    responseRates.push(
      (geographicData.totalResponses / creator.createdPolls.length) * 100
    );
    const averageResponseRate = calculateAverage(responseRates);

    return { popularOption, averageResponseRate, geographicData };
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description fetch recent activity
 */
async function fetchRecentActivity(req) {
  try {
    const creator = await PollCreator.findOne({ _id: req.user._id }).populate(
      "createdPolls"
    );

    // Fetch recent activity related to created polls and comments
    const pollsActivity = creator.createdPolls.map((poll) => ({
      type: "Poll",
      activity: "New Poll Created",
      title: poll.question,
      date: poll.createdAt,
    }));

    const createdPolls = creator.createdPolls.map((poll) => 
        poll.pollId.toString()
    );

    const commentsActivity = await Comment.find({
      pollId: { $in: createdPolls },
    }).exec();

    const commentsActivityData = commentsActivity.map((comment) => ({
      type: "Comment",
      activity: "New Comment",
      pollId: comment.pollId,
      comment: comment.comment,
      date: comment.createdAt,
    }));


    // Combine and sort the activities
    const recentActivity = [...pollsActivity, ...commentsActivityData].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    return recentActivity;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description fetch all activity
 */
async function fetchAllActivity(req) {
    try {
        const creator = await PollCreator.findOne({ _id: req.user._id }).populate(
            "createdPolls"
        );

        // Fetch all activity related to created polls and comments
        const pollsActivity = creator.createdPolls.map((poll) => ({
            type: "Poll",
            activity: "New Poll Created",
            title: poll.question,
            date: poll.createdAt,
        }));

        const createdPolls = creator.createdPolls.map((poll) =>
            poll.pollId.toString()
        );

        const commentsActivity = await Comment.find({
            pollId: { $in: createdPolls },
        }).exec();

        const commentsActivityData = commentsActivity.map((comment) => ({
            type: "Comment",
            activity: "New Comment",
            pollId: comment.pollId,
            comment: comment.comment,
            date: comment.createdAt,
        }));

        // Combine and sort the activities
        const allActivity = [...pollsActivity, ...commentsActivityData].sort(
            (a, b) => new Date(b.date) - new Date(a.date)
        );

        return allActivity;
    } catch (e) {
        throw handleControllerError(e);
    }
}

/**
 * @description Function to calculate the average of an array of numbers
 */ 
const calculateAverage = (arr) => {
    if (arr.length === 0) return 0;
    const sum = arr.reduce((total, num) => total + num, 0);
    return sum / arr.length;
  };