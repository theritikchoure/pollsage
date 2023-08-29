import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { createPoll } from "../../../services/poll.service";
import { errorToast, successToast } from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import {
  getListOfPolls,
  getPollResult,
} from "../../../services/creator/poll.service";
import { Link } from "react-router-dom";
import Loader from '../../../components/_loader';
import { formattedDateFromNow } from "../../../helpers/common";
import socket from "../../../services/socket.service";

const PollList = () => {
  const [pollId, setPollId] = useState(null);
  const [poll, setPoll] = useState(null);
  const [pollUrl, setPollUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pId) => {
    try {
      // load the poll
      const id = window.location.pathname.split("/")[3];
      setPollId(id);
      let res = await getPollResult(id);
      console.log(res);
      setPoll(res.data);
      setPollUrl(window.location.href);

      // Socket.IO event listeners
      socket.on(`pollResultUpdated-${id}`, handlePollResultUpdate);

      // Clean up the event listeners on component unmount
      return () => {
        socket.off(`pollResultUpdated-${id}`, handlePollResultUpdate);
      };
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handlePollResultUpdate = (data) => {
    // Handle the updated poll result
    console.log("Poll result updated:", data);
    setPoll(data.result);
    // Update your state or perform any other necessary actions
  };

  const optionText = (id, options) => {
    return options.find((option) => option._id === id)?.text;
  }

  return (
    <>
      <PageDetails title="Poll Result - PollSage" description="Poll result" />
      {loading && <Loader />}
      {!loading && <div className="mt-4 mx-4">
        <h1 className="text-xl my-4">Poll list</h1>
        <div className="w-full overflow-hidden rounded-sm shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="items-center w-full bg-gray-800 border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Options
                  </th>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Votes
                  </th>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  poll.poll.options.map((option, index) => (
                    <tr
                      className="text-gray-100 dark:text-gray-100"
                      key={index}
                    >
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {option.text}
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {option.votes}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex items-center">
                          <span className="mr-2">
                            {((Number(option.votes) / Number(poll.totalVotes)) * 100).toFixed(
                              2
                            )}
                            %
                          </span>
                          <div className="relative w-full">
                            <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                              <div
                                style={{
                                  width: `${
                                    (Number(option.votes) /
                                      Number(poll.totalVotes)) *
                                    100
                                  }%`,
                                }}
                                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              {" "}
              Total votes{" "}
            </span>
            <span className="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              {!loading && <p>{poll.totalVotes}</p>}
            </span>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-sm shadow-xs mt-10">
          <div className="w-full overflow-x-auto">
            <table className="items-center w-full bg-gray-800 border-collapse">
              <thead>
                <tr>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Options
                  </th>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Votes
                  </th>
                  <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                </tr>
              </thead>
              <tbody>
                {!loading &&
                  poll.pollResponses.map((response, index) => (
                    <tr
                      className="text-gray-100 dark:text-gray-100"
                      key={index}
                    >
                      <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                        {response._id}
                      </th>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {response?.geo_location.city + ", " + response?.geo_location.regionName}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {response?.geo_location?.country}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {optionText(response?.optionId, poll.poll.options)}
                      </td>
                      <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {formattedDateFromNow(response?.createdAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span className="flex items-center col-span-3">
              {" "}
              Total votes{" "}
            </span>
            <span className="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              {!loading && <p>{poll.totalVotes}</p>}
            </span>
          </div>
        </div>
      </div>}
    </>
  );
};

export default PollList;
