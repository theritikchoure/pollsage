import React, { useState } from "react";
import { logout } from "../../services/creator_auth.service";
import { successToast } from "../../utils/toaster";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [toggleSb, setToggleSb] = useState(false);

  const toggleSidebar = () => {
    const sidebar = document.getElementById("sidebar-multi-level-sidebar");
    sidebar.classList.toggle("-translate-x-full");
    setToggleSb(!toggleSb);
  };

  const toggleDropdown = (event) => {
    const dropdown = event.currentTarget.nextElementSibling;
    dropdown.classList.toggle("hidden");
  };

  const handleLogout = () => {
    logout();
    successToast("Logged out successfully");
    navigate("/");
  };

  const handleSubMenu = (event) => {
    const dropdown = event.currentTarget.nextElementSibling;
    dropdown.classList.toggle("hidden");
  };

  return (
    <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-gray-100 h-full text-black transition-all duration-300 border-none z-40 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul className="flex flex-col py-4 space-y-1">
          <li className="px-5 hidden md:block border-b pb-5 mb-5">
            <Link
              to="/"
              className="text-lg font-semibold tracking-widest text-black uppercase rounded-lg focus:outline-none focus:shadow-outline"
            >
              PollSage
            </Link>
          </li>
          <li className="px-5 md:hidden">
            <Link to="/" className="flex flex-row items-center h-8">
              <img src="/logo.png" alt="" className="w-5 h-5 mx-auto" />
            </Link>
          </li>
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Menu
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/creator/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  ></path>
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="void:javascript()"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3" y2="6" />
                  <line x1="3" y1="12" x2="3" y2="12" />
                  <line x1="3" y1="18" x2="3" y2="18" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Polls</span>
              <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide">
                <svg
                  className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 false"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                </svg>
              </span>
            </a>

            {/* create submenu and consider the overall style */}
            <ul className="hidden flex flex-col py-2 space-y-1">
              <li className="">
                <Link
                  to={"/creator/polls"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  List/All Polls
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/polls/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Add Poll
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to={"/creator/activity"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-4 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {" "}
                  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />{" "}
                  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />{" "}
                  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Activity
              </span>
            </Link>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="void:javascript()"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  stroke="currentColor"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
                    fill="white"
                  ></path>{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Email system
              </span>
              <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide">
                <svg
                  className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 false"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                </svg>
              </span>
            </a>

            {/* create submenu and consider the overall style */}
            <ul className="hidden flex flex-col py-2 space-y-1">
              <li className="">
                <Link
                  to={"/creator/emails/template/list"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Email templates
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/emails/template/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Create templates
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="#"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-collection"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M2.5 3.5a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-11zm2-2a.5.5 0 0 1 0-1h7a.5.5 0 0 1 0 1h-7zM0 13a1.5 1.5 0 0 0 1.5 1.5h13A1.5 1.5 0 0 0 16 13V6a1.5 1.5 0 0 0-1.5-1.5h-13A1.5 1.5 0 0 0 0 6v7zm1.5.5A.5.5 0 0 1 1 13V6a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-13z" />{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Poll themes
              </span>
              <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide">
                <svg
                  className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 false"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                </svg>
              </span>
            </a>

            {/* create submenu and consider the overall style */}
            <ul className="hidden flex flex-col py-2 space-y-1">
              <li className="">
                <a
                  href="#"
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Themes
                </a>
              </li>
              <li className="">
                <Link
                  to={"/creator/themes/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Create theme
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="void:javascript()"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Settings
              </span>
              <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide">
                <svg
                  className="w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 false"
                  viewBox="0 0 12 12"
                >
                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z"></path>
                </svg>
              </span>
            </a>

            {/* create submenu and consider the overall style */}
            <ul className="hidden flex flex-col py-2 space-y-1">
              <li className="">
                <Link
                  to={"/creator/settings/account"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  My Account
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/emails/template/create"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  My Notifications
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/settings/feedback"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
                >
                  {" "}
                  Give Feedback
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-right"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path
                    fillRule="evenodd"
                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
                  />{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Logout
              </span>
            </button>
          </li>
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-500 uppercase">
                Others
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/creator/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10.4V20M12 10.4C12 8.15979 12 7.03969 11.564 6.18404C11.1805 5.43139 10.5686 4.81947 9.81596 4.43597C8.96031 4 7.84021 4 5.6 4H4.6C4.03995 4 3.75992 4 3.54601 4.10899C3.35785 4.20487 3.20487 4.35785 3.10899 4.54601C3 4.75992 3 5.03995 3 5.6V16.4C3 16.9601 3 17.2401 3.10899 17.454C3.20487 17.6422 3.35785 17.7951 3.54601 17.891C3.75992 18 4.03995 18 4.6 18H7.54668C8.08687 18 8.35696 18 8.61814 18.0466C8.84995 18.0879 9.0761 18.1563 9.29191 18.2506C9.53504 18.3567 9.75977 18.5065 10.2092 18.8062L12 20M12 10.4C12 8.15979 12 7.03969 12.436 6.18404C12.8195 5.43139 13.4314 4.81947 14.184 4.43597C15.0397 4 16.1598 4 18.4 4H19.4C19.9601 4 20.2401 4 20.454 4.10899C20.6422 4.20487 20.7951 4.35785 20.891 4.54601C21 4.75992 21 5.03995 21 5.6V16.4C21 16.9601 21 17.2401 20.891 17.454C20.7951 17.6422 20.6422 17.7951 20.454 17.891C20.2401 18 19.9601 18 19.4 18H16.4533C15.9131 18 15.643 18 15.3819 18.0466C15.15 18.0879 14.9239 18.1563 14.7081 18.2506C14.465 18.3567 14.2402 18.5065 13.7908 18.8062L12 20"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Help center
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/creator/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3C7.04 3 3 7.04 3 12C3 16.96 7.04 21 12 21C16.96 21 21 16.96 21 12C21 7.04 16.96 3 12 3ZM12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5ZM14.3 7.7C14.91 8.31 15.25 9.13 15.25 10C15.25 10.87 14.91 11.68 14.3 12.3C13.87 12.73 13.33 13.03 12.75 13.16V13.5C12.75 13.91 12.41 14.25 12 14.25C11.59 14.25 11.25 13.91 11.25 13.5V12.5C11.25 12.09 11.59 11.75 12 11.75C12.47 11.75 12.91 11.57 13.24 11.24C13.57 10.91 13.75 10.47 13.75 10C13.75 9.53 13.57 9.09 13.24 8.76C12.58 8.1 11.43 8.1 10.77 8.76C10.44 9.09 10.26 9.53 10.26 10C10.26 10.41 9.92 10.75 9.51 10.75C9.1 10.75 8.76 10.41 8.76 10C8.76 9.13 9.1 8.32 9.71 7.7C10.94 6.47 13.08 6.47 14.31 7.7H14.3ZM13 16.25C13 16.8 12.55 17.25 12 17.25C11.45 17.25 11 16.8 11 16.25C11 15.7 11.45 15.25 12 15.25C12.55 15.25 13 15.7 13 16.25Z"
                    fill="#000000"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">FAQs</span>
            </Link>
          </li>
          <li>
            <Link
              to="/creator/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-indigo-300 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
                    stroke="#000000"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Privacy
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
