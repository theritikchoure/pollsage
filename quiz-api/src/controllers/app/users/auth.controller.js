const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { resMsg, defaultLen } = require("../../../../config/constant");
const { handleControllerError } = require("../../../../utils/helpers");
const User = require("../../../models/user.model");
const uuid = require("uuid");
const sendMail = require("../../../../config/mail");
const emailVerificationTemplate = require("../../../../utils/email-templates/email-verification");
const env = require("../../../../config/env");

// validation schemas
const registrationSchema = Joi.object({
  username: Joi.string().required().label("Username"),
  name: Joi.string().required().label("Name"),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  country: Joi.string().required().label("Country"),
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

    const { name, email, password, username } = req.body;

    // check if username already exists
    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
        throw Error("Username already exists");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw Error("User already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = uuid.v4();

    // Create a new poll creator
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // Save the poll creator
    await user.save();

    // Send verification email
    const verificationLink = `http://localhost:3000/user/verify/${verificationToken}`;
    const mailOptions = {
      to: email,
      subject: "Verify your email",
      html: emailVerificationTemplate(name, verificationLink),
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

    // Find the user with the verification token
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      throw Error("Invalid verification token");
    }

    // Update poll user's verification status
    user.is_verified = true;
    user.verification_token = undefined;
    await user.save();

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

// Function to find the user by email or username
async function findUserByEmailOrUsername(emailOrUsername) {
    try {
      const user = await User.findOne({
        $or: [
          { email: emailOrUsername }, // Search by email
          { username: emailOrUsername }, // Search by username
        ],
      });
  
      return user;
    } catch (error) {
      // Handle the error here
      console.error("Error finding user:", error.message);
      throw error;
    }
  }

async function login(req) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { username, password } = req.body;

    // Find the user by email or username
    let user = await findUserByEmailOrUsername(username);

    // If user not found or password is incorrect, return error
    if (
      !user ||
      !(await bcrypt.compare(password, user.password)) ||
      !user.is_verified
    ) {
      throw Error("Invalid email or password");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, name: user.name, role: "user" },
      env.JWT_SECRET,
    );

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

    const { username } = req.body;

    // Find the poll creator by email
    const user = await findUserByEmailOrUsername(username);

    // If user not found
    if (!user) {
      throw Error("User not found");
    }

    const resetToken = uuid.v4();

    user.reset_password_token = resetToken;
    user.reset_password_token_expiration = Date.now() + 3600000; // Token valid for 1 hour

    await user.save();

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
