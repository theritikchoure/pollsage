const express = require("express");
const asyncHandler = require("express-async-handler");
const backupCtrl = require("../../controllers/admin/data-backup.controller.js");
const router = express.Router();
const upload = require("../../../config/multer.js");
const { resStatusCode, resMsg } = require("../../../config/constant.js");
const { createError, createResponse } = require("../../../utils/helpers.js");

module.exports = router;

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.post("/", asyncHandler(backupCtrl.backupDatabase));

router.post('/restore', upload.single('file'),  asyncHandler(backupCtrl.restoreDatabase));

router.get("/collections", asyncHandler(getCollections));

/**
 * @description get all collections
 */
async function getCollections(req, res, next) {
    try {
      let response = await backupCtrl.getCollections(req);
      if (response) return createResponse(res, resStatusCode.SUCCESS_FETCH, resMsg.SUCCESS_FETCH, response);
      else
        return createError(res, resStatusCode.UNABLE_FETCH, { message: resMsg.UNABLE_FETCH });
    } catch (e) {
      return createError(res, resStatusCode.BAD_REQUEST, e);
    }
  }
  