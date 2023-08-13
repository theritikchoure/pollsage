import React, { useEffect, useState } from "react";
import PageDetails from "../../../components/_page_details";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
// } from "recharts";
import api from "../../../services/api.service";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user") || "");

  const [selectedImportOption, setSelectedImportOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedImportOption(option);
  };

  const datas = [
    { name: "January", uv: 400, pv: 2400, amt: 2400 },
    { name: "February", uv: 300, pv: 1398, amt: 2210 },
    { name: "March", uv: 200, pv: 9800, amt: 2290 },
    { name: "April", uv: 278, pv: 3908, amt: 2000 },
    { name: "May", uv: 189, pv: 4800, amt: 2181 },
    { name: "June", uv: 239, pv: 3800, amt: 2500 },
    { name: "July", uv: 349, pv: 4300, amt: 2100 },
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    getTopPageData();
  }, []);

  const getTopPageData = async () => {
    try {
      const res = await api.get("/admin/analytics/toppages");
      let a = [];

      console.log(res.data);

      for (let i = 0; i < res.data.data.length; i++) {
        let page = { name: "", uv: "" };
        page.name = res.data.data[i]._id;
        page.uv = res.data.data[i].count;
        a.push(page);
      }

      console.log(a);

      setData(a);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <PageDetails title={"Admin Dashboard - PollSage"} />

      {/* <BarChart width={150} height={40} data={data}>
      <Tooltip />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart> */}

      {/* <!-- Page Header--> */}
      <div class="mt-6 mx-4 p-6 rounded-sm bg-indigo-500 mb-6">
        {/* <!-- Content --> */}
        <div class="">
          <h1 class="text-slate-800 dark:text-slate-100 font-bold text-2xl">
            Good afternoon, {user?.name || ""}. 👋
          </h1>
          <p class="text-indigo-100">
            Here is what’s happening with your projects today:
          </p>
        </div>
      </div>

      {/* Import data section */}
      <div className="bg-slate-800 p-6 mx-4">
        <h3 className="text-slate-100 font-bold text-2xl mb-4">Import Data</h3>
        <div class="grid grid-cols-2 lg:grid-cols-4">
          <div
            onClick={() => handleOptionClick("User")}
            className={`w-full text-center border ${
              selectedImportOption === "User"
                ? "border-indigo-500"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            User
          </div>
          <div
            onClick={() => handleOptionClick("Creator")}
            className={`w-full text-center border ${
              selectedImportOption === "Creator"
                ? "border-indigo-500"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            Creator
          </div>
          <div
            onClick={() => handleOptionClick("Poll")}
            className={`w-full text-center border ${
              selectedImportOption === "Poll"
                ? "border-indigo-500"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            Poll
          </div>
          <div
            onClick={() => handleOptionClick("Something")}
            className={`w-full text-center border ${
              selectedImportOption === "Something"
                ? "border-indigo-500"
                : "border-gray-600"
            } py-1 hover:border-indigo-500 cursor-pointer`}
          >
            Something
          </div>
        </div>
        {selectedImportOption && (
          <div className="mt-5">
            <div className="bg-orange-400 border border-orange-500 py-3 px-2 text-white rounded mb-4">
              Warning: Please ensure that you are selecting a file with valid
              data. Any validation failure can have a significant impact on the
              database and the existing data. Make sure to review the file
              content carefully before proceeding with the restoration process.
            </div>
            <div className="bg-slate-900 p-7 mt-4">
              <div className="border border-dashed h-32">
                {/* file upload input*/}
                <div className="relative flex flex-col items-center justify-center h-full">
                  <svg
                    className="w-8 h-8 text-gray-400 hover:text-indigo-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.2647 15.9377L12.5473 14.2346C11.758 13.4519 11.3633 13.0605 10.9089 12.9137C10.5092 12.7845 10.079 12.7845 9.67922 12.9137C9.22485 13.0605 8.83017 13.4519 8.04082 14.2346L4.04193 18.2622M14.2647 15.9377L14.606 15.5991C15.412 14.7999 15.8149 14.4003 16.2773 14.2545C16.6839 14.1262 17.1208 14.1312 17.5244 14.2688C17.9832 14.4253 18.3769 14.834 19.1642 15.6515L20 16.5001M14.2647 15.9377L18.22 19.9628M18.22 19.9628C17.8703 20 17.4213 20 16.8 20H7.2C6.07989 20 5.51984 20 5.09202 19.782C4.7157 19.5903 4.40973 19.2843 4.21799 18.908C4.12583 18.7271 4.07264 18.5226 4.04193 18.2622M18.22 19.9628C18.5007 19.9329 18.7175 19.8791 18.908 19.782C19.2843 19.5903 19.5903 19.2843 19.782 18.908C20 18.4802 20 17.9201 20 16.8V13M11 4H7.2C6.07989 4 5.51984 4 5.09202 4.21799C4.7157 4.40973 4.40973 4.71569 4.21799 5.09202C4 5.51984 4 6.0799 4 7.2V16.8C4 17.4466 4 17.9066 4.04193 18.2622M18 9V6M18 6V3M18 6H21M18 6H15"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <p className="mt-1 text-sm text-gray-600">
                    <span>Drag and drop</span> files here or{" "}
                    <span className="text-indigo-500 hover:underline cursor-pointer">
                      select a file
                    </span>{" "}
                    from your computer
                  </p>
                  <input
                    type="file"
                    className="absolute inset-0 z-50 w-full h-full outline-none opacity-0 cursor-pointer"
                  />
                </div>

                {/* upload button */}
              </div>
              <div className="flex items-center justify-center mt-6">
                <button className="px-5 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-md">
                  Import {selectedImportOption}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
        {/* <!-- Social Traffic --> */}
        <div class="relative flex flex-col min-w-0 mb-4 lg:mb-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">
                  Social Traffic
                </h3>
              </div>
              <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  class="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
            <div class="block w-full overflow-x-auto">
              <table class="items-center w-full bg-transparent border-collapse">
                <thead>
                  <tr>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Referral
                    </th>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Visitors
                    </th>
                    <th class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Facebook
                    </th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      5,480
                    </td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center">
                        <span class="mr-2">70%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: "70%" }}
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Twitter
                    </th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      3,380
                    </td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center">
                        <span class="mr-2">40%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: "40%" }}
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Instagram
                    </th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      4,105
                    </td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center">
                        <span class="mr-2">45%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-pink-200">
                            <div
                              style={{ width: "45%" }}
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-pink-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Google
                    </th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      4,985
                    </td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center">
                        <span class="mr-2">60%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                            <div
                              style={{ width: "60%" }}
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="text-gray-700 dark:text-gray-100">
                    <th class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      Linkedin
                    </th>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      2,250
                    </td>
                    <td class="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <div class="flex items-center">
                        <span class="mr-2">30%</span>
                        <div class="relative w-full">
                          <div class="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                            <div
                              style={{ width: "30%" }}
                              class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-700"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {/* <!-- ./Social Traffic --> */}

        {/* <!-- Recent Activities --> */}
        <div class="relative flex flex-col min-w-0 break-words bg-gray-50 dark:bg-gray-800 w-full shadow-lg rounded">
          <div class="rounded-t mb-0 px-0 border-0">
            <div class="flex flex-wrap items-center px-4 py-2">
              <div class="relative w-full max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-gray-900 dark:text-gray-50">
                  Recent Activities
                </h3>
              </div>
              <div class="relative w-full max-w-full flex-grow flex-1 text-right">
                <button
                  class="bg-blue-500 dark:bg-gray-100 text-white active:bg-blue-600 dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </div>
            </div>
            <div class="block w-full">
              <div class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Today
              </div>
              <ul class="my-1">
                <li class="flex px-4">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 bg-indigo-500 my-2 mr-3">
                    <svg
                      class="w-9 h-9 fill-current text-indigo-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M18 10c-4.4 0-8 3.1-8 7s3.6 7 8 7h.6l5.4 2v-4.4c1.2-1.2 2-2.8 2-4.6 0-3.9-3.6-7-8-7zm4 10.8v2.3L18.9 22H18c-3.3 0-6-2.2-6-5s2.7-5 6-5 6 2.2 6 5c0 2.2-2 3.8-2 3.8z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow flex items-center border-b border-gray-100 dark:border-gray-400 text-sm text-gray-600 dark:text-gray-100 py-2">
                    <div class="flex-grow flex justify-between items-center">
                      <div class="self-center">
                        <a
                          class="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          Nick Mark
                        </a>{" "}
                        mentioned{" "}
                        <a
                          class="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          Sara Smith
                        </a>{" "}
                        in a new post
                      </div>
                      <div class="flex-shrink-0 ml-2">
                        <a
                          class="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          View
                          <span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="transform transition-transform duration-500 ease-in-out"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="flex px-4">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 bg-red-500 my-2 mr-3">
                    <svg
                      class="w-9 h-9 fill-current text-red-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M25 24H11a1 1 0 01-1-1v-5h2v4h12v-4h2v5a1 1 0 01-1 1zM14 13h8v2h-8z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                    <div class="flex-grow flex justify-between items-center">
                      <div class="self-center">
                        The post{" "}
                        <a
                          class="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          Post Name
                        </a>{" "}
                        was removed by{" "}
                        <a
                          class="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          Nick Mark
                        </a>
                      </div>
                      <div class="flex-shrink-0 ml-2">
                        <a
                          class="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          View
                          <span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="transform transition-transform duration-500 ease-in-out"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="px-4 bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Yesterday
              </div>
              <ul class="my-1">
                <li class="flex px-4">
                  <div class="w-9 h-9 rounded-full flex-shrink-0 bg-green-500 my-2 mr-3">
                    <svg
                      class="w-9 h-9 fill-current text-light-blue-50"
                      viewBox="0 0 36 36"
                    >
                      <path d="M23 11v2.085c-2.841.401-4.41 2.462-5.8 4.315-1.449 1.932-2.7 3.6-5.2 3.6h-1v2h1c3.5 0 5.253-2.338 6.8-4.4 1.449-1.932 2.7-3.6 5.2-3.6h3l-4-4zM15.406 16.455c.066-.087.125-.162.194-.254.314-.419.656-.872 1.033-1.33C15.475 13.802 14.038 13 12 13h-1v2h1c1.471 0 2.505.586 3.406 1.455zM24 21c-1.471 0-2.505-.586-3.406-1.455-.066.087-.125.162-.194.254-.316.422-.656.873-1.028 1.328.959.878 2.108 1.573 3.628 1.788V25l4-4h-3z"></path>
                    </svg>
                  </div>
                  <div class="flex-grow flex items-center border-gray-100 text-sm text-gray-600 dark:text-gray-50 py-2">
                    <div class="flex-grow flex justify-between items-center">
                      <div class="self-center">
                        <a
                          class="font-medium text-gray-800 hover:text-gray-900 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          240+
                        </a>{" "}
                        users have subscribed to{" "}
                        <a
                          class="font-medium text-gray-800 dark:text-gray-50 dark:hover:text-gray-100"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          Newsletter #1
                        </a>
                      </div>
                      <div class="flex-shrink-0 ml-2">
                        <a
                          class="flex items-center font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500"
                          href="#0"
                          style={{ outline: "none" }}
                        >
                          View
                          <span>
                            <svg
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              class="transform transition-transform duration-500 ease-in-out"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* <!-- ./Recent Activities --> */}
      </div>

      {/* <!-- Task Summaries --> */}
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 p-4 gap-4 text-black dark:text-white">
        <div class="md:col-span-2 xl:col-span-3">
          <h3 class="text-lg font-semibold">
            Task summaries of recent sprints
          </h3>
        </div>
        <div class="md:col-span-2 xl:col-span-1">
          <div class="rounded bg-gray-200 dark:bg-gray-800 p-3">
            <div class="flex justify-between py-1 text-black dark:text-white">
              <h3 class="text-sm font-semibold">Tasks in TO DO</h3>
              <svg
                class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div class="text-sm text-black dark:text-gray-50 mt-2">
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Delete all references from the wiki
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Remove analytics code
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Do a mobile first layout
                <div class="text-gray-500 dark:text-gray-200 mt-2 ml-2 flex justify-between items-start">
                  <span class="text-xs flex items-center">
                    <svg
                      class="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    3/5
                  </span>
                  <img
                    src="https://i.imgur.com/OZaT7jl.png"
                    class="rounded-full"
                  />
                </div>
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Check the meta tags
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Think more tasks for this example
                <div class="text-gray-500 dark:text-gray-200 mt-2 ml-2 flex justify-between items-start">
                  <span class="text-xs flex items-center">
                    <svg
                      class="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p class="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
            </div>
          </div>
        </div>
        <div>
          <div class="rounded bg-gray-200 dark:bg-gray-800 p-3">
            <div class="flex justify-between py-1 text-black dark:text-white">
              <h3 class="text-sm font-semibold">Tasks in DEVELOPMENT</h3>
              <svg
                class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div class="text-sm text-black dark:text-gray-50 mt-2">
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Delete all references from the wiki
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Remove analytics code
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Do a mobile first layout
                <div class="flex justify-between items-start mt-2 ml-2 text-white text-xs">
                  <span class="bg-pink-600 rounded p-1 text-xs flex items-center">
                    <svg
                      class="h-4 fill-current"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2c-.8 0-1.5.7-1.5 1.5v.688C7.344 4.87 5 7.62 5 11v4.5l-2 2.313V19h18v-1.188L19 15.5V11c0-3.379-2.344-6.129-5.5-6.813V3.5c0-.8-.7-1.5-1.5-1.5zm-2 18c0 1.102.898 2 2 2 1.102 0 2-.898 2-2z" />
                    </svg>
                    2
                  </span>
                </div>
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Check the meta tags
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Think more tasks for this example
                <div class="text-gray-500 mt-2 ml-2 flex justify-between items-start">
                  <span class="text-xs flex items-center">
                    <svg
                      class="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p class="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
            </div>
          </div>
        </div>
        <div>
          <div class="rounded bg-gray-200 dark:bg-gray-800 p-3">
            <div class="flex justify-between py-1 text-black dark:text-white">
              <h3 class="text-sm font-semibold">Tasks in QA</h3>
              <svg
                class="h-4 fill-current text-gray-600 dark:text-gray-500 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5 10a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4zm7 0a1.999 1.999 0 1 0 0 4 1.999 1.999 0 1 0 0-4z" />
              </svg>
            </div>
            <div class="text-sm text-black dark:text-gray-50 mt-2">
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Delete all references from the wiki
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Remove analytics code
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Do a mobile first layout
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Check the meta tags
              </div>
              <div class="bg-white dark:bg-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 p-2 rounded mt-1 border-b border-gray-100 dark:border-gray-900 cursor-pointer">
                Think more tasks for this example
                <div class="text-gray-500 dark:text-gray-200 mt-2 ml-2 flex justify-between items-start">
                  <span class="text-xs flex items-center">
                    <svg
                      class="h-4 fill-current mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 50 50"
                    >
                      <path d="M11 4c-3.855 0-7 3.145-7 7v28c0 3.855 3.145 7 7 7h28c3.855 0 7-3.145 7-7V11c0-3.855-3.145-7-7-7zm0 2h28c2.773 0 5 2.227 5 5v28c0 2.773-2.227 5-5 5H11c-2.773 0-5-2.227-5-5V11c0-2.773 2.227-5 5-5zm25.234 9.832l-13.32 15.723-8.133-7.586-1.363 1.465 9.664 9.015 14.684-17.324z" />
                    </svg>
                    0/3
                  </span>
                </div>
              </div>
              <p class="mt-3 text-gray-600 dark:text-gray-400">Add a card...</p>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- ./Task Summaries --> */}

      {/* <!-- Client Table --> */}
      <div class="mt-4 mx-4">
        <div class="w-full overflow-hidden rounded-lg shadow-xs">
          <div class="w-full overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th class="px-4 py-3">Client</th>
                  <th class="px-4 py-3">Amount</th>
                  <th class="px-4 py-3">Status</th>
                  <th class="px-4 py-3">Date</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">Hans Burger</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          10x Developer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">$855.85</td>
                  <td class="px-4 py-3 text-xs">
                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      {" "}
                      Approved{" "}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">15-01-2021</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">Jolina Angelie</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          Unemployed
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">$369.75</td>
                  <td class="px-4 py-3 text-xs">
                    <span class="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                      {" "}
                      Pending{" "}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">23-03-2021</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">Dave Li</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          Influencer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">$775.45</td>
                  <td class="px-4 py-3 text-xs">
                    <span class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                      {" "}
                      Expired{" "}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">09-02-2021</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">Rulia Joberts</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          Actress
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">$1276.75</td>
                  <td class="px-4 py-3 text-xs">
                    <span class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                      {" "}
                      Approved{" "}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">17-04-2021</td>
                </tr>
                <tr class="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                  <td class="px-4 py-3">
                    <div class="flex items-center text-sm">
                      <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          class="object-cover w-full h-full rounded-full"
                          src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                          alt=""
                          loading="lazy"
                        />
                        <div
                          class="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p class="font-semibold">Hitney Wouston</p>
                        <p class="text-xs text-gray-600 dark:text-gray-400">
                          Singer
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">$863.45</td>
                  <td class="px-4 py-3 text-xs">
                    <span class="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                      {" "}
                      Denied{" "}
                    </span>
                  </td>
                  <td class="px-4 py-3 text-sm">11-01-2021</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
            <span class="flex items-center col-span-3">
              {" "}
              Showing 21-30 of 100{" "}
            </span>
            <span class="col-span-2"></span>
            {/* <!-- Pagination --> */}
            <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
              <nav aria-label="Table navigation">
                <ul class="inline-flex items-center">
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Previous"
                    >
                      <svg
                        aria-hidden="true"
                        class="w-4 h-4 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      1
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      2
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                      3
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      4
                    </button>
                  </li>
                  <li>
                    <span class="px-3 py-1">...</span>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      8
                    </button>
                  </li>
                  <li>
                    <button class="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                      9
                    </button>
                  </li>
                  <li>
                    <button
                      class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                      aria-label="Next"
                    >
                      <svg
                        class="w-4 h-4 fill-current"
                        aria-hidden="true"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clip-rule="evenodd"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>
      {/* <!-- ./Client Table --> */}

      {/* <!-- Contact Form --> */}
      <div class="mt-8 mx-4">
        <div class="grid grid-cols-1 md:grid-cols-2">
          <div class="p-6 mr-2 bg-gray-100 dark:bg-gray-800 sm:rounded-lg">
            <h1 class="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
              Get in touch
            </h1>
            <p class="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
              Fill in the form to submit any query
            </p>

            <div class="flex items-center mt-8 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div class="ml-4 text-md tracking-wide font-semibold w-40">
                Dhaka, Street, State, Postal Code
              </div>
            </div>

            <div class="flex items-center mt-4 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div class="ml-4 text-md tracking-wide font-semibold w-40">
                +880 1234567890
              </div>
            </div>

            <div class="flex items-center mt-4 text-gray-600 dark:text-gray-400">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                class="w-8 h-8 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <div class="ml-4 text-md tracking-wide font-semibold w-40">
                info@demo.com
              </div>
            </div>
          </div>
          <form class="p-6 flex flex-col justify-center">
            <div class="flex flex-col">
              <label for="name" class="hidden">
                Full Name
              </label>
              <input
                type="name"
                name="name"
                id="name"
                placeholder="Full Name"
                class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div class="flex flex-col mt-2">
              <label for="email" class="hidden">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div class="flex flex-col mt-2">
              <label for="tel" class="hidden">
                Number
              </label>
              <input
                type="tel"
                name="tel"
                id="tel"
                placeholder="Telephone Number"
                class="w-100 mt-2 py-3 px-3 rounded-lg bg-white dark:bg-gray-800 border border-gray-400 dark:border-gray-700 text-gray-800 dark:text-gray-50 font-semibold focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              class="md:w-32 bg-blue-600 dark:bg-gray-100 text-white dark:text-gray-800 font-bold py-3 px-6 rounded-lg mt-4 hover:bg-blue-500 dark:hover:bg-gray-200 transition ease-in-out duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      {/* <!-- ./Contact Form --> */}

      {/* <!-- External resources --> */}
      <div class="mt-8 mx-4">
        <div class="p-4 bg-blue-50 dark:bg-gray-800 dark:text-gray-50 border border-blue-500 dark:border-gray-500 rounded-lg shadow-md">
          <h4 class="text-lg font-semibold">
            Have taken ideas & reused components from the following resources:
          </h4>
          <ul>
            <li class="mt-3">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://tailwindcomponents.com/component/sidebar-navigation-1"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Sidebar Navigation</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://tailwindcomponents.com/component/contact-form-1"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Contact Form</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://tailwindcomponents.com/component/trello-panel-clone"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Section: Task Summaries</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://windmill-dashboard.vercel.app/"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Section: Client Table</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://demos.creative-tim.com/notus-js/pages/admin/dashboard.html"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Section: Social Traffic</span>
              </a>
            </li>
            <li class="mt-2">
              <a
                class="flex items-center text-blue-700 dark:text-gray-100"
                href="https://mosaic.cruip.com"
                target="_blank"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  class="transform transition-transform duration-500 ease-in-out"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span class="inline-flex pl-2">Section: Recent Activities</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- ./External resources --> */}
    </>
  );
};

export default Dashboard;
