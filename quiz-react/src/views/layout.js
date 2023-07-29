import React, { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Navigate, Route, Routes } from "react-router-dom";
import ContactUs from "./contact_us";
import Home from "./home";

const GeneralLayout = ({isAuth, auth}) => {

  return (
    <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-slate-900 text-black dark:text-white">
      <Header isAuth={isAuth} auth={auth} />
      {/* Main content */}
      <main className="flex-1 flex-grow mx-auto  w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* <Route path="*" element={<Navigate to={"/creator/dashboard"} />} /> */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default GeneralLayout;
