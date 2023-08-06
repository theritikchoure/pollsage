const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true, // Add an index to the 'email' field for faster retrieval
    },
    reason: {
      type: String,
      required: true,
    },
    unsubscribed_at: {
      type: Date,
      default: Date.now,
      index: true, // Add an index to the 'unsubscribed_at' field for faster retrieval
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Unsubscribe", customSchema);
