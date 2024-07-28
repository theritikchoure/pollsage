import React, { Fragment, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PageDetails from "../components/_page_details";
import useTabVisibility from "../components/_tab_visibility";

const ContactUs = () => {
  const onTabVisible = () => {
    document.title = "PollSage - Create polls in seconds";
  };

  const onTabHidden = () => {
    document.title = "Back soon!";
  };

  useTabVisibility(onTabVisible, onTabHidden);

  return (
    <>
      <PageDetails
        title="PollSage - Create polls in seconds"
        description="Pollsage is a free online polling platform that allows you to create polls and share them with your audience."
      />
      <section className="bg-white text-black mt-10 mx-4 p-8 lg:w-1/2 lg:mx-auto flex-grow">
        <article className="">
          <h1 className="text-3xl font-bold">Contact Us</h1>

          <p className="my-5">
            The best way to contact us is by sending an email to one of the
            addresses below:
          </p>

          <h2 className="text-2xl font-bold">Support</h2>

          <p className="my-5">
            Contact: Gregor Krambs
            <br />
            E-Mail:{" "}
            <a href="mailto:support@strawpoll.com">support@strawpoll.com</a>
          </p>

          <h2 className="text-2xl font-bold">Sales</h2>

          <p className="my-5">
            Contact: Gregor Krambs
            <br />
            E-Mail: <a href="mailto:sales@strawpoll.com">sales@strawpoll.com</a>
          </p>

          <h2 className="text-2xl font-bold">General Inquiries</h2>

          <p className="my-5">
            Contact: Gregor Krambs
            <br />
            E-Mail:{" "}
            <a href="mailto:contact@strawpoll.com">contact@strawpoll.com</a>
          </p>
        </article>
      </section>
    </>
  );
};

export default ContactUs;
