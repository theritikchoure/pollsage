const mongoose = require('mongoose');
const env = require('./env');

const dbURL = env.MONGO_URL;

// Connect to the database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
