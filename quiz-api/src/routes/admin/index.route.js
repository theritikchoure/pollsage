const express = require('express');
const authRoutes = require('./auth.route.js');
const dashboardRoutes = require('./dashboard.route.js');
const passport = require("passport");
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);  

/** GET /auth - auth service */
router.use('/auth', authRoutes);

// /dashboard - for dashboard related routes
router.use('/dashboard', passport.authenticate("jwt", { session: false }),   dashboardRoutes);

router.use('/analytics', passport.authenticate("jwt", { session: false }),   require('./analytics.route.js'));

router.use('/access-tokens', passport.authenticate("jwt", { session: false }),   require('./access_token.route.js'));

router.use('/polls', passport.authenticate("jwt", { session: false }),   require('./polls.route.js'));

router.use('/logs', passport.authenticate("jwt", { session: false }),   require('./logs.route.js'));

router.use('/faqs', passport.authenticate("jwt", { session: false }),   require('./faqs.route.js'));

module.exports = router;