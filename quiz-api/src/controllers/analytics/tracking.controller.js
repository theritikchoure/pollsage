const Joi = require("joi");
const { resMsg, defaultLen } = require("../../../config/constant");
const { handleControllerError } = require("../../../utils/helpers");
const PageView = require("../../models/analytics/page_views.model.js");

const pageViewValidation = Joi.object({
  session_id: Joi.string().required(),
  url: Joi.string().required(),
  referrer: Joi.string().allow(null).default(null),
  source: Joi.string()
    .default("direct")
    .valid("direct", "organic", "referral", "social", "other"),

  geo_location: Joi.object().allow(null).default(null),
});

// Module Exports
module.exports = {
  addPageViews,
};

/**
 * @description add page views
 */
async function addPageViews(req) {
  try {
    const { error } = pageViewValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    let pageView = new PageView(req.body);
    await pageView.save();

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}
