const { handleControllerError } = require("../../../utils/helpers");
const AccessTokens = require("../../models/access_token.model.js");
const env = require("../../../config/env.js");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { encrypt, decrypt } = require("../../../utils/crypto");
const mongoose = require("mongoose");

// Module Exports
module.exports = {
  addAccessToken,
  getAccessTokens,
  getAccessTokenById,
  deleteAccessToken,
};

const customSchemaValidation = Joi.object({
  purpose: Joi.string().required().trim(),
  team: Joi.string().required(),
  expiration_time: Joi.string().required(),
  routes: Joi.array().items(Joi.string().required()).required(),
  methods: Joi.array().items(Joi.string().required()).required(),
  is_active: Joi.boolean().required(),
});

async function addAccessToken(req) {
  try {
    const { error } = customSchemaValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    req.body.issuer = req.user._id;

    const value = req.body;
    const accessToken = new AccessTokens(value);
    await accessToken.save();

    // create jwt token using accessToken._id
    const token = await jwt.sign(
      {
        _id: accessToken._id,
      },
      env.JWT_SECRET,
      {
        expiresIn: value.expiration_time,
      }
    );

    let encryptedToken = await encrypt(token, 10);

    // update the token in db
    accessToken.token = encryptedToken;

    await accessToken.save();

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getAccessTokens(req) {
  try {
    const perPage = 10; // Number of items per page
    const currentPage = req.query.page || 1; // Get the current page from the request query
    const skipCount = (currentPage - 1) * perPage; // Calculate the number of items to skip

    // Get the filter from the request query (e.g., 'today', 'last7days', 'lastmonth', 'last12months', 'alltime')
    const filter = req.query.filter;

    // Define the date range based on the filter
    let startDate, endDate;
    switch (filter) {
      case "today":
        startDate = getStartOfDay();
        endDate = moment(); // current time
        break;
      case "last7days":
        startDate = moment().subtract(7, "days").startOf("day");
        endDate = moment(); // current time
        break;
      case "lastmonth":
        startDate = getStartOfMonth();
        endDate = moment(); // current time
        break;
      case "last12months":
        startDate = getStartOfLast12Months();
        endDate = moment(); // current time
        break;
      default:
        // For 'alltime' or any invalid filter, set startDate to null (no filter)
        startDate = null;
        endDate = null;
        break;
    }

    // Build the query based on the date range
    const query = {};
    if (startDate && endDate) {
      query.createdAt = { $gte: startDate, $lte: endDate };
    }

    // Find the total count of access tokens matching the query
    const totalPolls = await AccessTokens.countDocuments(query);

    // Find the paginated access tokens with the specified skip and limit
    const paginatedPolls = await AccessTokens.find(query)
      .populate("issuer")
      .skip(skipCount)
      .limit(perPage)
      .sort({ createdAt: -1 }) 
      .exec();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalPolls / perPage);

    // Build the pagination object
    const pagination = {
      itemCount: totalPolls,
      docs: paginatedPolls,
      perPage: perPage,
      currentPage: currentPage,
      next: Number(currentPage) < totalPages ? Number(currentPage) + 1 : null,
      prev: currentPage > 1 ? currentPage - 1 : null,
      pageCount: totalPages,
      slNo: skipCount + 1,
    };

    return pagination;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function getAccessTokenById(req) {
  try {
    // sanitize the params
    const { error } = Joi.object({
      id: Joi.string().required(),
    }).validate(req.params);

    if (error) {
      throw Error(error.details[0].message);
    }

    // id should be valid mongodb id
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw Error("Invalid id");
    }

    const accessToken = await AccessTokens.findOne({
      _id: req.params.id,
    });

    return accessToken.token;
  } catch (e) {
    throw handleControllerError(e);
  }
}

async function deleteAccessToken(req) {
  try {
    // sanitize the req.params.id
    const { error } = Joi.object({
      id: Joi.string().required(),
    }).validate(req.params);

    if (error) {
      throw Error(error.details[0].message);
    }

    // id should be valid mongodb id
    if (!mongoose.isValidObjectId(req.params.id)) {
      throw Error("Invalid id");
    }

    const accessToken = await AccessTokens.findOne({
      _id: req.params.id,
    });

    if (!accessToken) {
      throw Error("Invalid id");
    }

    // Delete the token
    await AccessTokens.findByIdAndDelete(req.params.id);

    return true;
  } catch (error) {
    throw handleControllerError(error);
  }
}

//  moment
const moment = require("moment");

// Function to get the start of the day (00:00:00)
const getStartOfDay = () => moment().startOf("day");

// Function to get the start of the month (1st day, 00:00:00)
const getStartOfMonth = () => moment().startOf("month");

// Function to get the start of the last 12 months from today
const getStartOfLast12Months = () =>
  moment().subtract(12, "months").startOf("month");
