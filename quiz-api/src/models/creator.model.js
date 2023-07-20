const mongoose = require("mongoose");

const customSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdPolls: [{ type: mongoose.Schema.Types.ObjectId, ref: "Poll" }],
  totalPollsCreated: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
  verificationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordTokenExpiration: { type: Date },
}, {
    versionKey: false,
    timestamps: true,
});

module.exports = mongoose.model("creator", customSchema);
