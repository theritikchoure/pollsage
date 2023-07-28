const { resMsg, defaultLen } = require("../../../config/constant");
const { handleControllerError } = require("../../../utils/helpers");
const Theme = require("../../models/theme.model");
const PollCreator = require("../../models/creator.model");
const mongoose = require("mongoose");
const { themeValidations } = require("../../../validations/creators/theme.validations");

// Module Exports
module.exports = {
  addTheme,
  getAllThemes,
  getAllThemesByUser
};

/**
 * @description add poll
 */
async function addTheme(req) {
  try {
    const { error } = themeValidations.validate(req.body);
    if (error) {
      throw Error(error.details[0].message);
    }

    const { body } = req;

    const theme = await new Theme(body).save();

    await PollCreator.findByIdAndUpdate(
      req.user._id,
      {
        $push: { createdThemes: theme._id },
      }
    );

    return theme;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get all the themes
 */
async function getAllThemes(req) {
  try {
    let themes = await Theme.find({}).lean();
    let creator = await PollCreator.findOne({ creator: req.user._id }).lean();
    if (creator) {
      themes = themes.map((theme) => {
        if (theme._id.toString() === creator.theme.toString()) {
          theme.tag = "saved";
        }
        return theme;
      });
    }
    return themes;
  } catch (e) {
    throw handleControllerError(e);
  }
}

/**
 * @description get all the themes creaated by the user
 */
async function getAllThemesByUser(req) {
  try {

    let perPage = req.params.limit || 10;
    let currentPage = req.params.page || 1;

    // Calculate the number of themes to skip based on the current page and items per page
    const skipCount = (parseInt(currentPage) - 1) * parseInt(perPage);

    // Fetch themes from the createdThemes field of the creator, applying pagination
    const user = await PollCreator.findById(req.user._id);
    const totalThemes = user.createdThemes.length;
    const totalPages = Math.ceil(totalThemes / perPage);

    // Using the aggregate pipeline to fetch themes with pagination
    const creator = await PollCreator.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.user._id) } },
      {
        $lookup: {
          from: "themes", // Assuming the collection name for themes is "themes"
          localField: "createdThemes",
          foreignField: "_id",
          as: "createdThemes",
        },
      },
      { $unwind: "$createdThemes" },
      { $sort: { "createdThemes.createdAt": -1 } },
      { $skip: skipCount },
      { $limit: parseInt(perPage) },
    ]);

    const paginatedThemes = creator.map((doc) => doc.createdThemes);

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

