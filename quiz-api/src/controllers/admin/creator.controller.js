const Joi = require("joi");
const mongoose = require("mongoose");
const { resMsg, defaultLen } = require("../../../config/constant");
const {
  handleControllerError,
  generateString,
} = require("../../../utils/helpers");
const Creator = require("../../models/creator.model");
const bcrypt = require("bcryptjs");

// Module Exports
module.exports = {
  addFaqs, getAllCreators, getFAQByTag, getFAQById
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
async function getAllCreators(req) {
  try {
    let { page = 1, limit = 10 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    const docs = await Creator.aggregate([
      { $match: {} }, // You can add your filter conditions inside the $match stage
      { $skip: (page - 1) * limit },
      { $limit: limit },
      {
        $project: {
          _id: 1, // Include other fields you want to keep
          name: 1,
          email: 1,
          createdPolls: 1,
          createdTemplates: 1,
          isVerified: 1,
          createdAt: 1,
          updatedAt: 1,
          // Exclude the password field
        },
      },
    ]);
    
    const totalDocs = await Creator.countDocuments({}); // Get the total count of FAQs
    
    const totalPages = Math.ceil(totalDocs / limit);
    
    const pagination = {
      itemCount: totalDocs,
      docs: docs,
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
 * @description get faq by id
 */
async function getFAQById(req) {
  try {
    
    // sanity check
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      throw Error("Invalid id");
    }

    const id = new mongoose.Types.ObjectId(req.params.id);


    const faq = await FAQ.findById(id);

    return faq;

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

async function insertMany() {
  try {
    
    const data = [
      {
        "name": "John Doe",
        "email": "john@doe.com",
        "password": "abc@124",
        "isVerified": true,
        "createdAt": "2021-06-06T06:30:00.000Z",
        "updatedAt": "2021-06-06T06:30:00.000Z"
      },
      {
        "name": "Rush Doe",
        "email": "rush@doe.com",
        "password": "abc@124",
        "createdPolls": [],
        "createdTemplates": [],
        "isVerified": true,
        "createdAt": "2021-06-06T06:30:00.000Z",
        "updatedAt": "2021-06-06T06:30:00.000Z"
      },
    ]

    let arr = [];

    await data.forEach(async (item) => {
      console.log(item)
      arr.push(await bcrypt.hash(item.password, 10));
    })

    console.log(arr)
    // Hash the password
    

  } catch (error) {
    console.log(error)
  }
}

insertMany()

