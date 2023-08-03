const os = require("os");
const { handleControllerError } = require("../../../utils/helpers");
const fs = require('fs');

// Module Exports
module.exports = {
  getServerDetails,
  getServerLogs
};

async function getServerDetails(req) {
  try {
    const serverHealth = {
        uptime: os.uptime(),
        totalMemory: os.totalmem(),
        freeMemory: os.freemem(),
        loadAverage: os.loadavg(),
        // Add more health-related data as needed
      };
    
      return serverHealth;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getServerLogs(req) {
  try {
    const date = new Date();
    // only date with year, month
    const dateStr = date.toISOString().split('T')[0];
    const logData = fs.readFileSync(`logs/application-${dateStr}.log`, 'utf8'); // Read log data from the log file
    return { logs: logData.split('\n') } 
  } catch (e) {
    throw handleControllerError(e);
  }
}