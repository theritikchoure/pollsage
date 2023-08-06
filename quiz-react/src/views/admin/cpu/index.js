import React, { useEffect, useState } from "react";
import PageDetails from "../../../components/_page_details";
import { Link } from "react-router-dom";
import { getServerDetails } from "../../../services/admin/cpu.service";
import Tooltip from "../../../components/tooltip";

const CPUHealth = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchServerDetails();
  }, []);

  const fetchServerDetails = async (l, p) => {
    try {
      let res = await getServerDetails(l, p);
      const formattedServerHealth = formatServerHealth(res.data);
      console.log(formattedServerHealth);
      setLogs(formattedServerHealth);
    } catch (error) {
      console.log(error);
    }
  };

  const formatServerHealth = (serverHealth) => {
    return {
      Uptime: `${serverHealth.uptime} seconds`,
      FormattedUptime: formatUptime(serverHealth.uptime),
      "Total Memory": `${(
        serverHealth.totalMemory /
        (1024 * 1024 * 1024)
      ).toFixed(2)} GB`,
      "Free Memory": `${(
        serverHealth.freeMemory /
        (1024 * 1024 * 1024)
      ).toFixed(2)} GB`,
      "Load Average (1min, 5min, 15min)": serverHealth.loadAverage.join(", "),
      "CPU Usage": serverHealth.cpuUsage,
      "Total Cores": serverHealth.totalCores,
      Architecture: serverHealth.architecture,
      Platform: serverHealth.platform,
      Release: serverHealth.release,
      Hostname: serverHealth.hostname,
      "Network Interfaces": serverHealth.networkInterfaces,
      "Temporary Directory": serverHealth.tempDir,
      "Average CPU Usage": `${serverHealth.avgCpuUsage}%`,
    };
  };

  const formatUptime = (seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    seconds %= 24 * 60 * 60;
    const hours = Math.floor(seconds / (60 * 60));
    seconds %= 60 * 60;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  };

  const refreshLogs = () => {
    setLogs([]);
    fetchServerDetails(50, 1);
  };

  return (
    <>
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          CPU Server Health
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3">
          <button
            onClick={fetchServerDetails}
            className="text-green-500 py-2 bg-slate-800 border border-gray-600 px-4 rounded items-center hover:bg-slate-900"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12C3 16.9706 7.02944 21 12 21C14.3051 21 16.4077 20.1334 18 18.7083L21 16M21 12C21 7.02944 16.9706 3 12 3C9.69494 3 7.59227 3.86656 6 5.29168L3 8M21 21V16M21 16H16M3 3V8M3 8H8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* 4 col */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-800 border-2 border-slate-700 p-4">
          <div className="relative group">
            <h2 className="text-slate-100 flex items-center text-lg w-auto">
              Uptime
              <svg
                className="w-4 h-4 ml-2"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M12 17V11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <circle
                  cx="1"
                  cy="1"
                  r="1"
                  transform="matrix(1 0 0 -1 11 9)"
                  fill="#fff"
                />
              </svg>
            </h2>
            <div className="tooltip-text w-full z-100 text-center mb-2 bg-indigo-500 text-white text-sm px-2 py-1 rounded opacity-0 invisible absolute bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-200 ease-in-out group-hover:opacity-100 group-hover:visible">
              {`Continuous Running Time: ${logs["FormattedUptime"]?.days} days, ${logs["FormattedUptime"]?.hours} hours, ${logs["FormattedUptime"]?.minutes} minutes, ${logs["FormattedUptime"]?.seconds} seconds`}
            </div>
          </div>

          <p className="text-slate-200 font-bold text-2xl">{logs["Uptime"]}</p>
        </div>
        <div className="bg-slate-800 border-2 border-slate-700 p-4">
          <h2 className="text-slate-100 text-lg">Total Memory</h2>
          <p className="text-slate-200 font-bold text-2xl">
            {logs["Total Memory"]}
          </p>
        </div>
        <div className="bg-slate-800 border-2 border-slate-700 p-4">
          <h2 className="text-slate-100 text-lg">Total Cores</h2>
          <p className="font-bold text-2xl text-indigo-500">
            {logs["Total Cores"]}
          </p>
        </div>
        <div className="bg-slate-800 border-2 border-slate-700 p-4">
          <h2 className="text-slate-100 text-lg">Average CPU Usage</h2>
          {logs["Average CPU Usage"]?.replace("%", "") > 80 && (
            <p className="font-bold text-2xl text-red-500">
              {logs["Average CPU Usage"]}
            </p>
          )}
          {logs["Average CPU Usage"]?.replace("%", "") > 50 &&
            logs["Average CPU Usage"]?.replace("%", "") < 80 && (
              <p className="font-bold text-2xl text-orange-500">
                {logs["Average CPU Usage"]}
              </p>
            )}
          {logs["Average CPU Usage"]?.replace("%", "") > 20 &&
            logs["Average CPU Usage"]?.replace("%", "") < 50 && (
              <p className="font-bold text-2xl text-yellow-500">
                {logs["Average CPU Usage"]}
              </p>
            )}
          {logs["Average CPU Usage"]?.replace("%", "") < 20 && (
            <p className="font-bold text-2xl text-green-500">
              {logs["Average CPU Usage"]}
            </p>
          )}
        </div>
      </div>

      <div
        class="relative flex items-center text-gray-500 cursor-pointer hover:text-gray-600"
        x-data="{ hover: false }"
      >
        <p>Hover Me</p>
      </div>

      <p className="text-yellow-200 bg-yellow-500 bg-opacity-30 px-2 py-2 rounded text-center mt-2">
        working on it
      </p>
    </>
  );
};

export default CPUHealth;
