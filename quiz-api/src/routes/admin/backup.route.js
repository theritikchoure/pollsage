const express = require("express");
const asyncHandler = require("express-async-handler");
const backupCtrl = require("../../controllers/admin/data-backup.controller.js");
const router = express.Router();
module.exports = router;

/**
 * @route GET api/app/about-us
 * @description get all about us keys
 * @returns JSON
 * @access public
 */
router.post("/", asyncHandler(backupCtrl.backupDatabase));