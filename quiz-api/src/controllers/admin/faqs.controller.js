const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../../utils/helpers");
const FAQ = require("../../models/faq.model");

// faq validation schema 
const faqValidation = Joi.object({
    title: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
    is_active: Joi.boolean().required(),
    faqs: Joi.array().items(Joi.object({
        question: Joi.string().required(),
        answer: Joi.string().required(),
        is_active: Joi.boolean().required(),
    })).required(),
});

// Module Exports
module.exports = {
  addFaqs, getAllFAQs, getFAQByTag
};

/**
 * @description add faqs
 */
async function addFaqs(req) {
  try {
    const { error } = faqValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { body } = req;

    const faq = await new FAQ(body).save();

    return faq;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get all faqs
 */
async function getAllFAQs(req) {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const faqs = await FAQ.aggregate([
      { $match: {} }, // You can add your filter conditions inside the $match stage
      { $skip: (page - 1) * limit },
      { $limit: limit },
    ]);
    
    const totalFaqs = await FAQ.countDocuments({}); // Get the total count of FAQs
    
    const totalPages = Math.ceil(totalFaqs / limit);
    
    const pagination = {
      itemCount: totalFaqs,
      docs: faqs,
      limit: limit,
      currentPage: page,
      next: page < totalPages ? page + 1 : null,
      prev: page > 1 ? page - 1 : null,
      pageCount: totalPages,
      slNo: (page - 1) * limit + 1,
    };
    
    return pagination;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get faq by tag
 */
async function getFAQByTag(req) {
  try {
    const { tag } = req.params;

    const faqs = await FAQ.find({ tags: tag });

    return faqs;
  } catch (e) {
    throw handleControllerError(e);
  }
}