const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    user_id: {
        type: String,
        required: true,
    },
    user_type: {
        type: String,
        required: true,
        enum: ["user", "creator", "admin"],
    },
    feedback_type: {
        type: String,
        required: true,
        enum: ["bug", "feature", "general"],
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["open", "closed", "progress", "resolved"],
    },
    admin_notes: {
        type: String,
        required: false,
        default: null,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    geo_location: {
      type: Object,
      default: {},
    },
    sentiment: {
      type: Object,
      default: {},
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", customSchema);
