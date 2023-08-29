const { handleControllerError } = require("../../../utils/helpers");
const PageView = require("../../models/analytics/page_views.model.js");
const moment = require("moment");

// Module Exports
module.exports = {
  getToppages,
};

async function getToppages(req) {
  try {
    // Calculate total number of visits per URL
    const urlStats = await PageView.aggregate([
      {
        $group: {
          _id: "$url",
          totalVisits: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          totalVisits: 1,
        },
      },
    ]);

    // Calculate source distribution
    const sourceStats = await PageView.aggregate([
      {
        $group: {
          _id: "$source",
          totalVisits: { $sum: 1 },
        },
      },
    ]);

    // Calculate top referring URLs
    const topReferrers = await PageView.aggregate([
      {
        $match: { referrer: { $ne: null } },
      },
      {
        $group: {
          _id: "$referrer",
          totalVisits: { $sum: 1 },
          totalSessions: {
            $sum: { $cond: [{ $eq: ["$source", "direct"] }, 1, 0] },
          },
        },
      },
      {
        $sort: { totalVisits: -1 },
      },
      {
        $limit: 5, // Show top 5 referring URLs
      },
    ]);

    // Calculate most visited pages with bounce rate
    const mostVisitedPages = await PageView.aggregate([
      {
        $group: {
          _id: "$url",
          totalVisits: { $sum: 1 },
        },
      },
      {
        $sort: { totalVisits: -1 },
      },
      {
        $limit: 5, // Show top 5 visited pages
      },
    ]);

    const geo_location = await PageView.aggregate([
      {
        $match: {
          geo_location: { $ne: null },
        },
      },
      {
        $facet: {
          countryStats: [
            {
              $group: {
                _id: "$geo_location.country",
                totalVisits: { $sum: 1 },
                timezones: { $addToSet: "$geo_location.timezone" },
              },
            },
            {
              $sort: { totalVisits: -1 },
            },
          ],
          timezoneStats: [
            {
              $group: {
                _id: "$geo_location.timezone",
                totalVisits: { $sum: 1 },
              },
            },
            {
              $sort: { totalVisits: -1 },
            },
          ],
        },
      },
    ]);

    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);

    const pageViews = await PageView.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo, $lt: today },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          totalVisits: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    const sessionStats = await PageView.aggregate([
      {
        $match: {
          session_id: { $ne: null },
        },
      },
      {
        $group: {
          _id: "$session_id",
          sessionCount: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 }, // Count total sessions
          totalVisits: { $sum: "$sessionCount" }, // Count total visits across all sessions
        },
      },
      {
        $project: {
          _id: 0,
          totalSessions: 1,
          totalVisits: 1,
          averageVisitsPerSession: {
            $round: [
              { $divide: ["$totalVisits", "$totalSessions"] },
              2, // Number of decimal places
            ],
          },
        },
      },
    ]);

    const bounceRate = await calculateBounceStats();

    sessionStats[0].bounceRate = bounceRate;

    const startDate = moment().startOf("day").toDate();
    const endDate = moment().endOf("day").toDate();

    const todayUrlVisits = await PageView.find({
      createdAt: { $gte: startDate, $lte: endDate },
    }).select("url createdAt source referrer -_id");

    return {
      urlStats, // Total number of visits per URL
      sourceStats, // Source distribution
      topReferrers, // Top referring URLs
      mostVisitedPages, // Most visited pages
      geo_location: {
        countryStats: geo_location[0].countryStats, // Top countries
        timezoneStats: geo_location[0].timezoneStats, // Top timezones
      },
      pageViews, // Page views for the last 30 days
      sessionStats: sessionStats[0], // Session stats (average visits per session)
      todayUrlVisits, // Total number of visits today
    };
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function calculateBounceStats() {
  try {
    // Calculate total sessions
    const totalSessions = await PageView.distinct("session_id").countDocuments({
      session_id: { $ne: null },
    });

    // Calculate total visits
    const totalVisits = await PageView.countDocuments({
      session_id: { $ne: null },
    });

    // Calculate bounce sessions (sessions with only one page view)
    const bounceSessions = await PageView.aggregate([
      {
        $group: {
          _id: "$session_id",
          pageCount: { $sum: 1 }, // Count the number of page views in each session
        },
      },
      {
        $match: {
          pageCount: 1, // Only consider sessions with one page view
        },
      },
      {
        $count: "bounceSessions", // Count the sessions with one page view
      },
    ]);

    // Extract the count of bounce sessions or set it to 0 if there are no bounce sessions
    const bounceSessionCount = bounceSessions[0]?.bounceSessions || 0;

    // Calculate the bounce rate
    const bounceRate = (bounceSessionCount / totalSessions) * 100;

    return Math.round(bounceRate * 100) / 100 // Round to 2 decimal places
  } catch (error) {
    throw error;
  }
}
