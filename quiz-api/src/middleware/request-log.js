const RequestLog = require('../models/analytics/request_log.model');

const requestLog = async (req, res, next) => {
    const requestTime = Date.now();

  // Skip logging for OPTIONS requests
  if (req.method === 'OPTIONS') {
    // Continue to the next middleware without logging
    return next();
  }

  // Set up an event handler for when the response is finished
  res.on('finish', async () => {
    let user_info = null;
    if (req.user) {
      // Include user information when the request is authenticated
      user_info = req.user._id; // Assuming you store user information in req.user after authentication
    }

    const response_time = (Date.now() - requestTime) / 1000; // convert to seconds
    const status_code = res.statusCode;

    try {
      // Create the RequestLog document
      await RequestLog.create({
        url: req.baseUrl+req.path,
        method: req.method,
        response_time,
        status_code,
        user_info,
      });

      console.log('RequestLog created successfully')
    } catch (error) {
      console.error('Error creating RequestLog:', error);
    }
  });

  next();
}

module.exports = requestLog;