const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
      index: true,
    },
    pollId: {
      type: String,
      required: true,
      unique: true,
    },
    allow_multiple_selection: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
      default: null,
    },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    publish_status: {
      type: String,
      default: "published",
      enum: ["published", "draft", "archived"],
      index: true,
    },
    start_date: {
      type: String,
      required: false,
      default: null,
    },
    end_date: {
      type: String,
      required: false,
      default: null,
    },
    result_visibility: {
      type: String,
      default: "public",
      enum: ["public", "private"],
    },
    share_btn: {
      type: Boolean,
      default: true,
    },
    require_name: {
      type: Boolean,
      default: false,
    },
    allow_comments: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      required: false,
      default: null,
    },
    send_mail: {
      type: Boolean,
      default: false,
    },
    mail_template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MailTemplate",
      required: false,
    },
    logo: {
      type: String,
      required: false,
      default: null,
    },
    selected_theme: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Theme",
      required: false,
      default: null
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

pollSchema.index({ pollId: 1 }); // Index for faster lookup using pollId
pollSchema.index({ "options.text": "text" }); // Index for text search on option text

module.exports = mongoose.model("Poll", pollSchema);
