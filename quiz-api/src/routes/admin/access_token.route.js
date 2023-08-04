const express = require("express");
const asyncHandler = require("express-async-handler");
const accessTokenCtrl = require("../../controllers/admin/access_token.controller.js");
const router = express.Router();
const { createResponse, createError } = require("../../../utils/helpers.js");
const { resMsg, resStatusCode } = require("../../../config/constant.js");
module.exports = router;

/**
 * @route POST /api/v1/admin/access-tokens/
 * @description add access token
 * @returns JSON
 * @access private
 */
router.post("/", asyncHandler(addAccessToken));

/**
 * @route GET /api/v1/admin/access-tokens/
 * @description get access tokens
 * @returns JSON
 * @access private
 */
router.get("/", asyncHandler(getAccessTokens));

/**
 * @route GET /api/v1/admin/access-tokens/
 * @description get access tokens
 * @returns JSON
 * @access private
 */
router.get("/:id", asyncHandler(getAccessTokenById));

/**
 * @route GET /api/v1/admin/access-tokens/
 * @description get access tokens
 * @returns JSON
 * @access private
 */
router.delete("/:id", asyncHandler(deleteAccessTokenById));

/**
 * @description fetch polls overview
 */
async function addAccessToken(req, res, next) {
  try {
    let response = await accessTokenCtrl.addAccessToken(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.CONTACT_MSG,
        resMsg.CREATED,
        response
      );
    else
      return createError(res, resStatusCode.UNABLE_CREATE, {
        message: resMsg.UNABLE_CREATE,
      });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description get access tokens
 */
async function getAccessTokens(req, res, next) {
  try {
    let response = await accessTokenCtrl.getAccessTokens(req);
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
 * @description get access token by id
 */
async function getAccessTokenById(req, res, next) {
  try {
    let response = await accessTokenCtrl.getAccessTokenById(req);
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
 * @description delete access token
 */
async function deleteAccessTokenById(req, res, next) {
  try {
    let response = await accessTokenCtrl.deleteAccessToken(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.DELETED,
        resMsg.DELETED,
        response
      );
    else
      return createError(res, resStatusCode.UNABLE_DELETE, {
        message: resMsg.UNABLE_DELETE,
      });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}
