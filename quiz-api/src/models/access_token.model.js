const mongoose = require("mongoose");

const customSchema = new mongoose.Schema(
  {
    purpose : {
        type: String,
        required: true,
        trim: true,
    },
    team: {
        type: String,
        required: true,
    },
    expiration_time: {
        type: String,
        required: true,
    },
    issuer: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: "Admin",
    },
    routes: [
        {
            type: String,
            required: true,
        }
    ],
    methods: [
        {
            type: String,
            required: true,
        }
    ],
    is_active: {
        type: Boolean,
        required: true,
        default: false,
    },
    token: {
        type: String,
        required: false,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AccessTokens", customSchema);
