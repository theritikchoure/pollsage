import React, { useEffect, useState } from "react";
import api from "../../../services/api.service";
import { errorToast } from "../../../utils/toaster";
import socket from "../../../services/socket.service";

const Stats = () => {
  const [stats, setStats] = useState({});

  const [liveCounter, setLiveCounter] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      let res = await api.get("/admin/dashboard/application-stats");

      setStats(res.data.data);

      // Socket.IO event listeners
      socket.on(`user-connected`, handleUserConnect);

      // Clean up the event listeners on component unmount
      return () => {
        socket.off(`user-connected`, handleUserConnect);
      };
    } catch (error) {
      errorToast(error.message || error);
    }
  };

  const handleUserConnect = (data) => {
    setLiveCounter(data.counter);
  };

  return (
    <>
      {stats && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mx-4 mb-4">
          {/* <!-- Card --> */}
          <div className="bg-slate-800 border border-slate-600 rounded-sm shadow-sm p-6">
            <div className="flex-shrink-0">
              <svg
                className="ml-4 mb-3 h-9 w-9 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.15"
                  d="M12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                  fill="currentColor"
                />
                <path
                  d="M3 19H1V18C1 16.1362 2.27477 14.5701 4 14.126M6 10.8293C4.83481 10.4175 4 9.30621 4 7.99999C4 6.69378 4.83481 5.58254 6 5.1707M21 19H23V18C23 16.1362 21.7252 14.5701 20 14.126M18 5.1707C19.1652 5.58254 20 6.69378 20 7.99999C20 9.30621 19.1652 10.4175 18 10.8293M10 14H14C16.2091 14 18 15.7909 18 18V19H6V18C6 15.7909 7.79086 14 10 14ZM15 8C15 9.65685 13.6569 11 12 11C10.3431 11 9 9.65685 9 8C9 6.34315 10.3431 5 12 5C13.6569 5 15 6.34315 15 8Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                {stats?.total_users}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-600 rounded-sm shadow-sm p-6">
            <div className="flex-shrink-0">
              <svg
                fill="currentColor"
                className="ml-4 mb-3 h-9 w-9 text-white"
                viewBox="0 0 24 24"
                version="1.1"
              >
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                  <g fill="currentColor" fillRule="nonzero">
                    <path d="M11.7518706,1.99956021 C13.2716867,1.99956021 14.5037411,3.23161462 14.5037411,4.75143076 L14.5037411,19.2499651 C14.5037411,20.7697812 13.2716867,22.0018356 11.7518706,22.0018356 C10.2320544,22.0018356 9,20.7697812 9,19.2499651 L9,4.75143076 C9,3.23161462 10.2320544,1.99956021 11.7518706,1.99956021 Z M18.7518706,6.99956021 C20.2716867,6.99956021 21.5037411,8.23161462 21.5037411,9.75143076 L21.5037411,19.2499651 C21.5037411,20.7697812 20.2716867,22.0018356 18.7518706,22.0018356 C17.2320544,22.0018356 16,20.7697812 16,19.2499651 L16,9.75143076 C16,8.23161462 17.2320544,6.99956021 18.7518706,6.99956021 Z M4.75187055,11.9995602 C6.27168669,11.9995602 7.5037411,13.2316146 7.5037411,14.7514308 L7.5037411,19.2499651 C7.5037411,20.7697812 6.27168669,22.0018356 4.75187055,22.0018356 C3.23205441,22.0018356 2,20.7697812 2,19.2499651 L2,14.7514308 C2,13.2316146 3.23205441,11.9995602 4.75187055,11.9995602 Z M11.7518706,3.49956021 C11.0604815,3.49956021 10.5,4.06004175 10.5,4.75143076 L10.5,19.2499651 C10.5,19.9413541 11.0604815,20.5018356 11.7518706,20.5018356 C12.4432596,20.5018356 13.0037411,19.9413541 13.0037411,19.2499651 L13.0037411,4.75143076 C13.0037411,4.06004175 12.4432596,3.49956021 11.7518706,3.49956021 Z M18.7518706,8.49956021 C18.0604815,8.49956021 17.5,9.06004175 17.5,9.75143076 L17.5,19.2499651 C17.5,19.9413541 18.0604815,20.5018356 18.7518706,20.5018356 C19.4432596,20.5018356 20.0037411,19.9413541 20.0037411,19.2499651 L20.0037411,9.75143076 C20.0037411,9.06004175 19.4432596,8.49956021 18.7518706,8.49956021 Z M4.75187055,13.4995602 C4.06048154,13.4995602 3.5,14.0600417 3.5,14.7514308 L3.5,19.2499651 C3.5,19.9413541 4.06048154,20.5018356 4.75187055,20.5018356 C5.44325957,20.5018356 6.0037411,19.9413541 6.0037411,19.2499651 L6.0037411,14.7514308 C6.0037411,14.0600417 5.44325957,13.4995602 4.75187055,13.4995602 Z"></path>
                  </g>
                </g>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                Total Polls
              </p>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                {stats?.total_polls}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-600 rounded-sm shadow-sm p-6">
            <div className="flex-shrink-0">
              <svg
                className="ml-4 mb-3 h-9 w-9 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M17 20C17 18.3431 14.7614 17 12 17C9.23858 17 7 18.3431 7 20M21 17.0004C21 15.7702 19.7659 14.7129 18 14.25M3 17.0004C3 15.7702 4.2341 14.7129 6 14.25M18 10.2361C18.6137 9.68679 19 8.8885 19 8C19 6.34315 17.6569 5 16 5C15.2316 5 14.5308 5.28885 14 5.76389M6 10.2361C5.38625 9.68679 5 8.8885 5 8C5 6.34315 6.34315 5 8 5C8.76835 5 9.46924 5.28885 10 5.76389M12 14C10.3431 14 9 12.6569 9 11C9 9.34315 10.3431 8 12 8C13.6569 8 15 9.34315 15 11C15 12.6569 13.6569 14 12 14Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                Total Creators
              </p>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                {stats?.total_creators}
              </p>
            </div>
          </div>
          <div className="bg-slate-800 border border-slate-600 rounded-sm shadow-sm p-6">
            <div className="flex items-center mb-4">
              <div className="inline-flex rounded-full bg-red-500 opacity-50 animate-ping w-7 h-7 ml-1.5 relative">
              </div>
                <div className="rounded-full bg-red-500 absolute w-2 h-2 ml-4"></div>
            </div>
            <div className="ml-4">
              <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                Live Visitors
              </p>
              <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                {liveCounter === 0 ? 0 : liveCounter - 1}
              </p>
            </div>
          </div>
        </div>
      )}

      {!stats && <div>Loading...</div>}
    </>
  );
};

export default Stats;
