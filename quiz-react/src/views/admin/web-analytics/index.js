import React, { useEffect, useState } from "react";
import PageDetails from "../../../components/_page_details";
import api from "../../../services/api.service";

import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Cell,
  ComposedChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
  Area,
} from "recharts";

import WorkingOnIt from "../../../components/_working_on_it";

const COLORS = [
  "#8884d8",
  "#83a6ed",
  "#8dd1e1",
  "#82ca9d",
  "#a4de6c",
  "#d0ed57",
];

const WebAnalytics = () => {
  const [data, setData] = useState(null);

  const [visibleUrlStats, setVisibleUrlStats] = useState(10);

  const handleLoadMore = () => {
    setVisibleUrlStats((prevVisibleUrlStats) => prevVisibleUrlStats + 10);
  };

  useEffect(() => {
    getTopPageData();
  }, []);

  const getTopPageData = async () => {
    try {
      const res = await api.get("/admin/analytics/toppages");

      res.data.data.urlStats.sort((a, b) => {
        return b.totalVisits - a.totalVisits;
      });

      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload?.payload; // Assuming the data point is an object
      console.log(data);
      return (
        <div className="custom-tooltip bg-white px-3 py-2">
          <p className="text-black">{`${data._id} : ${data.totalVisits}`}</p>
        </div>
      );
    }

    return null;
  };

  const ChartCustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip bg-white text-black px-2 py-2 border">
          <p>{data._id}</p>
          <p className="text-success">Page views: {data.totalVisits}</p>
        </div>
      );
    }
    return null;
  };

  const rearrangeUrlStats = (action) => {
    data.urlStats.reverse();

    setData({ ...data });
  };

  return (
    <>
      <PageDetails
        title="Website Analytics"
        description="Website Analytic - PollSage"
      />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          Website Analytics ✨
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3"></div>
      </div>

      <WorkingOnIt />

      {data && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
            {/* <!-- Card --> */}
            <div className="border border-slate-600 rounded-sm shadow-sm p-6">
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
                  Total Visits
                </p>
                <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                  {data.sessionStats?.totalVisits}
                </p>
              </div>
            </div>
            <div className="border border-slate-600 rounded-sm shadow-sm p-6">
              <div className="flex-shrink-0">
                <svg
                  fill="currentColor"
                  className="ml-4 mb-3 h-9 w-9 text-white"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g fill="currentColor" fillRule="nonzero">
                      <path d="M11.7518706,1.99956021 C13.2716867,1.99956021 14.5037411,3.23161462 14.5037411,4.75143076 L14.5037411,19.2499651 C14.5037411,20.7697812 13.2716867,22.0018356 11.7518706,22.0018356 C10.2320544,22.0018356 9,20.7697812 9,19.2499651 L9,4.75143076 C9,3.23161462 10.2320544,1.99956021 11.7518706,1.99956021 Z M18.7518706,6.99956021 C20.2716867,6.99956021 21.5037411,8.23161462 21.5037411,9.75143076 L21.5037411,19.2499651 C21.5037411,20.7697812 20.2716867,22.0018356 18.7518706,22.0018356 C17.2320544,22.0018356 16,20.7697812 16,19.2499651 L16,9.75143076 C16,8.23161462 17.2320544,6.99956021 18.7518706,6.99956021 Z M4.75187055,11.9995602 C6.27168669,11.9995602 7.5037411,13.2316146 7.5037411,14.7514308 L7.5037411,19.2499651 C7.5037411,20.7697812 6.27168669,22.0018356 4.75187055,22.0018356 C3.23205441,22.0018356 2,20.7697812 2,19.2499651 L2,14.7514308 C2,13.2316146 3.23205441,11.9995602 4.75187055,11.9995602 Z M11.7518706,3.49956021 C11.0604815,3.49956021 10.5,4.06004175 10.5,4.75143076 L10.5,19.2499651 C10.5,19.9413541 11.0604815,20.5018356 11.7518706,20.5018356 C12.4432596,20.5018356 13.0037411,19.9413541 13.0037411,19.2499651 L13.0037411,4.75143076 C13.0037411,4.06004175 12.4432596,3.49956021 11.7518706,3.49956021 Z M18.7518706,8.49956021 C18.0604815,8.49956021 17.5,9.06004175 17.5,9.75143076 L17.5,19.2499651 C17.5,19.9413541 18.0604815,20.5018356 18.7518706,20.5018356 C19.4432596,20.5018356 20.0037411,19.9413541 20.0037411,19.2499651 L20.0037411,9.75143076 C20.0037411,9.06004175 19.4432596,8.49956021 18.7518706,8.49956021 Z M4.75187055,13.4995602 C4.06048154,13.4995602 3.5,14.0600417 3.5,14.7514308 L3.5,19.2499651 C3.5,19.9413541 4.06048154,20.5018356 4.75187055,20.5018356 C5.44325957,20.5018356 6.0037411,19.9413541 6.0037411,19.2499651 L6.0037411,14.7514308 C6.0037411,14.0600417 5.44325957,13.4995602 4.75187055,13.4995602 Z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400">
                  Total Sessions
                </p>
                <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                  {data.sessionStats?.totalSessions}
                </p>
              </div>
            </div>
            <div className="border border-slate-600 rounded-sm shadow-sm p-6">
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
                  Avg. Visits per Session
                </p>
                <p className="text-3xl font-bold text-gray-700 dark:text-gray-200">
                  {data.sessionStats?.averageVisitsPerSession}
                </p>
              </div>
            </div>
          </div>

          <div className="my-5">
            <h2 className="text-lg mb-7 font-bold">
              Date-wise Page Views in the Last 30 Days
            </h2>
            <ResponsiveContainer height={300}>
              <ComposedChart data={data?.pageViews}>
                <XAxis dataKey="_id" />
                <Area
                  type="monotone"
                  dataKey="totalVisits"
                  fill="#6366f1"
                  stroke="#6366f1"
                />
                <Tooltip content={<ChartCustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="totalVisits"
                  strokeWidth="3"
                  stroke="#ffffff"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* <!-- Social Traffic --> */}
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-slate-800 border border-slate-600 w-full shadow-lg">
              <div className="mb-0 px-0 border-slate-600">
                <div className="flex flex-wrap items-center px-5 py-4">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                      Most Visited Pages
                    </h3>
                  </div>
                  <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                    <button
                      className="bg-indigo-500 cursor-pointer text-xs font-bold uppercase px-3 py-1 rounded-sm mr-1 mb-1 hover:bg-indigo-600"
                      type="button"
                    >
                      See all
                    </button>
                  </div>
                </div>
                <div className="block w-full overflow-x-auto">
                  <table className="items-center w-full bg-transparent border-collapse px-5">
                    <thead>
                      <tr>
                        <th className="px-4 bg-slate-900 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Referral
                        </th>
                        <th className="px-4 bg-slate-900 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right">
                          Visitors
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.mostVisitedPages?.map((page, index) => (
                        <tr className="text-gray-700 dark:text-gray-100" key={index}>
                          <th className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {page?._id}
                          </th>
                          <td className="border-t-0 px-5 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                            {page?.totalVisits}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* <!-- ./Social Traffic --> */}

            {/* <!-- Recent Activities --> */}
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg border border-slate-600">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-5 py-4 border-b border-solid border-slate-600">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                      Source Stats
                    </h3>
                  </div>
                </div>
                {data.sourceStats && (
                  <ResponsiveContainer width="100%" height={290}>
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="totalVisits"
                        isAnimationActive={false}
                        data={data.sourceStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.sourceStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            {/* <!-- ./Recent Activities --> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            {/* <!-- Recent Activities --> */}
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg border border-slate-600">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-5 py-4 border-b border-solid border-slate-600">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                      Country wise stats
                    </h3>
                  </div>
                </div>
                {data.geo_location?.countryStats && (
                  <ResponsiveContainer width="100%" height={290}>
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="totalVisits"
                        isAnimationActive={false}
                        data={data.geo_location?.countryStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.geo_location?.countryStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            {/* <!-- ./Recent Activities --> */}

            {/* <!-- Recent Activities --> */}
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg border border-slate-600">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-5 py-4 border-b border-solid border-slate-600">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                      Timezone wise stats
                    </h3>
                  </div>
                </div>
                {data.geo_location?.timezoneStats && (
                  <ResponsiveContainer width="100%" height={290}>
                    <PieChart width={400} height={400}>
                      <Pie
                        dataKey="totalVisits"
                        isAnimationActive={false}
                        data={data.geo_location?.timezoneStats}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      >
                        {data.geo_location?.timezoneStats.map(
                          (entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          )
                        )}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            {/* <!-- ./Recent Activities --> */}
          </div>

          <div className="relative flex flex-col min-w-0 mb-4 mt-4 lg:mb-0 break-words bg-slate-800 w-full shadow-lg border border-slate-600">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex flex-wrap items-center px-5 py-4">
                <div className="relative w-full max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                    URL Stats
                  </h3>
                </div>
                <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    See all
                  </button>
                </div>
              </div>
              <div className="block w-full overflow-x-auto">
                <table className="items-center w-full bg-transparent border-collapse px-7">
                  <thead>
                    <tr>
                      <th className="px-7 bg-gray-600 text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-7 bg-gray-600 text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        URL
                      </th>
                      <th
                        onClick={() => rearrangeUrlStats("asc")}
                        className="px-7 cursor-pointer bg-gray-600 text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right"
                      >
                        Page Views
                        <svg
                          className="w-4 h-4 inline-block items-center ml-1 text-gray-500 dark:text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.70711 16.1359C5.31659 16.5264 5.31659 17.1596 5.70711 17.5501L10.5993 22.4375C11.3805 23.2179 12.6463 23.2176 13.4271 22.4369L18.3174 17.5465C18.708 17.156 18.708 16.5228 18.3174 16.1323C17.9269 15.7418 17.2937 15.7418 16.9032 16.1323L12.7176 20.3179C12.3271 20.7085 11.6939 20.7085 11.3034 20.3179L7.12132 16.1359C6.7308 15.7454 6.09763 15.7454 5.70711 16.1359Z"
                            fill="currentColor"
                          />
                          <path
                            d="M18.3174 7.88675C18.708 7.49623 18.708 6.86307 18.3174 6.47254L13.4252 1.58509C12.644 0.804698 11.3783 0.805008 10.5975 1.58579L5.70711 6.47615C5.31658 6.86667 5.31658 7.49984 5.70711 7.89036C6.09763 8.28089 6.7308 8.28089 7.12132 7.89036L11.307 3.70472C11.6975 3.31419 12.3307 3.31419 12.7212 3.70472L16.9032 7.88675C17.2937 8.27728 17.9269 8.27728 18.3174 7.88675Z"
                            fill="currentColor"
                          />
                        </svg>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.urlStats
                      ?.slice(0, visibleUrlStats)
                      .map((page, index) => (
                        <tr className="text-gray-700 dark:text-gray-100 border-y hover:bg-slate-900 cursor-pointer" key={index}>
                          <th className="px-7 w-1 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            {index + 1}
                          </th>
                          <th className="px-7 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                            <a
                              href={`${page?._id}`}
                              target="_blank"
                              className="text-indigo-500 hover:text-indigo-600"
                              rel="noopener noreferrer"
                            >
                              {page?._id}
                            </a>
                          </th>
                          <td className="px-7 align-middle text-sm whitespace-nowrap p-4 text-right">
                            {page?.totalVisits}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  {data?.urlStats?.length > visibleUrlStats && (
                    <tfoot>
                      <tr>
                        <td
                          colSpan="3"
                          className="text-center py-4 bg-slate-900 border border-t-0"
                        >
                          <button
                            className="text-indigo-500 hover:text-indigo-600 cursor-pointer"
                            onClick={handleLoadMore}
                          >
                            Load More
                          </button>
                        </td>
                      </tr>
                    </tfoot>
                  )}
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {!data && (
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                Loading...
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WebAnalytics;
