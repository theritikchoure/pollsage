const winston = require("winston");

// Configure Winston logger
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({ level: "error", handleExceptions: true}),
    new winston.transports.File({ filename: "error.log", level: "error", handleExceptions: true, maxsize: 1000000, maxFiles: 5 }),
    new winston.transports.File({ filename: "combined.log", handleExceptions: true , maxsize: 1000000, maxFiles: 5 }),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
});

module.exports = logger;
