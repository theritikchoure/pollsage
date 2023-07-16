const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resMsg, defaultLen } = require("../../config/constant");
const { handleControllerError } = require("../../utils/helpers");
const PollCreator = require("../models/poll_creator.model");
const uuid = require("uuid");
const sendMail = require("../../config/mail");

// validation schemas
const registrationSchema = Joi.object({
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string().required().label("token"),
  password: Joi.string().min(6).required(),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "{{#label}} does not match" }),
});

// Module Exports
module.exports = {
  register,
  verifyToken,
  login,
  forgetPassword,
  resetPassword,
};

/**
 * @description add poll
 */
async function register(req) {
  try {
    const { error } = registrationSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await PollCreator.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = uuid.v4();

    // Create a new poll creator
    const pollCreator = new PollCreator({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // Save the poll creator
    await pollCreator.save();

    // Send verification email
    const verificationLink = `http://localhost:3000/verify/${verificationToken}`;
    const mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `<p>Click on the following link to verify your email: ${verificationLink}</p>`,
    };

    // await sendMail(mailOptions);
    console.log(verificationLink);

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description verify token
 */
async function verifyToken(req) {
  try {
    const { token } = req.params;

    // Find the poll creator with the verification token
    const pollCreator = await PollCreator.findOne({ verificationToken: token });

    if (!pollCreator) {
      throw Error("Invalid verification token");
    }

    // Update poll creator's verification status
    pollCreator.isVerified = true;
    pollCreator.verificationToken = undefined;
    await pollCreator.save();

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function login(req) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { email, password } = req.body;

    // Find the poll creator by email
    const pollCreator = await PollCreator.findOne({ email });

    // If poll creator not found or password is incorrect, return error
    if (!pollCreator || !(await bcrypt.compare(password, pollCreator.password)) || !pollCreator.isVerified) {
      throw Error('Invalid email or password');
    }

    // Generate JWT token
    const token = jwt.sign({ userId: pollCreator._id, name: pollCreator.name }, 'your-secret-key');

    return { token };
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function forgetPassword(req) {
  try {
    const { error } = forgetPasswordSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { email } = req.body;

    // Find the poll creator by email
    const pollCreator = await PollCreator.findOne({ email });

    // If poll creator not found or password is incorrect, return error
    if (!pollCreator) {
      throw Error('User not found');
    }

    const resetToken = uuid.v4();

    pollCreator.resetPasswordToken = resetToken;
    pollCreator.resetPasswordTokenExpiration = Date.now() + 3600000; // Token valid for 1 hour

    await pollCreator.save();

    // Send verification email
    const verificationLink = `http://localhost:3000/creator/reset-password/${resetToken}`;
    const mailOptions = {
      to: email,
      subject: "Verify your email",
      html: `<p>Click on the following link to forget your password: ${verificationLink}</p>`,
    };

    // await sendMail(mailOptions);
    console.log(verificationLink);

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function resetPassword(req) {
  try {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { token, password } = req.body;

    const pollCreator = await PollCreator.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiration: { $gt: Date.now() },
    });

    if (!pollCreator) {
      throw Error("Invalid or expired reset token");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and reset token
    pollCreator.password = hashedPassword;
    pollCreator.resetPasswordToken = undefined;
    pollCreator.resetPasswordTokenExpiration = undefined;
    await pollCreator.save();

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}