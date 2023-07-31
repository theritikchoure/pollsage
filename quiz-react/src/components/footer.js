import React from "react";
import { WEBSITE_NAME } from "../global/constants";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-center lg:text-left">
      <div className="p-4 text-center text-neutral-300">
        © 2023 Copyright:
        <a
          className="text-neutral-100 ml-1"
          href="https://tailwind-elements.com/"
        >
          {WEBSITE_NAME}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
