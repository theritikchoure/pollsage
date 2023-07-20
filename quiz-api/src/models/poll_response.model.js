const mongoose = require("mongoose");

const pollResponseSchema = new mongoose.Schema(
  {
    poll: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Poll",
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    optionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: false,
      default: 'Guest',
    },
    country: {
      type: String,
      required: true,
    },
    geo_location: {
      type: Object,
      required: false,
      default: null
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("PollResponse", pollResponseSchema);
