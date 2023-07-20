const httpError = require('http-errors');
const env = require('../../config/env');
const jwt = require('jsonwebtoken');

const requireAuth = function (req, res, next) {
  // Get the token from the Authorization header
  const authorizationHeader = req.headers.authorization;

  // Check if the header is present
  if (!authorizationHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Split the header value to extract the token
  const [bearer, token] = authorizationHeader.split(' ');

  // Check if the Bearer scheme is used and the token is present
  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization header' });
  }

  const tok = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YjZiY2FmOTRlY2U2ZTJkZDRiZGM2ZSIsIm5hbWUiOiJyaXRpayIsInJvbGUiOiJjcmVhdG9yIiwiaWF0IjoxNjg5Njk4NTU5fQ.csoBVbMU2bq96-5VRmboHq1qJfuDmHDCMM3IbGD22f8"
   try {
    // Verify the token
    const decoded = jwt.verify(token, env.JWT_SECRET);

    console.log(decoded)

    // Attach the decoded payload to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.log(error)
    // Token verification failed
    return res.status(401).json({ message: 'Invalid token' });
  }
}


module.exports = requireAuth;