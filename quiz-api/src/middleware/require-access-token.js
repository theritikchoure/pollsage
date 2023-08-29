const jwt = require("jsonwebtoken");
const env = require("../../config/env");
const { encrypt, decrypt } = require("../../utils/crypto");
const AccessTokens = require("../models/access_token.model");
const logger = require("../../config/logger");

const requireAccessToken = async (req, res, next) => {
  try {
    // if the request is from the server then check it is allowed or not, if allowed then proceed, otherwise return unauthorized
    if (req.get("origin")) {
      if (req.get("origin") === env.FRONTEND_URL) {
        return next();
      } else {
        return sendError(res, "Unauthorized");
      }
    }

    

    const accessToken = req.headers["x-access-token"];
    if (!req.get("origin") && !accessToken) {
      return sendError(res, "Unauthorized");
    }

    if (!req.get("origin") && accessToken) {
      // decrypt the token
      const decryptedToken = await decrypt(accessToken);

      // verify the token
      const decodedToken = await jwt.verify(decryptedToken, env.JWT_SECRET);

      // find the token in db
      const token = await AccessTokens.findOne({
          _id: decodedToken._id,
          is_active: true,
      });

      if (!token) {
          throw Error("Invalid token");
      }

      // check if the token is valid for the route
      if (!token.routes.includes(req.baseUrl)) {
          throw Error("Token is invalid for this route");
      }

      // check if the token is valid for the method
      if (!token.methods.includes(req.method)) {
          throw Error("Token is invalid for this method");
      }


      // Attach the decoded payload to the request object
      req.requester = token;

      // Proceed to the next middleware or route handler
      return next();
    }

    return sendError(res, error);
  } catch (error) {
    // console.log(error);
    return sendError(res, error);
  }
};

const sendError = (res, error) => {
  logger.error(`Error: ${error.message || error}`);
  return res.status(401).send(error.message || error);
};

module.exports = requireAccessToken;