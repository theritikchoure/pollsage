const express = require("express");
const asyncHandler = require("express-async-handler");
const faqCtrl = require("../../controllers/app/faq.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../../config/constant.js");
const { createResponse, createError } = require("../../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/app/unsubscribe
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/:tag", asyncHandler(getFAQByTag));

/**
 * @description add poll
 */
async function getFAQByTag(req, res, next) {
  try {
    let response = await faqCtrl.getFAQByTag(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}