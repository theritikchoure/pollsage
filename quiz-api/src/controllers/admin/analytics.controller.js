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
          totalSessions: { $sum: "$sessionCount" },
        },
      },
    ]);

    const totalSessions =
      sessionStats.length > 0 ? sessionStats[0].totalSessions : 0;

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
      totalSessions, // Total number of sessions
      todayUrlVisits, // Total number of visits today
    };
  } catch (e) {
    throw handleControllerError(e);
  }
}
