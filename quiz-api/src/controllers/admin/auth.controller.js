const Joi = require("joi");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { handleControllerError } = require("../../../utils/helpers");
const Admin = require("../../models/admin.model");
const uuid = require("uuid");
const sendMail = require("../../../config/mail");
const env = require("../../../config/env");

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().min(6).required(),
});

// Module Exports
module.exports = {
  login,
};

async function login(req) {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { username, password } = req.body;

    let emailOrUsername = username;

    // Find the poll creator by email
    const admin = await Admin.findOne({
      $or: [
        { email: emailOrUsername }, // Search by email
        { username: emailOrUsername }, // Search by username
      ],
    });

    console.log(admin);

    // If poll creator not found or password is incorrect, return error
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      throw Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, name: admin.name, role: "admin" },
      env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return { token };
  } catch (e) {
    throw handleControllerError(e);
  }
}
