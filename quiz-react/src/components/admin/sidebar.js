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

  const closeSubMenu = (e) => {
    // find ul inside the current target
    const ul = e.currentTarget.querySelectorAll("ul");
    // add hidden class to all ul
    ul.forEach((el) => {
      el.classList.add("hidden");
    });
  };

  return (
    <div className="fixed flex flex-col left-0 w-14 hover:w-64 md:w-64 bg-[#1e293b] h-full text-white transition-all duration-300 border-none z-40 sidebar">
      <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
        <ul
          onMouseLeave={(e) => closeSubMenu(e)}
          className="flex flex-col py-4 space-y-1"
        >
          <li className="px-5 hidden md:block border-b pb-5 mb-5">
            <Link
              to="/"
              className="text-lg font-semibold tracking-widest text-gray-100 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
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
                CMS MENU
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/admin/dashboard"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  fill="currentColor"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  version="1.1"
                >
                  <g
                    id="🔍-Product-Icons"
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                  >
                    <g
                      id="ic_fluent_poll_24_regular"
                      fill="currentColor"
                      fill-rule="nonzero"
                    >
                      <path
                        d="M11.7518706,1.99956021 C13.2716867,1.99956021 14.5037411,3.23161462 14.5037411,4.75143076 L14.5037411,19.2499651 C14.5037411,20.7697812 13.2716867,22.0018356 11.7518706,22.0018356 C10.2320544,22.0018356 9,20.7697812 9,19.2499651 L9,4.75143076 C9,3.23161462 10.2320544,1.99956021 11.7518706,1.99956021 Z M18.7518706,6.99956021 C20.2716867,6.99956021 21.5037411,8.23161462 21.5037411,9.75143076 L21.5037411,19.2499651 C21.5037411,20.7697812 20.2716867,22.0018356 18.7518706,22.0018356 C17.2320544,22.0018356 16,20.7697812 16,19.2499651 L16,9.75143076 C16,8.23161462 17.2320544,6.99956021 18.7518706,6.99956021 Z M4.75187055,11.9995602 C6.27168669,11.9995602 7.5037411,13.2316146 7.5037411,14.7514308 L7.5037411,19.2499651 C7.5037411,20.7697812 6.27168669,22.0018356 4.75187055,22.0018356 C3.23205441,22.0018356 2,20.7697812 2,19.2499651 L2,14.7514308 C2,13.2316146 3.23205441,11.9995602 4.75187055,11.9995602 Z M11.7518706,3.49956021 C11.0604815,3.49956021 10.5,4.06004175 10.5,4.75143076 L10.5,19.2499651 C10.5,19.9413541 11.0604815,20.5018356 11.7518706,20.5018356 C12.4432596,20.5018356 13.0037411,19.9413541 13.0037411,19.2499651 L13.0037411,4.75143076 C13.0037411,4.06004175 12.4432596,3.49956021 11.7518706,3.49956021 Z M18.7518706,8.49956021 C18.0604815,8.49956021 17.5,9.06004175 17.5,9.75143076 L17.5,19.2499651 C17.5,19.9413541 18.0604815,20.5018356 18.7518706,20.5018356 C19.4432596,20.5018356 20.0037411,19.9413541 20.0037411,19.2499651 L20.0037411,9.75143076 C20.0037411,9.06004175 19.4432596,8.49956021 18.7518706,8.49956021 Z M4.75187055,13.4995602 C4.06048154,13.4995602 3.5,14.0600417 3.5,14.7514308 L3.5,19.2499651 C3.5,19.9413541 4.06048154,20.5018356 4.75187055,20.5018356 C5.44325957,20.5018356 6.0037411,19.9413541 6.0037411,19.2499651 L6.0037411,14.7514308 C6.0037411,14.0600417 5.44325957,13.4995602 4.75187055,13.4995602 Z"
                        id="🎨-Color"
                      ></path>
                    </g>
                  </g>
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
                  to={"/admin/polls/list"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  List/All Polls
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/admin/polls/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Add Poll
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="void:javascript()"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
              <span className="ml-2 text-sm tracking-wide truncate">
                Creator
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
                  to={"/admin/creators"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  List/All Polls
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/polls/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Add Poll
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to={"/creator/comments"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M2.678 11.894a1 1 0 0 1 .287.801 10.97 10.97 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8.06 8.06 0 0 0 8 14c3.996 0 7-2.807 7-6 0-3.192-3.004-6-7-6S1 4.808 1 8c0 1.468.617 2.83 1.678 3.894zm-.493 3.905a21.682 21.682 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a9.68 9.68 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105z" />{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Comments
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/creator/activity"}
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Email templates
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/emails/template/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Themes
                </a>
              </li>
              <li className="">
                <Link
                  to={"/creator/themes/create"}
                  className="relative flex flex-row items-center px-12 h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  My Account
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/emails/template/create"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  My Notifications
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/creator/settings/feedback"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Give Feedback
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <a
              onClick={(e) => handleSubMenu(e)}
              href="void:javascript()"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-shield-lock"
                  viewBox="0 0 16 16"
                >
                  {" "}
                  <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />{" "}
                  <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />{" "}
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Tokens
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
                  to={"/admin/tokens/list"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Manage Tokens
                </Link>
              </li>
              <li className="">
                <Link
                  to={"/admin/tokens/create"}
                  className="relative flex flex-row items-center px-12 h-9 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  {" "}
                  Create Access Token
                </Link>
              </li>
            </ul>
          </li>
          <li className="px-5 hidden md:block">
            <div className="flex flex-row items-center h-8">
              <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                Others
              </div>
            </div>
          </li>
          <li>
            <Link
              to={"/admin/cpu"}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 21H5C4.06812 21 3.60218 21 3.23463 20.8478C2.74458 20.6448 2.35523 20.2554 2.15224 19.7654C2 19.3978 2 18.9319 2 18C2 17.0681 2 16.6022 2.15224 16.2346C2.35523 15.7446 2.74458 15.3552 3.23463 15.1522C3.60218 15 4.06812 15 5 15H19C19.9319 15 20.3978 15 20.7654 15.1522C21.2554 15.3552 21.6448 15.7446 21.8478 16.2346C22 16.6022 22 17.0681 22 18C22 18.9319 22 19.3978 21.8478 19.7654C21.6448 20.2554 21.2554 20.6448 20.7654 20.8478C20.3978 21 19.9319 21 19 21H18"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke="currentColor"
                  />
                  <path
                    d="M2 12C2 11.0681 2 10.6022 2.15224 10.2346C2.35523 9.74458 2.74458 9.35523 3.23463 9.15224C3.60218 9 4.06812 9 5 9H19C19.9319 9 20.3978 9 20.7654 9.15224C21.2554 9.35523 21.6448 9.74458 21.8478 10.2346C22 10.6022 22 11.0681 22 12C22 12.9319 22 13.3978 21.8478 13.7654C21.6448 14.2554 21.2554 14.6448 20.7654 14.8478C20.3978 15 19.9319 15 19 15H5C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12Z"
                    stroke="currentColor"
                    stroke-width="2"
                  />
                  <path
                    d="M10 3H19C19.9319 3 20.3978 3 20.7654 3.15224C21.2554 3.35523 21.6448 3.74458 21.8478 4.23463C22 4.60218 22 5.06812 22 6C22 6.93188 22 7.39782 21.8478 7.76537C21.6448 8.25542 21.2554 8.64477 20.7654 8.84776C20.3978 9 19.9319 9 19 9H5C4.06812 9 3.60218 9 3.23463 8.84776C2.74458 8.64477 2.35523 8.25542 2.15224 7.76537C2 7.39782 2 6.93188 2 6C2 5.06812 2 4.60218 2.15224 4.23463C2.35523 3.74458 2.74458 3.35523 3.23463 3.15224C3.60218 3 4.06812 3 5 3H6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <circle cx="5" cy="12" r="1" fill="#1C274C" />
                  <circle cx="5" cy="6" r="1" fill="#1C274C" />
                  <circle cx="5" cy="18" r="1" fill="#1C274C" />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                CPU Management
              </span>
            </Link>
          </li>
          <li>
            <Link
              to={"/admin/logs"}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  fill="currentColor"
                  className="w-5 h-5"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M0 24q0 0.832 0.576 1.44t1.44 0.576h1.984q0 2.496 1.76 4.224t4.256 1.76h6.688q-2.144-1.504-3.456-4h-3.232q-0.832 0-1.44-0.576t-0.576-1.408v-20q0-0.832 0.576-1.408t1.44-0.608h16q0.8 0 1.408 0.608t0.576 1.408v7.232q2.496 1.312 4 3.456v-10.688q0-2.496-1.76-4.256t-4.224-1.76h-16q-2.496 0-4.256 1.76t-1.76 4.256h-1.984q-0.832 0-1.44 0.576t-0.576 1.408 0.576 1.44 1.44 0.576h1.984v4h-1.984q-0.832 0-1.44 0.576t-0.576 1.408 0.576 1.44 1.44 0.576h1.984v4h-1.984q-0.832 0-1.44 0.576t-0.576 1.408zM10.016 24h2.080q0-0.064-0.032-0.416t-0.064-0.576 0.064-0.544 0.032-0.448h-2.080v1.984zM10.016 20h2.464q0.288-1.088 0.768-1.984h-3.232v1.984zM10.016 16h4.576q0.992-1.216 2.112-1.984h-6.688v1.984zM10.016 12h16v-1.984h-16v1.984zM10.016 8h16v-1.984h-16v1.984zM14.016 23.008q0 1.824 0.704 3.488t1.92 2.88 2.88 1.92 3.488 0.704 3.488-0.704 2.88-1.92 1.92-2.88 0.704-3.488-0.704-3.488-1.92-2.88-2.88-1.92-3.488-0.704-3.488 0.704-2.88 1.92-1.92 2.88-0.704 3.488zM18.016 23.008q0-2.080 1.44-3.52t3.552-1.472 3.52 1.472 1.472 3.52q0 2.080-1.472 3.52t-3.52 1.472-3.552-1.472-1.44-3.52zM22.016 23.008q0 0.416 0.288 0.704t0.704 0.288h1.984q0.416 0 0.704-0.288t0.32-0.704-0.32-0.704-0.704-0.288h-0.992v-0.992q0-0.416-0.288-0.704t-0.704-0.32-0.704 0.32-0.288 0.704v1.984z"></path>
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">Logs</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="relative w-full flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
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
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
