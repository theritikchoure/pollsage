const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../utils/helpers");
const Subscription = require("../models/push_notification.model");
const webpush = require("web-push");

// Module Exports
module.exports = {
    savePushNotificationSubscription, sendPushNotification
};

/**
 * @description add poll
 */
async function savePushNotificationSubscription(req) {
  try {
    return await new Subscription(req.body).save();
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description add poll
 */
async function sendPushNotification(req) {
  try {
    const { title, body } = req.body;

    // Get all subscriptions from the database
    const subscriptions = await Subscription.find();

    // Send push notification to each subscriber
    subscriptions.forEach((subscription) => {
      const payload = JSON.stringify({
        title,
        body,
      });

      webpush.sendNotification(subscription, payload)
        .catch((error) => console.error('Error sending push notification:', error));
    });

    return Promise.all(subscriptions);
  } catch (e) {
    throw handleControllerError(e);
  }
}