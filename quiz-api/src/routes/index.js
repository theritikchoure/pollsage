const express = require("express");
const pollRoutes = require("./poll.route.js");
const commentRoutes = require("./app/comment.route.js");
const creatorRoutes = require("./app/creator/index.route.js");
const usersRoutes = require("./app/user/index.route.js");
const pushNotificationRoutes = require("./push_notification.route.js");
const adminRoutes = require("./admin/index.route.js");
const analyticsRoutes = require("./analytics/index.route.js");
const env = require("../../config/env.js");
const jwt = require("jsonwebtoken");
const requireAccessToken = require("../middleware/require-access-token.js");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

/** /polls - for polls related routes */
router.use("/polls", requireAccessToken, pollRoutes);

/** /comments - for comments related routes */
router.use("/comments", commentRoutes);

/** /push-notifications - for push notifications related routes */
router.use("/push-notifications", pushNotificationRoutes);

/** /users - for users related routes */
router.use("/users", usersRoutes);

/** /creators - for creators related routes */
router.use("/creators", creatorRoutes);

/** /admin - for admin related routes */
router.use("/admin", adminRoutes);

router.use("/analytics", analyticsRoutes);

module.exports = router;
