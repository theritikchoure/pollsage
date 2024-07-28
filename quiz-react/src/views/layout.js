import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./home";
import ContactUs from "./contact_us";
import Privacy from "./privacy";
import Terms from "./terms";
import NotFound from "./404";
import Contributors from "./app/contributors";
import { warningToast } from "../utils/toaster";

const GeneralLayout = ({isAuth, auth}) => {

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased text-black dark:text-white">
      <Header isAuth={isAuth} auth={auth} />
      {/* Main content */}
      <main className="flex-1 flex-grow mx-auto  w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/contributors" element={<Contributors />} />
          {/* <Route path="*" element={<Navigate to={"/creator/dashboard"} />} /> */}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
