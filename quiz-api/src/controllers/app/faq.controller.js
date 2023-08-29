const { handleControllerError } = require("../../../utils/helpers");
const FAQ = require("../../models/faq.model.js");

// Module Exports
module.exports = {
  getFAQByTag,
};

/**
 * @description get faq by tag
 */
async function getFAQByTag(req) {
  try {
    const { tag } = req.params;

    // Create a query object
    const query = await FAQ.find({ tags: tag }).explain("allPlansExecution");

    console.log(query);

    // Execute query
    let faqs = await FAQ.find({ tags: tag });

    if (faqs.length > 1) {
      let concatFaq = [];
      faqs.forEach((faq) => {
        concatFaq.push(faq.faqs);
      });

      return concatFaq;
    }

    return faqs[0];
  } catch (e) {
    throw handleControllerError(e);
  }
}
