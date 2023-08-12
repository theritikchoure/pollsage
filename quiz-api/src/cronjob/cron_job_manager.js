const cron = require('node-cron');

class CronJobManager {
  constructor() {
    this.jobs = new Map();
  }

  addJob(jobName, schedule, callback) {
    if (this.jobs.has(jobName)) {
      throw new Error(`A job with the name "${jobName}" already exists.`);
    }

    const job = cron.schedule(schedule, callback);
    this.jobs.set(jobName, job);
    console.log(`Job "${jobName}" scheduled with schedule "${schedule}"`);
  }

  removeJob(jobName) {
    const job = this.jobs.get(jobName);
    if (job) {
      job.stop();
      this.jobs.delete(jobName);
      console.log(`Job "${jobName}" removed.`);
    } else {
      console.log(`Job "${jobName}" not found.`);
    }
  }

  listJobs() {
    return Array.from(this.jobs.keys());
  }
}

module.exports = new CronJobManager();
