const express = require("express");
const pollRoutes = require("./poll.route.js");
const commentRoutes = require("./app/comment.route.js");
const creatorRoutes = require("./app/creator/index.route.js");
const usersRoutes = require("./app/user/index.route.js");
const pushNotificationRoutes = require("./push_notification.route.js");
const adminRoutes = require("./admin/index.route.js");
const analyticsRoutes = require("./analytics/index.route.js");
const unsubscribeRoutes = require("./app/unsubscribe.route.js");
const faqRoutes = require("./app/faq.route.js");
const requireAccessToken = require("../middleware/require-access-token.js");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => {

   res.send("OK");
});

router.get('/contributors', (req, res) => {
   const contributors = require("../../utils/others/contributors.js");

   return res.status(200).json({
      status: 200,
      message: "Successfully retrieved",
      data: contributors,
    });
})

/** /polls - for polls related routes */
// router.use("/polls", requireAccessToken, pollRoutes);
router.use("/polls", pollRoutes);

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

router.use("/unsubscribe", unsubscribeRoutes);

router.use('/faqs', faqRoutes)

module.exports = router;
