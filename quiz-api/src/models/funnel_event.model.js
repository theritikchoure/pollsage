const mongoose = require("mongoose");

const funnelEventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  pollId: { type: mongoose.Schema.Types.ObjectId, required: true },
  eventType: { type: String, required: true }, // 'view' or 'response'
  timestamp: { type: Date, default: Date.now },
  location: { type: String }, // User's geographic location (e.g., country, city)
  deviceType: { type: String }, // User's device type (e.g., desktop, mobile, tablet)
  browser: { type: String }, // User's browser information
  referrer: { type: String }, // Referrer URL, if applicable (e.g., how the user landed on the poll)
  ipAddress: { type: String }, // User's IP address
  conversionTime: { type: Number }, // Time taken by the user to convert (submit a response) after viewing the poll, in milliseconds
  customData: { type: mongoose.Schema.Types.Mixed }, // Additional custom data you want to store for analysis (e.g., user demographics, behavior)
});

module.exports = mongoose.model("FunnelEvent", funnelEventSchema);
