const express = require("express");
const asyncHandler = require("express-async-handler");
const logsCtrl = require("../../controllers/admin/logs.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../../config/constant.js");
const { createResponse, createError } = require("../../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/", asyncHandler(fetchLogs));


/**
 * @description get poll
 */
async function fetchLogs(req, res, next) {
  try {
    let response = await logsCtrl.fetchLogs(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}
