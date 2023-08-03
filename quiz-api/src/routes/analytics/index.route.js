const express = require('express');
const trackingRoutes = require('./tracking.route.js');
const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);  


// /dashboard - for dashboard related routes
router.use('/track', trackingRoutes);

module.exports = router;