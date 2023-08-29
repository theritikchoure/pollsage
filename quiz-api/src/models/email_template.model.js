const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    html_content: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true,
    },
    css_content: {
        type: String,
        required: false,
        default: null,
    },
    is_approved: {
        type: Boolean,
        required: false,
        default: false,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Emailtemplate", customSchema);
