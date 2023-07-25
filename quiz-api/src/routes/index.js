const express = require("express");
const pollRoutes = require("./poll.route.js");
const commentRoutes = require("./app/comment.route.js");
const creatorRoutes = require("./app/creator/index.route.js");
const pushNotificationRoutes = require("./push_notification.route.js");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

/** /polls - for polls related routes */
router.use("/polls", pollRoutes);

/** /comments - for comments related routes */
router.use("/comments", commentRoutes);

/** /push-notifications - for push notifications related routes */
router.use("/push-notifications", pushNotificationRoutes)

router.use(
  "/creators",
  creatorRoutes
);

module.exports = router;
