const express = require("express");
const asyncHandler = require("express-async-handler");
const pushNotificationCtrl = require("../controllers/push_notification.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../config/constant.js");
const { createResponse, createError } = require("../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.post("/", asyncHandler(savePushNotificationSubscription));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.post("/send", asyncHandler(sendPushNotification));

/**
 * @description add poll
 */
async function savePushNotificationSubscription(req, res, next) {
  try {
    let response = await pushNotificationCtrl.savePushNotificationSubscription(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description add poll
 */
async function sendPushNotification(req, res, next) {
  try {
    let response = await pushNotificationCtrl.sendPushNotification(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}
