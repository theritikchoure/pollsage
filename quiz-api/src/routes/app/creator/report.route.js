const express = require("express");
const asyncHandler = require("express-async-handler");
const reportCtrl = require("../../../controllers/creators/report.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../../../config/constant.js");
const { createResponse, createError } = require("../../../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/poll/json/:pollId", asyncHandler(generatePollReport));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/poll/download/:pollId", asyncHandler(reportCtrl.downloadPollReport));

/**
 * @description generate poll report
 */
async function generatePollReport(req, res, next) {
  try {
    let response = await reportCtrl.generatePollReport(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.SUCCESS_FETCH,
        resMsg.SUCCESS_FETCH,
        response
      );
    else
      return createError(res, resStatusCode.UNABLE_FETCH, {
        message: resMsg.UNABLE_FETCH,
      });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}
