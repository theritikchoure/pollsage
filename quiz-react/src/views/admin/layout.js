import React from "react";
import "../../styles/creator-layout.css";
import CreatorSidebar from "../../components/admin/sidebar";
import CreatorHeader from "../../components/admin/header";
import CreatorFooter from "../../components/admin/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";

const CreatorLayout = () => {
  return (
    // <!-- component -->
    <div x-data="setup()">
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-900 text-black dark:text-white">
        {/* <!-- Sidebar --> */}
        <CreatorSidebar />
        {/* <!-- ./Sidebar --> */}

        <div className="h-full ml-14 md:ml-64">
          <CreatorHeader />
          <div className="px-4 py-8 md:px-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<Navigate to={"/404"} />} />
            </Routes>
          </div>
          <CreatorFooter />
        </div>
      </div>
    </div>
  );
};

export default CreatorLayout;
