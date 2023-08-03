const express = require("express");
const asyncHandler = require("express-async-handler");
const trackingCtrl = require("../../controllers/analytics/tracking.controller.js");
const router = express.Router();
const { createResponse, createError } = require("../../../utils/helpers.js");
const { resMsg, resStatusCode } = require("../../../config/constant.js");
module.exports = router;

/**
 * @route GET api/v1/admin/auth/login
 * @description admin login
 * @returns JSON
 * @access public
 */
router.post("/pageviews", asyncHandler(addPageViews));



/**
 * @description add page views
 */
async function addPageViews(req, res, next) {
  try {
    let response = await trackingCtrl.addPageViews(req);
    if (response) return createResponse(res, resStatusCode.LOGIN, resMsg.LOGIN, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}