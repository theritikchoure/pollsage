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
import PaginationComponent from "../../../components/pagination";
import CreatorPageTitle from "../../../components/creator/page_title";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadData();
  }, [page, limit]);

  const loadData = async () => {
    try {
      const response = await getListOfPolls(page, limit);
      setPolls(response.data.docs);
      delete response.data.docs;
      setPagination(response.data);
      renderList();
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

  const handlePageChange = async (page) => {
    setPage(page);
  };

  const handleLimitChange = async (limit) => {
    setLimit(limit);
  };

  const downloadQR = async (pollId) => {
    try {
      let res = await fetch(
        "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=http://localhost:5000/poll/" +
          pollId
      );
      let blob = await res.blob();
      let url = window.URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = pollId + ".png";
      a.click();
    } catch (error) {
      console.log(error || error.message);
    }
  };

  const renderList = () => {
    return polls.map((poll, index) => (
      <tr
        key={index}
        className="bg-gray-50 h-16 hover:bg-gray-100 text-gray-700 "
      >
        <td className="px-4 py-3">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input
                type="checkbox"
                className="h-4 w-4 text-indigo-600 cursor-pointer checked:bg-blue-500 checked:border-transparent"
              />
            </label>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{poll.question}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{poll.pollId}</td>
        <td className="px-4 py-3 text-xs">
          <span className="px-2 py-1 font-semibold leading-tight text-white bg-green-700 rounded-full">
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
                fill="black"
              ></path>{" "}
            </svg>
          </Link>
        </td>
        <td className="px-4 py-3 text-xs">
          {poll.allow_comments ? (
            <Link
              to={`/creator/poll-comments/${poll.pollId}`}
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-green-700 text-green-100`}
            >
              {" "}
              View comment{" "}
            </Link>
          ) : (
            <span
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-red-600 text-gray-100`}
            >
              {" "}
              Not allowed{" "}
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-sm">
          <button onClick={() => downloadQR(poll.pollId)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="w-5 h-5 fill-current cursor-pointer hover:text-blue-400 hover:w-6 hover:h-6"
              viewBox="0 0 16 16"
            >
              {" "}
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z" />{" "}
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z" />{" "}
            </svg>
          </button>
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
    ));
  };

  return (
    <>
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 font-bold text-3xl">
          Poll list
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3">
          <button className="text-red-500 bg-gray-100 border border-gray-600 px-9 rounded items-center hover:bg-gray-200">Delete</button>
          <div className="relative">
            <button className="bg-gray-100 text-black inline-flex items-center justify-between px-4 py-1.5 border border-gray-600 rounded w-44 min-w-full">
              <span className="flex items-center">
                <svg
                  className="h-3 w-3 shrink-0 mr-1 fill-current text-black"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                </svg>
                <span x-text="$refs.options.children[selected].children[1].innerHTML">
                  Today
                </span>
              </span>
              <svg
                className="h-3 w-3 shrink-0 ml-1 fill-current text-white"
                viewBox="0 0 11 7"
              >
                <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z"></path>
              </svg>
            </button>
            {/* <div className="bg-gray-100 text-black border border-slate-600 rounded absolute w-44 mt-2 text-md">
              <div className="text-md py-2">
                <button className="flex pl-4 items-center mb-1 text-indigo-400 w-full h-8 hover:bg-gray-200">
                  <svg className="mr-2" fill="currentColor" width="12" height="9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                  </svg>
                  <span>Today</span>
                </button>
                <button className="flex items-center w-full hover:bg-gray-200 h-8">
                  <svg className="mr-2 invisible" width="12" height="9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                  </svg>
                  <span>Last 7 Days</span>
                </button>
                <button className="flex items-center w-full hover:bg-gray-200 h-8">
                  <svg className="mr-2 invisible" width="12" height="9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                  </svg>
                  <span>Last Month</span>
                </button>
                <button className="flex items-center w-full hover:bg-gray-200 h-8">
                  <svg className="mr-2 invisible" width="12" height="9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                  </svg>
                  <span>Last 12 Months</span>
                </button>
                <button className="flex items-center w-full hover:bg-gray-200 h-8">
                  <svg className="mr-2 invisible" width="12" height="9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                  </svg>
                  <span>All Time</span>
                </button>
              </div>
            </div> */}
          </div>
          <Link className="text-white bg-indigo-500 inline-flex items-center px-6 py-1.5 rounded"
            to="/creator/polls/create"
          >
            <svg
              className="h-3 w-3 shrink-0 mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            </svg>
            <span className="ml-1">Create Poll</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-sm shadow-xs mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold h-16 tracking-wide text-left text-gray-500 uppercase border-b bg-gray-100 ">
                <th className="px-4 py-3">Index</th>
                <th className="px-4 py-3">Question</th>
                <th className="px-4 py-3">Poll id</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">View poll</th>
                <th className="px-4 py-3">View results</th>
                <th className="px-4 py-3">View comments</th>
                <th className="px-4 py-3">QR Code</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y">
              {polls && renderList()}
            </tbody>
          </table>
        </div>
        {pagination && (
          <PaginationComponent
            pagination={pagination}
            handlePageChange={handlePageChange}
            handleLimitChange={handleLimitChange}
          />
        )}
      </div>
    </>
  );
};

export default PollList;
