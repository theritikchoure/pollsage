const express = require("express");
const asyncHandler = require("express-async-handler");
const themeCtrl = require("../../../controllers/creators/theme.controller.js");
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
router.post("/", asyncHandler(addTheme));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/for-form", asyncHandler(getAllThemes));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/", asyncHandler(getAllThemesByUser));

/**
 * @description add poll
 */
async function addTheme(req, res, next) {
    try {
      let response = await themeCtrl.addTheme(req);
      if (response) return createResponse(res, resStatusCode.CREATED, resMsg.CREATED, response);
      else
        return createError(res, resStatusCode.UNABLE_CREATE, { message: resMsg.UNABLE_CREATE });
    } catch (e) {
      return createError(res, resStatusCode.BAD_REQUEST, e);
    }
  }

/**
 * @description get all the themes
 */
async function getAllThemes(req, res, next) {
    try {
      let response = await themeCtrl.getAllThemes(req);
      if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
      else
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
    } catch (e) {
      return createError(res, resStatusCode.BAD_REQUEST, e);
    }
  }

  /**
 * @description get all the themes
 */
async function getAllThemesByUser(req, res, next) {
    try {
      let response = await themeCtrl.getAllThemesByUser(req);
      if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
      else
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
    } catch (e) {
      return createError(res, resStatusCode.BAD_REQUEST, e);
    }
  }