import React, { useState } from "react";
import links from "../utils/nav_link";
import { Link } from "react-router-dom";

const Header = ({isAuth, auth}) => {
  const [mobileMenuHidden, setMobileMenuHidden] = useState(false);

  const url = window.location.pathname;

  return (
    <div className="bg-slate-800 sticky top-0 z-40">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-slate-900 border-b">
        <Link className="text-3xl text-white font-bold leading-none ml-5" to="#">
          PollSage
        </Link>
        <div
          className="lg:hidden"
          onClick={() => setMobileMenuHidden(!mobileMenuHidden)}
        >
          <button className="navbar-burger flex items-center text-blue-600 p-3">
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
          <li>
            <Link className={`text-sm
            ${url === '/' ? 'text-indigo-500 font-bold' : 'text-gray-400'}`} to={links.home}>
              Home
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link className="text-sm text-gray-400 hover:text-gray-500" to={
              isAuth && auth.user.role === 'creator' ? '/creator/create-poll' : '/login'
            }>
              Create poll
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link className={`text-sm 
            ${url === '/contact-us' ? 'text-indigo-500 font-bold' : 'text-gray-400 hover:text-gray-500'}`} to={'/contact-us'}>
              Contact
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link className={`text-sm 
            ${url === '/privacy' ? 'text-indigo-500 font-bold' : 'text-gray-400 hover:text-gray-500'}`} to={'/privacy'}>
              Privacy
            </Link>
          </li>
          <li className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              className="w-4 h-4 current-fill"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v0m0 7v0m0 7v0m0-13a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </li>
          <li>
            <Link className={`text-sm 
            ${url === '/terms' ? 'text-indigo-500 font-bold' : 'text-gray-400 hover:text-gray-500'}`} to={'/terms'}>
              Terms
            </Link>
          </li>
        </ul>
        <Link
          className="hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-200 hover:bg-gray-300 text-sm text-gray-900 font-bold  rounded-xl transition duration-200"
          to={links.login}
        >
          Sign In
        </Link>
        <Link
          className="hidden lg:inline-block py-2 px-6 bg-indigo-500 hover:bg-indigo-600 text-sm text-white font-bold rounded-xl transition duration-200"
          to={links.register}
        >
          Sign up
        </Link>
      </nav>
      {mobileMenuHidden && (
        <div className="navbar-menu relative z-50">
          <div className="navbar-backdrop fixed inset-0 bg-slate-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-slate-900 border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <Link className="mr-auto text-3xl font-bold leading-none" to="#">
                <img
                  className="h-10"
                  src="./logo.png"
                  alt="Logo"
                  width="auto"
                  height="auto"
                />
              </Link>
              <button
                className="navbar-close"
                onClick={() => setMobileMenuHidden(!mobileMenuHidden)}
              >
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div>
              <ul>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-200 hover:text-indigo-600 rounded"
                    to={links.home}
                  >
                    Home
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-200 hover:text-indigo-600 rounded"
                    to="#"
                  >
                    Create poll
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-200 hover:text-indigo-600 rounded"
                    to="#"
                  >
                    Services
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-200 hover:text-indigo-600 rounded"
                    to="#"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-1">
                  <Link
                    className="block p-4 text-sm font-semibold text-gray-400 hover:bg-gray-200 hover:text-indigo-600 rounded"
                    to="#"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="mt-auto">
              <div className="pt-6">
                <Link
                  className="block px-4 py-3 mb-3 leading-loose text-xs text-center font-semibold leading-none bg-gray-50 hover:bg-gray-100 rounded-xl"
                  to={links.login}
                >
                  Sign in
                </Link>
                <Link
                  className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-600 hover:bg-blue-700  rounded-xl"
                  to={links.register}
                >
                  Sign Up
                </Link>
              </div>
              <p className="my-4 text-xs text-center text-gray-400">
                <span>Copyright © 2021</span>
              </p>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Header;
