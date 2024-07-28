const express = require("express");
const asyncHandler = require("express-async-handler");
const pollCtrl = require("../controllers/poll.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../config/constant.js");
const { createResponse, createError } = require("../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/v1/polls
 * @description Add Polls Question 
 * @returns JSON
 * @access public
 */
router.post("/", asyncHandler(addPoll));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/:pollId", asyncHandler(getPoll));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.post("/submit/:pollId", asyncHandler(submitPoll));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/result/:pollId", asyncHandler(pollResult));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/check-password/:pollId", asyncHandler(checkPasswordProtection));

/**
 * @description add poll
 */
async function addPoll(req, res, next) {
  try {
    let response = await pollCtrl.addPoll(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description get poll
 */
async function getPoll(req, res, next) {
  try {
    // Set cache-control headers
    res.setHeader('Cache-Control', 'no-store');
    let response = await pollCtrl.getPoll(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description submit poll
 */
async function submitPoll(req, res, next) {
  try {
    let response = await pollCtrl.submitPoll(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS, resMsg.SUCCESS, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description submit poll
 */
async function pollResult(req, res, next) {
  try {
    let response = await pollCtrl.pollResult(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS, resMsg.SUCCESS, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description check password protection
 */
async function checkPasswordProtection(req, res, next) {
  try {
    console.log("checkk")
    let response = await pollCtrl.checkPasswordProtection(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS, resMsg.SUCCESS, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}