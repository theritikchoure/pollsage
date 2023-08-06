async function getPaginatedResults(model, query, currentPage, perPage) {
  try {
    // Calculate the skip count based on the current page and limit
    const skipCount = (currentPage - 1) * perPage;

    // Get the total number of documents for the query
    const totalItems = await model.countDocuments(query);

    // Get the paginated documents
    const documents = await model
      .find(query)
      .sort({ createdAt: -1 })
      .skip(skipCount)
      .limit(perPage)
      .populate("replies");

    // Calculate the total number of pages
    const pageCount = Math.ceil(totalItems / perPage);

    // Create the pagination object
    const pagination = {
      itemCount: totalItems,
      docs: documents,
      perPage: perPage,
      currentPage: currentPage,
      next: currentPage < pageCount ? currentPage + 1 : null,
      prev: currentPage > 1 ? currentPage - 1 : null,
      pageCount: pageCount,
      slNo: skipCount + 1,
    };

    return pagination;
  } catch (error) {
    throw error; // Throw the error without handling here for centralized error handling.
  }
}

module.exports = getPaginatedResults;