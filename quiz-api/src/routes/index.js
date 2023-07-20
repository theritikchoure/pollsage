const express = require("express");
const pollRoutes = require("./poll.route.js");
const creatorRoutes = require("./app/creator/index.route.js");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get("/health-check", (req, res) => res.send("OK"));

/** /polls - for polls related routes */
router.use("/polls", pollRoutes);

router.use(
  "/creators",
  creatorRoutes
);

module.exports = router;
