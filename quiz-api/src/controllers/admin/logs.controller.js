const fs = require('fs').promises;
const path = require("path");
const { handleControllerError } = require("../../../utils/helpers");

// Module Exports
module.exports = {
  fetchLogs,
};

async function fetchLogs(req) {
  try {

    const limit = parseInt(req.query.limit) || 50;
    const page = parseInt(req.query.page) || 1;

    console.log(limit, page)

    // Get the current date in YYYY-MM-DD format
    const currentDate = new Date().toISOString().slice(0, 10);

    const logFilePath = path.join(
      __dirname,
      "../../../logs",
      `application-${currentDate}.log`
    );

   // Read log file
   const data = await fs.readFile(logFilePath, "utf8");

   // Split logs into an array of lines
   const logs = data.split("\n");

   // Return the latest 50 logs (assuming the logs are in chronological order)
   const reverseLogs = logs.reverse();

   const [startIndex, endIndex] = calculateIndexRange(limit, page);

   console.log(startIndex, endIndex)

   const latestLogs = reverseLogs.slice(parseInt(startIndex), parseInt(endIndex) + 1);

   return latestLogs;
  } catch (e) {
    throw handleControllerError(e);
  }
}

function calculateIndexRange(limit, page) {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit - 1;

  return [startIndex, endIndex];
}