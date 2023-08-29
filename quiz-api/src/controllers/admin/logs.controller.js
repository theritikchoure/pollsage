const { handleControllerError } = require("../../../utils/helpers");
const RequestLog = require('../../models/analytics/request_log.model');

// Module Exports
module.exports = {
  fetchLogs,
};

async function fetchLogs(req) {
  try {

    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;

    const skipCount = (page - 1) * limit;

    let logs = await RequestLog.find({}).sort({ createdAt: -1 }).skip(skipCount).limit(limit);

    return logs;

  } catch (e) {
    throw handleControllerError(e);
  }
}