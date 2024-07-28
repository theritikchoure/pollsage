const express = require("express");
const morgan = require("morgan");
require("./config/mongoose.js");
require("./config/db/analytics_db.js");
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
const setSecurityHeaders = require("./src/middleware/security-headers.js");
const requestLog = require("./src/middleware/request-log.js");

// Create the Express app
const app = express();

app.use(requestLog);

// Middleware for logging
app.use((req, res, next) => {
  logger.info(`${req.ip} - ${req.method} ${req.originalUrl} - Query: ${JSON.stringify(req.query)}`);
  next();
});

// CORS middleware
app.use(cors());

// Security headers middleware
app.use(setSecurityHeaders);

// Session middleware
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);


// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());
app.use(hpp());

// app.use(limiter);

// Middleware
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use(errorHandler);

webpush.setVapidDetails(`mailto:${env.VAPID_MAIL_ID}`, env.VAPID_PUBLIC_KEY, env.VAPID_PRIVATE_KEY);

module.exports = app;
