import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../../validations/poll";
import { createPoll } from "../../../../services/poll.service";
import { errorToast, successToast } from "../../../../utils/toaster";
import PageDetails from "../../../../components/_page_details";
import {
  deleteEmailTemplate,
  getAllEmailTemplates,
  handleTemplateStatus,
} from "../../../../services/creator/email_template.service";
import { Link } from "react-router-dom";
import PaginationComponent from "../../../../components/pagination";

const EmailTemplates = () => {
  const [polls, setPolls] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    loadData();
  }, [page, limit]);

  const loadData = async () => {
    try {
      const response = await getAllEmailTemplates(page, limit);
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
      const response = await deleteEmailTemplate(pollId);
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

  const handleStatus = async (id) => {
    try {
      const response = await handleTemplateStatus(id);
      successToast(response.message);
      loadData();
    } catch (error) {
      errorToast(error);
    }
  }


  const renderList = () => {
    return polls.map((poll, index) => (
      <tr
        key={index}
        className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
      >
        <td className="px-4 py-3">
          <div className="flex items-center text-sm">
            <div>
              <p className="font-semibold">{poll.title}</p>
            </div>
          </div>
        </td>
        <td className="px-4 py-3 text-sm">{poll.subject}</td>
        <td className="px-4 py-3 text-xs">
          {poll.is_approved ? (
            <span onClick={() => handleStatus(poll._id)}
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-green-700 text-green-100`}
            >
              {" "}
              Approved{" "}
            </span>
          ) : (
            <span onClick={() => handleStatus(poll._id)}
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-yellow-600 text-gray-100`}
            >
              {" "}
              Waiting{" "}
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-sm">
          {poll.is_active ? (
            <span
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-green-700 text-green-100`}
            >
              {" "}
              Active{" "}
            </span>
          ) : (
            <span
              className={`px-2 py-1 font-semibold leading-tight rounded-full cursor-pointer bg-red-600 text-gray-100`}
            >
              {" "}
              Inactive{" "}
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-sm flex">
          {/* Edit svg */}
          <Link to={`/creator/emails/template/edit/${poll._id}`}>
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
      <PageDetails title="Email template lists - PollSage" description="Email template lists" />
      <div className="mt-4 mx-4">
        <h1 className="text-xl my-4">Email Template List</h1>
        <div className="w-full overflow-hidden rounded-sm shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Subject</th>
                  <th className="px-4 py-3">Approved Status</th>
                  <th className="px-4 py-3">Active Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {renderList()}
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
      </div>
    </>
  );
};

export default EmailTemplates;
