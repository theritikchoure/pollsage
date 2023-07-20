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
    like_count: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("comments", customSchema);
