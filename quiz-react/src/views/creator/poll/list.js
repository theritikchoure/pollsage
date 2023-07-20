import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { createPoll } from "../../../services/poll.service";
import { errorToast, successToast } from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import {
  deletePoll,
  getListOfPolls,
} from "../../../services/creator/poll.service";
import { Link } from "react-router-dom";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getListOfPolls();
      setPolls(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletePoll = async (pollId) => {
    try {
      // ask for confirmation
      let confirm = window.confirm(
        "Are you sure you want to delete this poll?"
      );
      if (!confirm) return;
      const response = await deletePoll(pollId);
      successToast(response.message);
      loadData();
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <>
      <PageDetails title="Create Poll - PollSage" description="Create Poll" />
      <div className="mt-4 mx-4">
        <h1 className="text-xl my-4">Poll list</h1>
        <div className="w-full overflow-hidden rounded-sm shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Question</th>
                  <th className="px-4 py-3">Poll id</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">View poll</th>
                  <th className="px-4 py-3">View results</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {polls.map((poll, index) => (
                  <tr
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{poll.question}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{poll.pollId}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                        {" "}
                        {poll.publish_status}{" "}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/poll/${poll.pollId}`} target="_blank">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye w-5 h-5 text-center cursor-pointer"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />{" "}
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />{" "}
                        </svg>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <Link to={`/creator/poll-result/${poll.pollId}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 fill-current cursor-pointer hover:text-red-800"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path
                            d="M15.985 8.5H8.207l-5.5 5.5a8 8 0 0 0 13.277-5.5zM2 13.292A8 8 0 0 1 7.5.015v7.778l-5.5 5.5zM8.5.015V7.5h7.485A8.001 8.001 0 0 0 8.5.015z"
                            fill="white"
                          ></path>{" "}
                        </svg>
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-sm flex">
                      {/* Edit svg */}
                      <Link to={`/creator/edit-poll/${poll.pollId}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-pencil-square w-5 h-5 fill-current cursor-pointer hover:text-green-400"
                          viewBox="0 0 16 16"
                        >
                          {" "}
                          <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />{" "}
                          <path
                            fillRule="evenodd"
                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                          />{" "}
                        </svg>
                      </Link>
                      {/* Delete svg */}
                      <svg
                        onClick={() => handleDeletePoll(poll.pollId)}
                        className="w-5 h-5 fill-current cursor-pointer ml-3 hover:text-red-800"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                        <g>
                          {" "}
                          <path fill="none" d="M0 0h24v24H0z" />{" "}
                          <path d="M7 4V2h10v2h5v2h-2v15a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6H2V4h5zM6 6v14h12V6H6zm3 3h2v8H9V9zm4 0h2v8h-2V9z" />{" "}
                        </g>{" "}
                      </svg>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span className="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul className="inline-flex items-center">
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
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
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
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
        </div>
      </div>
    </>
  );
};

export default PollList;
