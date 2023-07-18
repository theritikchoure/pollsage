import React from "react";
import "../../styles/creator-layout.css";
import CreatorSidebar from "../../components/creator/sidebar";
import CreatorHeader from "../../components/creator/header";
import CreatorFooter from "../../components/creator/footer";
import UsersTable from "../../components/creator/user_table";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import CreatePoll from "./poll/create.js";

const CreatorLayout = () => {
  return (
    // <!-- component -->
    <div x-data="setup()">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-white dark:bg-gray-700 text-black dark:text-white">
        {/* <!-- Sidebar --> */}
        <CreatorSidebar />
        {/* <!-- ./Sidebar --> */}

        <div className="h-full ml-14 mb-10 md:ml-64">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-poll" element={<CreatePoll />} />
            <Route path="*" element={<Navigate to={"/creator/dashboard"} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default CreatorLayout;
