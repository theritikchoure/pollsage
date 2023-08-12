import React, { useEffect, useState } from "react";
import PageDetails from "../../../components/_page_details";
import { Link } from "react-router-dom";
import { getLogs } from "../../../services/admin/logs.service";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadLogs(limit, page);
  }, []);

  const loadLogs = async (l, p) => {
    try {
      setPage(p);
      let res = await getLogs(l, p);
      setLogs((prevLogs) => [...prevLogs, ...res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const refreshLogs = () => {
    setLogs([]);
    loadLogs(50, 1);
  }

  return (
    <>
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          API Logs
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3">
          <button onClick={refreshLogs}
          className="text-green-500 bg-slate-800 border border-gray-600 px-3 rounded items-center hover:bg-slate-900">
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
          <div className="relative">
            <button class="bg-slate-800 inline-flex items-center justify-between px-4 py-1.5 border border-gray-600 rounded w-44 min-w-full">
              <span class="flex items-center">
                <input
                  type="date"
                  class="bg-slate-800 text-white text-sm w-32 h-8 focus:border-transparent"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                />
              </span>
            </button>
          </div>
          <button
            class="text-white bg-indigo-500 inline-flex items-center px-6 py-1.5 rounded"
            onClick={() => {
              loadLogs(limit, page + 1);
            }}
          >
            <svg
              class="h-4 w-4 shrink-0 mr-2"
              fill="currentColor"
              viewBox="0 0 32 32"
              version="1.1"
            >
              <g stroke="none" stroke-width="1" fill-rule="evenodd">
                <g
                  id="Icon-Set"
                  transform="translate(-256.000000, -1139.000000)"
                >
                  <path d="M269.46,1163.45 C263.17,1163.45 258.071,1158.44 258.071,1152.25 C258.071,1146.06 263.17,1141.04 269.46,1141.04 C275.75,1141.04 280.85,1146.06 280.85,1152.25 C280.85,1158.44 275.75,1163.45 269.46,1163.45 L269.46,1163.45 Z M287.688,1169.25 L279.429,1161.12 C281.591,1158.77 282.92,1155.67 282.92,1152.25 C282.92,1144.93 276.894,1139 269.46,1139 C262.026,1139 256,1144.93 256,1152.25 C256,1159.56 262.026,1165.49 269.46,1165.49 C272.672,1165.49 275.618,1164.38 277.932,1162.53 L286.224,1170.69 C286.629,1171.09 287.284,1171.09 287.688,1170.69 C288.093,1170.3 288.093,1169.65 287.688,1169.25 L287.688,1169.25 Z"></path>
                </g>
              </g>
            </svg>
            <span class="ml-1">Fetch logs</span>
          </button>
        </div>
      </div>

      <div
        className="border bg-slate-800 px-8 py-4 overflow-y-auto"
        style={{ height: "500px" }}
      >
        {logs && logs.map((log, index) => (
          <p className="py-1" key={index}>
            {`[${log.request_time}] - ${log.method} ${log.url} ${log.status_code} ${log.response_time} ${log.user_info}`}
          </p>
        ))}
      </div>
    </>
  );
};

export default Logs;
