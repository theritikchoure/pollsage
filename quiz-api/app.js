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
const cors = require("cors");
const passport = require('./config/passport.js');
const webpush = require('web-push');
const requireAccessToken = require("./src/middleware/require-access-token.js");

// Create the Express app
const app = express();

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
  origin: (origin, callback) => {
    // Check if the request origin is in the allowedOrigins array
    if (env.CORS_ORIGIN.indexOf(origin) !== -1) {
      callback(null, true); // Allow the request
    } else {
      callback(new Error('Not allowed by CORS')); // Deny the request
    }
  },
};

app.use(cors(corsOptions));
// app.use(cors());

// Middleware for logging
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.use(helmet());
app.use(hpp());

// app.use(limiter);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

console.log(env.NODE_ENV)

env.NODE_ENV !== "local" && app.use(requireAccessToken);

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use(errorHandler);

webpush.setVapidDetails(`mailto:${env.VAPID_MAIL_ID}`, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);

module.exports = app;
