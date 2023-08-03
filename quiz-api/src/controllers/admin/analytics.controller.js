const { handleControllerError } = require("../../../utils/helpers");
const PageView = require("../../models/analytics/page_views.model.js");

// Module Exports
module.exports = {
  getToppages
};

async function getToppages(req) {
  try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 10;
        
    const topPages = await PageView.aggregate([
        {
          $group: {
            _id: '$url',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
        { $limit: limit },
      ]);
  
      return topPages;
  } catch (e) {
    throw handleControllerError(e);
  }
}