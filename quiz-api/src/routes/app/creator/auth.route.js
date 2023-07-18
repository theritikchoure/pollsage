const express = require("express");
const asyncHandler = require("express-async-handler");
const authCtrl = require("../../../controllers/auth.controller.js");
const router = express.Router();
const { resMsg, resStatusCode } = require("../../../../config/constant.js");
const { createResponse, createError } = require("../../../../utils/helpers.js");
module.exports = router;

/**
 * @route GET api/v1/auth/register
 * @description register
 * @returns JSON
 * @access public
 */
router.post("/register", asyncHandler(register));

/**
 * @route GET api/v1/auth/verify/:token
 * @description register
 * @returns JSON
 * @access public
 */
router.post("/verify/:token", asyncHandler(verifyToken));

/**
 * @route GET api/v1/auth/login
 * @description register
 * @returns JSON
 * @access public
 */
router.post("/login", asyncHandler(login));

/**
 * @route GET api/v1/auth/login
 * @description register
 * @returns JSON
 * @access public
 */
router.post("/forget-password", asyncHandler(forgetPassword));

/**
 * @route GET api/v1/auth/login
 * @description register
 * @returns JSON
 * @access public
 */
router.post("/reset-password", asyncHandler(resetPassword));

/**
 * @description register poll creators
 */
async function register(req, res, next) {
  try {
    let response = await authCtrl.register(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description verify token
 */
async function verifyToken(req, res, next) {
  try {
    let response = await authCtrl.verifyToken(req);
    if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
    else
      return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description verify token
 */
async function login(req, res, next) {
  try {
    let response = await authCtrl.login(req);
    if (response) return createResponse(res, resStatusCode.LOGIN, resMsg.LOGIN, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description forget password
 */
async function forgetPassword(req, res, next) {
  try {
    let response = await authCtrl.forgetPassword(req);
    if (response) return createResponse(res, resStatusCode.SUCCESS, resMsg.SUCCESS, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description reset password
 */
async function resetPassword(req, res, next) {
  try {
    let response = await authCtrl.resetPassword(req);
    if (response) return createResponse(res, resStatusCode.PASSWORD_RESET, resMsg.PASSWORD_RESET, response);
    else
      return createError(res, resStatusCode.BAD_REQUEST, { message: resMsg.BAD_REQUEST });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}