const os = require("os");
const User = require('../../models/user.model');
const Poll = require('../../models/poll.model');
const Creator = require('../../models/creator.model');
const { handleControllerError } = require("../../../utils/helpers");

// Module Exports
module.exports = {
  getServerDetails, getApplicationStats
};

async function getServerDetails(req) {
  try {
    let serverHealth = {
      uptime: os.uptime(), // Uptime in seconds
      totalMemory: os.totalmem(), // Total memory in bytes
      freeMemory: os.freemem(), // Free memory in bytes
      loadAverage: os.loadavg(), // Load averages for the last 1, 5, and 15 minutes
      // Additional fields
      cpus: os.cpus(), // Information about each CPU core
      cpuUsage: os.cpus().map((cpu) => os.cpus()[0].times), // CPU usage for each core
      totalCores: os.cpus().length, // Total number of CPU cores
      architecture: os.arch(), // Architecture (e.g., x64, arm)
      platform: os.platform(), // Operating system platform (e.g., win32, linux)
      release: os.release(), // OS release version
      hostname: os.hostname(), // Hostname of the machine
      networkInterfaces: os.networkInterfaces(), // Network interfaces
      tempDir: os.tmpdir(), // Temporary directory path
      avgCpuUsage: null,
    };

    // Calculate average CPU usage across all cores
    const cpuUsageArray = os.cpus().map((cpu) => cpu.times);
    const totalCpuUsage = cpuUsageArray.reduce(
      (acc, cpuTimes) => acc + (cpuTimes.user + cpuTimes.nice + cpuTimes.sys + cpuTimes.irq),
      0
    );
    const totalCpuTime = cpuUsageArray.reduce(
      (acc, cpuTimes) => acc + (cpuTimes.user + cpuTimes.nice + cpuTimes.sys + cpuTimes.irq + cpuTimes.idle),
      0
    );
    const avgCpuUsage = (totalCpuUsage / totalCpuTime) * 100; // Calculate average as a percentage
    serverHealth.avgCpuUsage = avgCpuUsage.toFixed(2); // Add average CPU usage to the serverHealth object
    
    return serverHealth;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getApplicationStats(req) {
  try {
    // calculate number of polls
    const total_polls = await Poll.countDocuments();

    // calculate number of creators
    const total_creators = await Creator.countDocuments();

    // calculate number of users
    const total_users = await User.countDocuments();

    return {
      total_polls,
      total_creators,
      total_users,
    }
  } catch (e) {
    throw handleControllerError(e);
  }
}