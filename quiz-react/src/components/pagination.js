import React from "react";

const PaginationComponent = ({ pagination, handlePageChange, handleLimitChange }) => {
  const { itemCount, perPage, currentPage, next, prev, pageCount, slNo } =
    pagination;

  const renderPageButtons = () => {
    const buttons = [];

    for (let page = 1; page <= pageCount; page++) {
      buttons.push(
        <li key={page}>
          <button onClick={() => handlePageChange(page)}
            className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple ${
              Number(currentPage) === page ? "bg-gray-200 text-gray-500" : ""
            }`}
          >
            {page}
          </button>
        </li>
      );
    }

    return buttons;
  };

  return (
    <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t bg-gray-50 sm:grid-cols-9">
      <span className="flex items-center col-span-4 sm:col-span-3">
        Showing {slNo}-{Math.min(slNo + perPage - 1, itemCount)} of {itemCount}
      </span>
      {/* <span className="col-span-2"></span> */}
      {/* Limit Dropdown */}
      <span className="flex items-center col-span-4 sm:mt-auto sm:col-span-2">
        <label htmlFor="limit" className="mr-2">
          Show:
        </label>
        <select
          id="limit"
          className="px-2 w-16 text-gray-700 py-1 rounded-md focus:outline-none focus:shadow-outline-purple"
          value={perPage}
          onChange={(e) => handleLimitChange(Number(e.target.value))}
        >
          <option value="5" className="text-black">5</option>
          <option value="10" className="text-black">10</option>
          <option value="20" className="text-black">20</option>
        </select>
      </span>
      {/* <!-- Pagination --> */}
      <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
        <nav aria-label="Table navigation">
          <ul className="inline-flex items-center">
            <li>
              <button onClick={() => handlePageChange(prev)}
                className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Previous"
                disabled={prev === null}
              >
                <svg
                  aria-hidden="true"
                  className="w-4 h-4 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
            {renderPageButtons()}
            <li>
              <button onClick={() => handlePageChange(next)}
                className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                aria-label="Next"
                disabled={next === null}
              >
                <svg
                  className="w-4 h-4 fill-current"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </button>
            </li>
          </ul>
        </nav>
      </span>
    </div>
  );
};

export default PaginationComponent;
