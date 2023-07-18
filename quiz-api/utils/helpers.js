const { isString } = require("./validators.js");
const jwtDecode = require("jwt-decode");

/**
 * @param {Number} length length of random string
 */

exports.generateString = (length = 4) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let string = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    string += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return string;
}

exports.generatePermalink = (value = null, length = 5) => {
  let words = (value.toLowerCase()).split(' ');
  let wordsLength = length > words.length ? words.length : length;
  let permalink = '';
  for (let index = 0; index < wordsLength; index++) {
    if (index === wordsLength - 1) permalink = permalink + words[index];
    else permalink = permalink + words[index] + '-';
  }

  return permalink;
}

/**
 * @param {Object} res
 * @param {Number} status statusCode from constant
 * @param {String} msg Response message
 * @param {Object|Array} payload Array or Object
 * @param {Object} other This can be other object that user wants to add
 */
exports.createResponse = (
  res,
  status, // statusCode
  msg, // resMsg
  payload,
  other = undefined,
) => {
  return res.status(status).json({
    status,
    message: msg,
    data: payload,
    ...other,
  });
};

/**
 * @param {Object} res
 * @param {Object} error
 * @param {Object} options
 */
exports.createError = (res, status, error, options = undefined) => {
  if (!options) options = {};
  if (!options.other) options.other = {};

  const message =
    (error && error.message) ||
    (isString(error) && error) ||
    options.message ||
    "Error Occurred";
  const stackTrace = error || message;

  console.error("ERROR:", message, stackTrace);

  res.locals.errorStr = message;

  const other = {
    ...options.other,
    ...(options.returnStackTrace ? { error: error.message } : {}),
  };

  return exports.createResponse(
    res,
    status,
    message,
    other,
  );
};

/**
* @param {Object} error
*/
exports.handleControllerError = (error) => {
  if (error.details && error.details.length > 0) {
    for (const err of error.details) {
      err.message = err.message.replace(/\"/g, "");
      return err;
    }
  } else
    return error;
};

/**
* @param {Object} token
*/
exports.reteriveUserID = (req) => {
  const userToken = req.headers.authorization;
  if (userToken) {
    const token = userToken.split(" ")[1];
    // Decode the token to get the user details
    const user = jwtDecode(token);
    var mongoose = require("mongoose");
    var objectId = mongoose.Types.ObjectId(user.user.id);
    console.log("User id is------------------------------------------>", objectId);
    return objectId;

  } else
    return null;
};

