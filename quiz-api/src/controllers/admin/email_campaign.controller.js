const cron = require("node-cron");

// Define the cron job schedule (every second)
const cronExpression = "50 22 11 8 *";

// Create a cron job
let job1 = cron.schedule(cronExpression, () => {
  // This function will be executed every second
  console.log("Cron job is running...");
}, {
  scheduled: true,
});

// Start the cron job
job1.start();

let job2 = cron.schedule(cronExpression, () => {
  // This function will be executed every second
  console.log("Cron job is running...");
}, {
  scheduled: true,
});

// Start the cron job
// job2.start();

// Optionally, you can stop the cron job after a certain period
// setTimeout(() => {
//   myCronJob.stop();
//   console.log("Cron job stopped.");
// }, 6000); // Stop the cron job after 5 seconds (adjust as needed)
