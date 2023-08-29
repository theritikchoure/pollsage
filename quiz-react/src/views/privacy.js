import React, { Fragment, useState } from "react";
import PageDetails from "../components/_page_details";
import useTabVisibility from "../components/_tab_visibility";
import { Link } from "react-router-dom";

const Privacy = () => {
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
      <section className="bg-slate-800 text-white mt-10 mx-4 p-8 lg:w-1/2 lg:mx-auto flex-grow mb-12">
        <article className="">
          <h1 className="text-3xl font-bold">Privacy</h1>

          <p className="my-5">
            At PollSage, we are committed to protecting your privacy and
            ensuring the security of your personal information. This Privacy
            Policy outlines how we collect, use, disclose, and safeguard your
            data when you use our PollSage application (referred to as "App" or
            "Service").
          </p>

          <h2 className="text-xl font-bold">1. Information We Collect:</h2>

          <p className="my-5">
            <ul className="space-y-4">
              <li>
                1.1 Personal Information: When you register an account with
                PollSage, we may collect certain personal information such as
                your name, email address, and other relevant contact details.
              </li>
              <li>
                1.2 Poll Data: We collect the data you provide when creating and
                participating in polls, including the poll questions, answer
                options, and any votes or responses submitted.{" "}
              </li>
              <li>
                1.3 Usage Information: We may collect information about how you
                use the App, including your interactions with polls, survey
                results, and other features.
              </li>
            </ul>
          </p>

          <h2 className="text-xl font-bold">2. How We Use Your Information:</h2>

          <p className="my-5">
            <ul className="space-y-4">
              <li>
                2.1 Providing the Service: We use your personal information to
                provide and improve the App's functionality, authenticate your
                account, and offer a personalized experience.
              </li>
              <li>
                2.2 Polls and Surveys: The poll data you provide is used to
                generate and display the polls and their results to you and
                other users as per your preferences.
              </li>
              <li>
                2.3 Communication: We may use your email address to send you
                updates, notifications, and relevant information about the App.
                You can opt-out of non-essential communications.
              </li>
              <li>
                2.4 Aggregated Data: We may aggregate and anonymize your data to
                analyze usage patterns and improve our services. Aggregated data
                will not identify you personally.
              </li>
            </ul>
          </p>

          <h2 className="text-xl font-bold">3. Data Security:</h2>
          <p className="my-5">
            <ul className="space-y-4">
              <li>
                <strong>3.1 Confidentiality:</strong> We treat your personal and
                poll data with strict confidentiality and take measures to
                protect it from unauthorized access or disclosure.
              </li>
              <li>
                <strong>3.2 Encryption:</strong> PollSage uses industry-standard
                encryption protocols to safeguard your data during transmission
                and storage.
              </li>
              <li>
                <strong>3.3 Account Protection:</strong> You are responsible for
                maintaining the security of your account credentials and should
                not share them with others.
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-bold">4. Data Sharing:</h2>
          <p className="my-5">
            <ul className="space-y-4">
              <li>
                <strong>4.1 Limited Sharing:</strong> We do not share your
                personal information or poll data with third parties except as
                described in this Privacy Policy or with your consent.
              </li>
              <li>
                <strong>4.2 Anonymized Data:</strong> Aggregated and anonymized
                poll data may be shared for research or statistical purposes,
                ensuring individual identities are not disclosed.
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-bold">5. Cookies and Tracking:</h2>
          <p className="my-5">
            <ul className="space-y-4">
              <li>
                <strong>5.1 Cookies:</strong> PollSage may use cookies and
                similar tracking technologies to enhance your browsing
                experience and gather usage information.
              </li>
              <li>
                <strong>5.2 Opt-Out:</strong> You can adjust your browser
                settings to reject cookies or notify you when they are being
                used.
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-bold">6. Third-Party Links:</h2>
          <p className="my-5">
            <ul className="space-y-4">
              <li>
                <strong>6.1 External Websites:</strong> PollSage may contain
                links to third-party websites, and we are not responsible for
                their privacy practices. We recommend reviewing their privacy
                policies separately.
              </li>
              <li>
                <strong>6.2 Advertisements:</strong> We do not endorse or
                control the content of advertisements shown on PollSage by
                third-party advertisers.
              </li>
            </ul>
          </p>
          <h2 className="text-xl font-bold">
            7. Changes to the Privacy Policy:
          </h2>
          <p className="my-5">
            <strong>7.1 Notification:</strong> In the event of any changes to
            this Privacy Policy, we will notify you through the App or via the
            provided contact information.
          </p>
          <h2 className="text-xl font-bold">8. Contact Us:</h2>
          <p className="my-5">
            <strong>8.1 Questions:</strong> If you have any questions or
            concerns regarding this Privacy Policy or your data, please contact
            our support team at <Link to="mailto:support@pollsage.com" className="text-indigo-500"> support@pollsage.com </Link>
          </p>
          <p>This Privacy Policy was last updated on {new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)}.</p>
        </article>
      </section>
    </>
  );
};

export default Privacy;
