const mongoose = require('mongoose');
const env = require('../env');

const analyticsDBURL = env.ANALYTICS_MONGO_URL; // Replace with the URL of your analytics database

const analyticsDBOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Add any other options specific to the analytics database connection
};

const analyticsDBConnection = mongoose.createConnection(analyticsDBURL, analyticsDBOptions);

// Listen for connection events
analyticsDBConnection.on('connected', () => {
  console.log('Connected to the analytics database');
});

analyticsDBConnection.on('error', (error) => {
  console.error('Error connecting to the analytics database:', error);
});

module.exports = analyticsDBConnection;
