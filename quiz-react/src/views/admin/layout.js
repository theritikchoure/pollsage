import React from "react";
import "../../styles/creator-layout.css";
import CreatorSidebar from "../../components/admin/sidebar";
import CreatorHeader from "../../components/admin/header";
import CreatorFooter from "../../components/admin/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import CreateAccessToken from "./tokens/create.js";
import AccessTokenList from "./tokens/list";

import PollsList from "./poll/list";

import Logs from "./logs/index.js";

import CPUHealth from "./cpu/index.js";

import ListFaq from "./faq/list";
import CreateFaq from "./faq/create";

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
              <Route path="/tokens/create" element={<CreateAccessToken />} />
              <Route path="/tokens/list" element={<AccessTokenList />} />
              <Route path="/polls/list" element={<PollsList />} />

              {/* /logs */}
              <Route path="/logs" element={<Logs />} />

              {/* /cpu */}
              <Route path="/cpu" element={<CPUHealth />} />

              <Route path="/faqs/create" element={<CreateFaq />} />
              <Route path="/faqs/list" element={<ListFaq />} />
              
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
