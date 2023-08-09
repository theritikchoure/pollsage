const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [{
        type: String,
        required: true,
        trim: true,
    }],
    is_active: {
        type: Boolean,
        required: false,
        default: true,
    },
    faqs: [{
        question: {
            type: String,
            required: true,
            trim: true,
        },
        answer: {
            type: String,
            required: true,
            trim: true,
        },
        is_active: {
            type: Boolean,
            required: false,
            default: true,
        },
    }]
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("faq", customSchema);
