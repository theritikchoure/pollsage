const express = require("express");
const asyncHandler = require("express-async-handler");
const dashboardCtrl = require("../../../controllers/creators/dashboard.controller.js");
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
router.get("/polls-overview", asyncHandler(fetchPollsOverview));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/polls-performance", asyncHandler(fetchPollsPerformance));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/recent-activity", asyncHandler(fetchRecentActivity));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/all-activity", asyncHandler(fetchAllActivity));

/**
 * @description fetch polls overview
 */
async function fetchPollsOverview(req, res, next) {
  try {
    let response = await dashboardCtrl.fetchPollsOverview(req);
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

/**
 * @description fetch polls performance
 */
async function fetchPollsPerformance(req, res, next) {
  try {
    let response = await dashboardCtrl.fetchPollsPerformance(req);
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

/**
 * @description fetch recent activity
 */
async function fetchRecentActivity(req, res, next) {
  try {
    let response = await dashboardCtrl.fetchRecentActivity(req);
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

/**
 * @description fetch all activity
 */
async function fetchAllActivity(req, res, next) {
    try {
        let response = await dashboardCtrl.fetchAllActivity(req);
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