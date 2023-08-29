const mongoose = require('mongoose');

// Function to establish the MongoDB connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Export a function to get the established connection
async function getDatabaseConnection() {
    try {
        if (mongoose.connection.readyState !== 1) {
            await connectToDatabase();
            return mongoose.connection;
          }
        
          return mongoose.connection;
    } catch (error) {
      console.log('Error getting database connection:', error)
        throw error;   
    }
}

module.exports = {
  connectToDatabase,
  getDatabaseConnection,
};
