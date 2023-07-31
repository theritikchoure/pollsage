const express = require("express");
const morgan = require("morgan");
const db = require("./config/mongoose.js");
const errorHandler = require("./src/middlewares/error_handler.js");
const routes = require("./src/routes/index.js");
const env = require("./config/env.js");
const port = env.PORT;
const helmet = require("helmet");
const hpp = require("hpp");
const limiter = require("./config/rate_limiter.js");
const logger = require("./config/logger.js");
const session = require("express-session");
// const passport = require("passport");
const cors = require("cors");
const passport = require('./config/passport.js');

// Create the Express app
const app = express();

// Create an HTTP server using the Express app
const server = require("http").Server(app);

// Initialize Socket.io with the server
const io = require("socket.io")(server);

// Session middleware
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const corsOptions = {
  origin: '*',
};

app.use(cors());

// Middleware for logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(hpp());

app.use(limiter);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use(errorHandler);

// Socket.io event handlers
io.on('connection', (socket) => {
  // Handle events when a new client connects
  console.log('New client connected');

  // // Handle events when a client joins a room
  // socket.on('joinRoom', (room) => {
  //   socket.join(room);
  //   console.log(`Client joined room: ${room}`);
  // });

  // // Handle events when a client leaves a room
  // socket.on('leaveRoom', (room) => {
  //   socket.leave(room);
  //   console.log(`Client left room: ${room}`);
  // });

  // // Handle events when a client sends a message to a specific room
  // socket.on('sendMessage', (data) => {
  //   const { room, message } = data;
  //   console.log(`Received message in room ${room}: ${message}`);
  //   // Broadcast the message to all clients in the room
  //   io.to(room).emit('message', message);
  // });

  // // Handle events when a client disconnects
  // socket.on('disconnect', () => {
  //   console.log('Client disconnected');
  // });
});

module.exports = { io };

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});