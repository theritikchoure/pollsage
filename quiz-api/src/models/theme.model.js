const mongoose = require("mongoose");

const themeSchema = new mongoose.Schema(
  {
    theme_name: {
      type: String,
      required: true,
      unique: true,
    },
    is_dark_theme: {
      type: Boolean,
      required: true,
    },
    colors: {
      pollContainerBackgroundColor: String,
      pollBoxBackgroundColor: String,
      pollQuestionColor: String,
      formLabelColor: String,
      pollOptionsLabelColor: String,
      voteButtonBackgroundColor: String,
      inputFieldPlaceholderColor: String,
      inputFieldColor: String,
      commentNameColor: String,
      commentTextColor: String,
    },
    tag: {
        type: String,
        required: false,
        default: 'default',
        enum: ['default', 'saved'],
    },
    is_active: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("Theme", themeSchema);
