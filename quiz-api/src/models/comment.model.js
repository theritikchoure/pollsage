const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    display_name: {
      type: String,
      required: true,
    },
    pollId: {
      type: String,
      required: true,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: [
      {
        type: String,
        required: false,
      },
    ],
    ip: {
      type: String,
      // required: true,
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

module.exports = mongoose.model("Comment", customSchema);
