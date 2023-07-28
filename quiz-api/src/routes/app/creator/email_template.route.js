const express = require("express");
const asyncHandler = require("express-async-handler");
const emailTemplateCtrl = require("../../../controllers/creators/email_template.controller.js");
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
router.post("/", asyncHandler(addEmailTemplate));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/", asyncHandler(getAllEmailTemplates));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.get("/:id", asyncHandler(getTemplateById));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.put("/:id", asyncHandler(updateTemplateById));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.put("/status/:id", asyncHandler(updateTemplateStatusById));

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.delete("/:id", asyncHandler(deleteTemplateById));

/**
 * @description add poll
 */
async function addEmailTemplate(req, res, next) {
  try {
    let response = await emailTemplateCtrl.addEmailTemplate(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.CREATED,
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
 * @description get all email templates
 */
async function getAllEmailTemplates(req, res, next) {
  try {
    let response = await emailTemplateCtrl.getAllEmailTemplates(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.SUCCESS_FETCH,
        resMsg.SUCCESS_FETCH,
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
 * @description get template by id
 */
async function getTemplateById(req, res, next) {
  try {
    let response = await emailTemplateCtrl.getTemplateById(req);
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
 * @description update template by id
 */
async function updateTemplateById(req, res, next) {
  try {
    let response = await emailTemplateCtrl.updateTemplateById(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.UPDATED,
        resMsg.UPDATED,
        response
      );
    else
      return createError(res, resStatusCode.UNABLE_UPDATE, {
        message: resMsg.UNABLE_UPDATE,
      });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}

/**
 * @description delete a template by id
 */
async function deleteTemplateById(req, res, next) {
  try {
    let response = await emailTemplateCtrl.deleteTemplateById(req);
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

/**
 * @description update template status by id
 */
async function updateTemplateStatusById(req, res, next) {
  try {
    let response = await emailTemplateCtrl.updateTemplateStatusById(req);
    if (response)
      return createResponse(
        res,
        resStatusCode.UPDATED,
        resMsg.UPDATED,
        response
      );
    else
      return createError(res, resStatusCode.UNABLE_UPDATE, {
        message: resMsg.UNABLE_UPDATE,
      });
  } catch (e) {
    return createError(res, resStatusCode.BAD_REQUEST, e);
  }
}