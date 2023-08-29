const express = require('express');
const dashboardRoutes = require('./dashboard.route.js');
const pollRoutes = require('./poll.route.js');
const authRoutes = require('./auth.route.js');
const commentRoutes = require('./comment.route.js');
const themeRoutes = require('./theme.route.js');
const emailTemplateRoutes = require('./email_template.route.js');
const reportRoutes = require('./report.route.js');
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

/** /polls - for polls related routes */
router.use('/polls', passport.authenticate("jwt", { session: false }),   pollRoutes);

//  /comments - for comments related routes
router.use('/comments', passport.authenticate("jwt", { session: false }),   commentRoutes);

// /themes - for themes related routes
router.use('/themes', passport.authenticate("jwt", { session: false }), themeRoutes);

// /email-templates - for email templates related routes
router.use('/email-templates', passport.authenticate("jwt", { session: false }), emailTemplateRoutes);

// /reports - for reports related routes
router.use('/reports', passport.authenticate("jwt", { session: false }), reportRoutes);

module.exports = router;