const logger = require("../../config/logger");


const errorHandler = (err, req, res, next) => {

  logger.error('Error:', err);

  if(err.message === 'Not allowed by CORS') {
    return res.status(401).send('Unauthorized');
  }

  res.status(500).json({ message: "Internal Server Error" });
};

module.exports = errorHandler;
