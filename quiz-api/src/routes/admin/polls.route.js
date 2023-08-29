const express = require("express");
const asyncHandler = require("express-async-handler");
const pollCtrl = require("../../controllers/admin/poll.controller.js");
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
router.post("/", asyncHandler(addPoll));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/", asyncHandler(getAllPolls));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/:pollId", asyncHandler(getPollById));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.put("/:pollId", asyncHandler(updatePollById));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.delete("/:pollId", asyncHandler(deletePoll));

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
async function getAllPolls(req, res, next) {
  try {
    let response = await pollCtrl.getAllPolls(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description get poll by id
 */
async function getPollById(req, res, next) {
  try {
    let response = await pollCtrl.getPollById(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description update poll by id
 */
async function updatePollById(req, res, next) {
  try {
    let response = await pollCtrl.updatePollById(req);
    if (response) return createResponse(res, resStatusCode.UPDATED, resMsg.UPDATED, response);
    else
      return createError(res, resStatusCode.UNABLE_UPDATE, { message: resMsg.UNABLE_UPDATE });
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

async function deletePoll(req, res, next) {
  try {
    let response = await pollCtrl.deletePoll(req);
    if (response) return createResponse(res, resStatusCode.DELETED, resMsg.DELETED, response);
    else
      return createError(res, resStatusCode.UNABLE_DELETE, { message: resMsg.UNABLE_DELETE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}