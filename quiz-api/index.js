const http = require("http");
const app = require("./app");
const {createWebSocketServer} = require("./websocket");

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Create the WebSocket server
const io = createWebSocketServer(server);

// Start the server
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = { app, io };