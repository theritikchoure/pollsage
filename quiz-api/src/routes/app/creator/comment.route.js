const express = require("express");
const asyncHandler = require("express-async-handler");
const commentCtrl = require("../../../controllers/creators/comment.controller.js");
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
router.get("/:pollId", asyncHandler(getAllComments));

/**
 * @description add poll
 */
async function getAllComments(req, res, next) {
  try {
    let response = await commentCtrl.getAllComments(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
    else
      return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}