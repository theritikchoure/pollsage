const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../utils/helpers");
const Subscription = require("../models/push_notification.model");
const webpush = require("web-push");
const logger = require("../../config/logger");
const { getDatabaseConnection } = require("../../config/db");

// Module Exports
module.exports = {
  savePushNotificationSubscription,
  sendPushNotification,
};

/**
 * Saves a push notification subscription.
 * @param {Object} req - The request object.
 * @param {Object} req.body - The subscription object to save.
 * @returns {Promise<Object>} - The saved subscription object.
 */
async function savePushNotificationSubscription(req) {
  try {
    // Ensure the database connection is properly set up
    await getDatabaseConnection();

    const { body } = req;
    if (!body || !body.endpoint || !body.keys || !body.keys.p256dh || !body.keys.auth) {
      throw new Error("Invalid subscription data");
    }

    // check duplicate subscription
    const sub = await Subscription.findOne({ endpoint: body.endpoint });
    if (sub) {
      throw new Error("Subscription already exists");
    }

    // Optimize the save operation
    const subscription = new Subscription(req.body);
    await subscription.validate();
    return await subscription.save();
  } catch (e) {
    console.error(e);
    throw handleControllerError(e);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed", mongoose.connection.readyState)
  }
}

/**
 * @description add poll
 */
async function sendPushNotification(req) {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      throw new Error("Invalid push notification data");
    }

    // Ensure the database connection is properly set up
    await getDatabaseConnection();

    // Get all subscriptions from the database
    const subscriptions = await Subscription.find();

    // Send push notification to each subscriber
    return Promise.all(subscriptions.map(async (subscription) => {
      const payload = JSON.stringify({
        title,
        body,
      });
    
      try {
        await webpush.sendNotification(subscription, payload);
      } catch (error) {
        logger.error("Error sending push notification:", error);
        console.error("Error sending push notification:", error);
      }
    }));
  } catch (e) {
    throw handleControllerError(e);
  } finally {
    // // Close the database connection
    await mongoose.connection.close();
  }
}
