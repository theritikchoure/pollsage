const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, index: true },
    options: [
      {
        text: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    allowMultipleSelection: { type: Boolean, default: false },
    // creator: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "PollCreator",
    //   required: true,
    //   index: true,
    // },
    pollId: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

pollSchema.index({ 'options.text': 'text' }); // Index for text search on option text

module.exports = mongoose.model("Poll", pollSchema);
