const cluster = require('cluster');
const os = require('os');
const http = require("http");
const app = require("./app");
const { createWebSocketServer } = require("./websocket");
const logger = require("./config/logger.js");

// if (cluster.isMaster) {
//   // Get the number of CPU cores
//   const numCPUs = os.cpus().length;

//   // Fork worker processes based on the number of CPU cores
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // Handle worker process exit and create a new one if needed
//   cluster.on('exit', (worker, code, signal) => {
//     logger.error(`Worker ${worker.process.pid} died`);
//     // Fork a new worker process to replace the one that died
//     cluster.fork();
//   });
// } else {
  // Create an HTTP server using the Express app
  const server = http.createServer(app);

  // Create the WebSocket server
  const io = createWebSocketServer(server);

  // Start the server
  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    logger.info(`Worker ${process.pid} is running on port ${port}`);
  });

  module.exports = { app, io };
// }
