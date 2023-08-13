import React, { useEffect, useState } from "react";
import { errorToast, successToast } from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import {
  deleteCreator,
  getListOfCreators,
} from "../../../services/admin/creator.service.js";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../components/pagination";
import { formattedDateFromNow } from "../../../helpers/common";

const PollList = () => {
  const [polls, setPolls] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const [dateFilter, setDateFilter] = useState(false);

  useEffect(() => {
    loadData();
  }, [page, limit]);

  const loadData = async () => {
    try {
      const response = await getListOfCreators(page, limit);
      const polls = response.data.docs;
      console.log(polls)
      setPolls(polls);
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
      const response = await deleteCreator(pollId);
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
        className="bg-gray-50 h-16 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-900 text-gray-700 dark:text-gray-400"
      >
        <td className="px-4 py-3">
          <div class="flex items-center">
            <label class="inline-flex">
              <span class="sr-only">Select</span>
              <input
                type="checkbox"
                class="h-4 w-4 text-indigo-600 cursor-pointer checked:bg-blue-500 checked:border-transparent"
              />
            </label>
          </div>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{poll.name}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{poll.email}</td>
        <td className="px-4 py-3 text-xs">
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            {" "}
            {poll.isVerified ? "Verified" : "Unverified"}{" "}
          </span>
        </td>
        <td className="px-4 py-3 text-sm">{poll.createdPolls?.length}</td>
        <td className="px-4 py-3 text-sm">{poll.createdTemplates?.length}</td>
        <td className="px-4 py-3 text-sm">{formattedDateFromNow(poll.createdAt)}</td>
        <td className="px-4 py-5 text-sm flex items-center">
          {/* Edit svg */}
          <Link to={`/admin/faqs/edit/${poll._id}`}>
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
            onClick={() => handleDeletePoll(poll._id)}
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
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          Poll list
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3">
          <button className="text-red-500 bg-slate-800 border border-gray-600 px-9 rounded items-center hover:bg-slate-900">
            Delete
          </button>
          <div className="relative" onMouseLeave={() => setDateFilter(false)}>
            <button
              onClick={() => setDateFilter(true)}
              class="bg-slate-800 inline-flex items-center justify-between px-4 py-1.5 border border-gray-600 rounded w-44 min-w-full"
            >
              <span class="flex items-center">
                <svg
                  class="h-3 w-3 shrink-0 mr-1 fill-current text-white"
                  viewBox="0 0 16 16"
                >
                  <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z"></path>
                </svg>
                <span x-text="$refs.options.children[selected].children[1].innerHTML">
                  Today
                </span>
              </span>
              <svg
                class="h-3 w-3 shrink-0 ml-1 fill-current text-white"
                viewBox="0 0 11 7"
              >
                <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z"></path>
              </svg>
            </button>
            {dateFilter && (
              <div className="pt-2">
                <div class="bg-slate-800 border border-slate-600 rounded absolute w-44 text-md">
                  <div class="text-md py-2">
                    <button class="flex pl-4 items-center mb-1 text-indigo-400 w-full h-8 hover:bg-slate-900">
                      <svg
                        class="mr-2"
                        fill="currentColor"
                        width="12"
                        height="9"
                      >
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                      </svg>
                      <span>Today</span>
                    </button>
                    <button class="flex items-center w-full hover:bg-slate-900 h-8">
                      <svg class="mr-2 invisible" width="12" height="9">
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                      </svg>
                      <span>Last 7 Days</span>
                    </button>
                    <button class="flex items-center w-full hover:bg-slate-900 h-8">
                      <svg class="mr-2 invisible" width="12" height="9">
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                      </svg>
                      <span>Last Month</span>
                    </button>
                    <button class="flex items-center w-full hover:bg-slate-900 h-8">
                      <svg class="mr-2 invisible" width="12" height="9">
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                      </svg>
                      <span>Last 12 Months</span>
                    </button>
                    <button class="flex items-center w-full hover:bg-slate-900 h-8">
                      <svg class="mr-2 invisible" width="12" height="9">
                        <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z"></path>
                      </svg>
                      <span>All Time</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <Link
            class="text-white bg-indigo-500 inline-flex items-center px-6 py-1.5 rounded"
            to="/admin/faqs/create"
          >
            <svg
              class="h-3 w-3 shrink-0 mr-2"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z"></path>
            </svg>
            <span class="ml-1">Create FAQ</span>
          </Link>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-sm shadow-xs mb-8">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold h-16 tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">Index</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Verification</th>
                <th className="px-4 py-3">No. of polls</th>
                <th className="px-4 py-3">No. of email templates</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-slate-800">
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
