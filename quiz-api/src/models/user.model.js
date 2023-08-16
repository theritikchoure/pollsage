const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
      default: null,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },

    profile_image: {
      type: String,
      required: false,
      default: null,
    },
    
    // password field
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },

    // login fields
    last_login: {
      type: Date,
      required: false,
    },
    
    login_count: {
      type: Number,
      required: false,
      default: 0,
    },

    // verification fields
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
