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
  const [data, setData] = useState([]);

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
      console.log(res.data);

      res.data.data.urlStats.sort((a, b) => {
        console.log(a.totalVisits, b.totalVisits);
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
      <PageDetails title="Poll list - PollSage" description="Create Poll" />
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
          Website Analytics ✨
        </h1>
        <div className="grid auto-cols-max justify-end grid-flow-col gap-3"></div>
      </div>

      <WorkingOnIt />

      {data && (
        <>
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
            <div className="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-slate-800 w-full shadow-lg rounded">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-4 py-2">
                  <div className="relative w-full max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-gray-900 dark:text-gray-50">
                      Most Visited Pages
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
                  <table className="items-center w-full bg-transparent border-collapse px-4">
                    <thead>
                      <tr>
                        <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Referral
                        </th>
                        <th className="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-right">
                          Visitors
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.mostVisitedPages?.map((page) => (
                        <tr className="text-gray-700 dark:text-gray-100">
                          <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                            {page?._id}
                          </th>
                          <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
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
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg rounded">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-4 py-2 border-b border-solid border-gray-200">
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
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg rounded">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-4 py-2 border-b border-solid border-gray-200">
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
            <div className="relative flex flex-col min-w-0 break-words bg-slate-800 w-full shadow-lg rounded">
              <div className="rounded-t mb-0 px-0 border-0">
                <div className="flex flex-wrap items-center px-4 py-2 border-b border-solid border-gray-200">
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

          <div className="relative flex flex-col min-w-0 mb-4 mt-4 lg:mb-0 break-words bg-slate-800 w-full shadow-lg rounded">
            <div className="rounded-t mb-0 px-0 border-0">
              <div className="flex flex-wrap items-center px-4 py-2">
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
                    {data?.urlStats?.slice(0, visibleUrlStats).map((page, index) => (
                      <tr className="text-gray-700 dark:text-gray-100 border-y hover:bg-slate-900 cursor-pointer">
                        <th className="px-7 w-1 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          {index+1}
                        </th>
                        <th className="px-7 align-middle text-sm font-normal whitespace-nowrap p-4 text-left">
                          <a
                            href={`${page?._id}`}
                            target="_blank"
                            className="text-indigo-500 hover:text-indigo-600"
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
                        <td colSpan="3" className="text-center py-4 bg-slate-900 border border-t-0">
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
