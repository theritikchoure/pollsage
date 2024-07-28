import React, { useEffect, useState } from "react";
import { getPollsOverview } from "../../services/creator/dashboard.service";
import { errorToast } from "../../utils/toaster";
import socket from "../../services/socket.service";

const StatisticsCards = () => {
  const [pollsOverview, setPollsOverview] = useState(null);
  const [liveCounter, setLiveCounter] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let res = await getPollsOverview();
      console.log(res);
      setPollsOverview(res.data);

      // Socket.IO event listeners
      socket.on(`user-connected`, handleUserConnect);

      // Clean up the event listeners on component unmount
      return () => {
        socket.off(`user-connected`, handleUserConnect);
      };
    } catch (error) {
      console.log(error);
      errorToast(error.message || error || "Something went wrong");
    }
  };

  const handleUserConnect = (data) => {
    // Handle the updated poll result
    console.log("Poll result updated:", data);
    setLiveCounter(data.counter);
  };

  return (
    <>
      {!pollsOverview && (
        <div className="grid p-4 gap-4">
          <div className="flex justify-center items-center p-4 mt-4 h-8">
            Loading ...
          </div>
        </div>
      )}
      {pollsOverview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4 gap-4">
          <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-200 text-black font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{pollsOverview.totalPolls}</p>
              <p>Polls created</p>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-200 text-black font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{pollsOverview.activePolls}</p>
              <p>Active polls</p>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-200 text-black font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{pollsOverview.archivedPolls}</p>
              <p>Archived Polls</p>
            </div>
          </div>
          <div className="bg-gray-100 shadow-lg rounded-md flex items-center justify-between p-3 border-b-4 border-blue-200 text-black font-medium group">
            <div className="flex justify-center items-center w-14 h-14 bg-white rounded-full transition-all duration-300 transform group-hover:rotate-12">
              <svg
                width="30"
                height="30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="stroke-current text-blue-800 dark:text-gray-800 transform transition-transform duration-500 ease-in-out"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <div className="text-right">
              <p className="text-2xl">{liveCounter}</p>
              <p>Real time user</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StatisticsCards;
