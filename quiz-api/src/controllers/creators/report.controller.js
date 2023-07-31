const { resMsg, defaultLen } = require("../../../config/constant");
const { handleControllerError } = require("../../../utils/helpers");
const PollCreator = require("../../models/creator.model");
const Poll = require("../../models/poll.model");
const PollResponse = require("../../models/poll_response.model");
const Comment = require("../../models/comment.model");
const fs = require("fs");

// Module Exports
module.exports = {
  generatePollReport,
  downloadPollReport,
};

/**
 * @description generate poll report
 */
async function generatePollReport(req) {
  try {
    const { pollId } = req.params;

    if (!pollId) throw new Error("Poll id is required");

    const report = await calculateReportData(pollId, req.user._id);

    return report;
  } catch (e) {
    throw handleControllerError(e);
  }
}

const template = `
<!DOCTYPE html>
<html>
<head>
  <style>
    /* Add your custom styles here */
    body {
      font-family: Arial, sans-serif;
    }
    h1 {
      text-align: center;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
    }
    th {
      background-color: #f2f2f2;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <h1>Poll Report</h1>
  <p>Poll ID: {{pollId}}</p>
  <p>Poll Question: {{pollQuestion}}</p>
  <p>Total Responses: {{totalResponses}}</p>
  <p>Total Comments: {{totalComments}}</p>
  <p>Average Votes Per Option: {{averageVotesPerOption}}</p>
  <h2>Comment Sentiments:</h2>
  <table>
    <tr>
      <th>Comment</th>
      <th>Sentiment</th>
    </tr>
    {{#each commentSentiments}}
    <tr>
      <td>{{this.comment}}</td>
      <td>{{this.sentiment.label}}</td>
    </tr>
    {{/each}}
  </table>
</body>
</html>
`;

/**
 * @description download poll report as pdf
 */
async function downloadPollReport(req, res) {
  try {
    const { pollId } = req.params;

    if (!pollId) throw new Error("Poll id is required");

    const report = await calculateReportData(pollId, req.user._id);

    // Replace the placeholders in the template with data
    const htmlContent = template.replace(/\{\{(.+?)\}\}/g, (match, p1) => {
      return report[p1] || "";
    });

    const pdfOptions = {
      format: "Letter",
      border: {
        top: "1cm",
        right: "1cm",
        bottom: "1cm",
        left: "1cm",
      },
    };

  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description calculate report data
 */
async function calculateReportData(pollId, userId) {
  try {
    // Get the poll details
    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new Error("Poll not found");
    }

    // check if poll is created by the user

    const pollCreator = await PollCreator.findById(userId);

    // check poll id is present in the poll creator polls array
    if (!pollCreator.createdPolls.includes(pollId)) {
      throw new Error("Unauthorized access");
    }

    // Get poll responses
    const pollResponses = await PollResponse.find({ poll: poll._id });

    // Get comments
    const comments = await Comment.find({ pollId: poll.pollId });

    // Calculate total responses and votes for each option
    const optionVotes = poll.options.map((option) => {
      const votes = pollResponses.filter((response) =>
        response.optionId.equals(option._id)
      ).length;
      return {
        option: option.text,
        votes,
      };
    });

    // Calculate total likes for each comment
    const commentLikes = comments.map((comment) => {
      return {
        comment: comment.comment,
        likes: comment.likes.length,
      };
    });

    // Perform data analysis
    const totalResponses = pollResponses.length;
    const totalComments = comments.length;
    const totalOptionVotes = optionVotes.reduce(
      (total, option) => total + option.votes,
      0
    );
    const averageVotesPerOption = totalOptionVotes / poll.options.length;
    const mostVotedOption = optionVotes.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );

    // Geographic Analysis (k-means clustering of geographic coordinates)
    const responseGeoLocations = pollResponses
      .map((response) => response.geo_location)
      .filter(Boolean);

    let clusters = [];
    if (responseGeoLocations.length >= 100) {
      const kmeansData = responseGeoLocations.map((geo) => [geo.lat, geo.lon]);
      clusters = kmeans(kmeansData, { k: 3 }); // You can change 'k' based on your desired number of clusters
    }

    // Sentiment Analysis
    const commentSentiments = comments.map((comment) => {
      return {
        comment: comment.comment,
        sentiment: comment.sentiment,
      };
    });

    // Generate the detailed report
    const report = {
      pollId: poll.pollId,
      pollQuestion: poll.question,
      totalResponses,
      totalComments,
      optionVotes,
      commentLikes,
      averageVotesPerOption,
      mostVotedOption,
      geographicClusters: clusters,
      commentSentiments,
    };

    return report;
  } catch (e) {
    throw e;
  }
}
