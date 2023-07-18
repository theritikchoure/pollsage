const express = require('express');
const pollRoutes = require('./poll.route.js');
const authRoutes = require('./app/auth.route.js');
// const appRoutes = require('./app/index.route');
// const passport = require("passport");
// const requireAdmin = require('../middleware/require-admin');
// const adminAuthRoutes = require('./admin/auth.route');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);  

/** GET /auth - auth service */
router.use('/auth', authRoutes);

/** /polls - for polls related routes */
router.use('/polls', pollRoutes);

module.exports = router;