import React, { useEffect } from "react";
import PageDetails from "../components/_page_details";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 py-48">
        <PageDetails title="404 - PollSage" description="404 - PollSage" />
      <div className="flex flex-col">
        {/* <!-- Notes --> */}
        <span className="text-center font-bold my-10">
          <Link
            to="/"
            className="text-gray-100"
          >
            PollSage
          </Link>
        </span>

        {/* <!-- Error Container --> */}
        <div className="flex flex-col items-center">
          <div className="text-indigo-500 font-bold text-7xl">404</div>

          <div className="font-bold text-gray-200 text-3xl xl:text-7xl lg:text-6xl md:text-5xl mt-10">
            This page does not exist
          </div>

          <div className="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            The page you are looking for could not be found.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
