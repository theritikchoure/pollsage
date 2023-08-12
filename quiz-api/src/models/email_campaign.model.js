const mongoose = require('mongoose');

const emailCampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email_template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Emailtemplate',
      required: false,
      default: null,
    },
    recipient_list: {
      type: String, // Storing email addresses as strings for simplicity
      required: true,
    },
    status: {
      type: String, // Possible values: 'draft', 'scheduled', 'sent'
      required: true,
      default: 'draft',
      enum: ['draft', 'scheduled', 'sent'],
    },
    is_active: {
      type: Boolean,
      default: true,
      required: false,
    },
    schedule: {
      type: Date, // Scheduled send date and time
      default: null,
      required: false,
    },
    sentAt: {
      type: Date, // Actual send date and time
    },
    openCount: {
      type: Number,
      default: 0,
    },
    clickCount: {
      type: Number,
      default: 0,
    },
    bounceCount: {
      type: Number,
      default: 0,
    },
    unsubscribeCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create the EmailCampaign model
module.exports = mongoose.model("EmailCampaign", emailCampaignSchema);