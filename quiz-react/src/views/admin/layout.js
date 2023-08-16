import React from "react";
import CreatorSidebar from "../../components/admin/sidebar";
import CreatorHeader from "../../components/admin/header";
import CreatorFooter from "../../components/admin/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";

import CreatorList from "./creators/list.js";

import CreateAccessToken from "./tokens/create.js";
import AccessTokenList from "./tokens/list";

import PollsList from "./poll/list";

import Logs from "./logs/index.js";

import CPUHealth from "./cpu/index.js";
import DBMng from "./db-mng/index.js";
import WebAnalytics from "./web-analytics/index.js";

import ListFaq from "./faq/list";
import CreateFaq from "./faq/create";
import EditFaq from "./faq/edit";

import CampaignCreate from "./emails/campaign/create";

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

              {/* /creators */}
              <Route path="/creators/list" element={<CreatorList />} />

              {/* /tokens */}
              <Route path="/tokens/create" element={<CreateAccessToken />} />
              <Route path="/tokens/list" element={<AccessTokenList />} />
              <Route path="/polls/list" element={<PollsList />} />

              {/* /logs */}
              <Route path="/logs" element={<Logs />} />

              {/* /cpu */}
              <Route path="/cpu" element={<CPUHealth />} />

              {/* /web-analytics */}
              <Route path="/web-analytics" element={<WebAnalytics />} />

              {/* /db-mng */}
              <Route path="/db-mng" element={<DBMng />} />

              <Route path="/faqs/create" element={<CreateFaq />} />
              <Route path="/faqs/list" element={<ListFaq />} />
              <Route path="/faqs/edit/:id" element={<EditFaq />} />

              <Route
                path="/emails/campaign/create"
                element={<CampaignCreate />}
              />

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
