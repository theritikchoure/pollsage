const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    url: {
        type: String,
        required: true,
      },
      method: {
        type: String,
        required: true,
      },
      response_time: {
        type: Number,
        required: true,
      },
      request_time: {
        type: Date,
        default: Date.now(),
        required: false,
      },
      status_code: {
        type: Number,
        required: true,
      },
      user_info: {
        type: mongoose.Schema.Types.ObjectId,
        default: null, // Allow user_info to be null if the request is not authenticated
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("requestlog", customSchema);
