const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    session_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    referrer: {
      type: String,
      default: null,
    },
    source: {
      type: String,
      default: "direct",
    },

    geo_location: {
      type: Object,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PageViews", customSchema);
