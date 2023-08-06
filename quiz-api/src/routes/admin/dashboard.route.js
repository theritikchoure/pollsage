const express = require("express");
const asyncHandler = require("express-async-handler");
const dashboardCtrl = require("../../controllers/admin/dashboard.controller.js");
const router = express.Router();
const { createResponse, createError } = require("../../../utils/helpers.js");
const { resMsg, resStatusCode } = require("../../../config/constant.js");
module.exports = router;

/**
 * @route GET /api/v1/admin/dashboard/server-details
 * @description get server details
 * @returns JSON
 * @access private
 */
router.get("/server-details", asyncHandler(getServerDetails));


/**
 * @description fetch polls overview
 */
async function getServerDetails(req, res, next) {
  try {
    let response = await dashboardCtrl.getServerDetails(req);
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