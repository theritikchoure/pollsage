const { resMsg, defaultLen } = require("../../../config/constant");
const { handleControllerError } = require("../../../utils/helpers");
const EmailTemplate = require("../../models/email_template.model");
const PollCreator = require("../../models/creator.model");
const mongoose = require("mongoose");
const { emailTemplateValidation } = require("../../../validations/creators/email_template.validations.js");

// Module Exports
module.exports = {
  addEmailTemplate, getAllEmailTemplates, getTemplateById, updateTemplateById, deleteTemplateById, updateTemplateStatusById
};

/**
 * @description add poll
 */
async function addEmailTemplate(req) {
  try {
    const { error } = emailTemplateValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { body } = req;

    if(!body.css_content) {
      body.css_content = null;
    }

    const template = await new EmailTemplate(body).save();

    await PollCreator.findByIdAndUpdate(
      req.user._id,
      {
        $push: { createdTemplates: template._id },
      }
    );


    return template;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get all email templates
 */
async function getAllEmailTemplates(req) {
  try {
    let perPage = req.params.limit || 10;
    let currentPage = req.params.page || 1;

    // Calculate the number of themes to skip based on the current page and items per page
    const skipCount = (parseInt(currentPage) - 1) * parseInt(perPage);

    // Fetch themes from the createdTemplates field of the creator, applying pagination
    const user = await PollCreator.findById(req.user._id);
    const totalThemes = user.createdTemplates.length;
    const totalPages = Math.ceil(totalThemes / perPage);

    // Using the aggregate pipeline to fetch themes with pagination
    const creator = await PollCreator.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "emailtemplates", // Assuming the collection name for themes is "themes"
          localField: "createdTemplates",
          foreignField: "_id",
          as: "createdTemplates",
        },
      },
      { $unwind: "$createdTemplates" },
      { $sort: { "createdTemplates.createdAt": -1 } },
      { $skip: skipCount },
      { $limit: parseInt(perPage) },
    ]);

    const paginatedThemes = creator.map((doc) => doc.createdTemplates);

    const pagination = {
      itemCount: totalThemes,
      docs: paginatedThemes,
      perPage: parseInt(perPage),
      currentPage: parseInt(currentPage),
      next: parseInt(currentPage) < totalPages ? parseInt(currentPage) + 1 : null,
      prev: parseInt(currentPage) > 1 ? parseInt(currentPage) - 1 : null,
      pageCount: totalPages,
      slNo: skipCount + 1,
    };

    return pagination;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get template by id
 */
async function getTemplateById(req) {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }
    return template;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description update template by id
 */
async function updateTemplateById(req) {
  try {
    // update template
    const { error } = emailTemplateValidation.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const creator = await PollCreator.findById(req.user._id);

    if (!creator.createdTemplates.includes(req.params.id)) {
      throw Error('Unauthorized access');
    }

    const { body } = req;

    if(!body.css_content) {
      body.css_content = null;
    }

    const template = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      body,
      { new: true }
    );

    if (!template) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    return template;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description delete template by id
 */
async function deleteTemplateById(req) {
  try {

    // only creator can delete only their own templates
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    const creator = await PollCreator.findById(req.user._id);

    if (!creator.createdTemplates.includes(req.params.id)) {
      throw Error('Unauthorized access');
    }

    // write code to delete
    await template.remove();

    // remove template id from creator
    await PollCreator.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { createdTemplates: req.params.id },
      }
    );

    return true;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description update template status by id
 */
async function updateTemplateStatusById(req) {
  try {

    // get template
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) {
      throw Error(resMsg.NO_RECORD_FOUND);
    }

    // only creator can update only their own templates
    const creator = await PollCreator.findById(req.user._id);

    if (!creator.createdTemplates.includes(req.params.id)) {
      throw Error('Unauthorized access');
    }

    template.is_approved = !template.is_approved;
    await template.save();

    return true;

  } catch (e) {
    throw handleControllerError(e);
  }
}