import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { createPoll } from "../../../services/poll.service";
import { errorToast, successToast } from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import { deletePoll } from "../../../services/creator/poll.service";
import { Link } from "react-router-dom";
import { getCommentsByPoll } from "../../../services/creator/comment.service";
import { formattedDateFromNow } from "../../../helpers/common";
import { io } from "socket.io-client";
import { getCookie } from "../../../helpers/cookie";

const socket = io();

const CommentsByPoll = () => {
  const [comments, setComments] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [poll, setPoll] = useState({});
  const [live, setLive] = useState(false);
  const pollId = window.location.pathname.split("/")[3];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let pollId = window.location.pathname.split("/")[3];
      console.log(pollId);
      const response = await getCommentsByPoll(pollId);
      setComments(response.data.docs);
      setPoll(response.data.poll);
      delete response.data.docs;
      delete response.data.poll;
      setPagination(response.data);

      let user = localStorage.getItem('user');
      user = JSON.parse(user);
      console.log(`commentAdded-${pollId}`);
      
      // Socket.IO event listeners
      socket.on(`commentAdded-${pollId}`, handlePollResultUpdate);

      // Clean up the event listeners on component unmount
      return () => {
        socket.off(`commentAdded-${pollId}`, handlePollResultUpdate);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handlePollResultUpdate = (data) => {
    // Handle the updated poll result
    console.log("Poll result updated:", data);
    if(data.live) {
      loadData();
      setLive(true);
    }
    // Update your state or perform any other necessary actions
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
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mt-4 mx-4">
        <h1 className="text-xl my-4">
          Comment list on {poll && poll.question} {live && <span className="text-white bg-red-700 px-2 text-sm rounded pb-1">Live</span>}
        </h1>
        {/* <div className="my-2 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option>5</option>
                <option>10</option>
                <option>20</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
            <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4 fill-current text-gray-500"
              >
                <path d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z"></path>
              </svg>
            </span>
            <input
              placeholder="Search"
              className="appearance-none sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            />
            </div>
          </div>
          <div className="block relative">
            <button className="bg-purple-500 w-full px-2 py-2">
              Search
            </button>
          </div>
        </div> */}
        <div className="w-full overflow-hidden rounded-sm shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Display name</th>
                  <th className="px-4 py-3">Comment</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Likes</th>
                  <th className="px-4 py-3">Replies</th>
                  <th className="px-4 py-3">Sentiment label</th>
                  <th className="px-4 py-3">Comment added</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {comments &&
                  comments.map((el, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                          <div>
                            <p className="font-semibold">{el.display_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm">{el.comment}</td>
                      <td className="px-4 py-3 text-xs">
                        {el.is_active ? (
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {" "}
                            Active{" "}
                          </span>
                        ) : (
                          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {" "}
                            Inactive{" "}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{el?.like_count}</td>
                      <td className="px-4 py-3 text-sm">
                        {el?.replies?.length}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {el.sentiment?.label}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {formattedDateFromNow(el.createdAt)}
                      </td>
                      <td className="px-4 py-3 text-sm flex">
                        {/* Edit svg */}
                        <Link to={`/creator/edit-poll/${el.pollId}`}>
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
                          onClick={() => handleDeletePoll(el.pollId)}
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
                      disabled={pagination && !pagination.prev}
                      onClick={() => alert("prev")}
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
                  {pagination &&
                    pagination.pageCount > 0 &&
                    Array.from(
                      { length: pagination.pageCount },
                      (_, index) => index + 1
                    ).map((el, index) => (
                      <li key={index}>
                        <button
                          className={`px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple
                      ${
                        pagination.currentPage === index + 1
                          ? "bg-gray-100 text-gray-800"
                          : ""
                      }
                      `}
                          disabled={pagination.currentPage === index + 1}
                        >
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  <li>
                    <span className="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button
                      className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                      disabled={pagination && !pagination.next}
                      onClick={() => alert("prev")}
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

export default CommentsByPoll;
