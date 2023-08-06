import React, { useState } from "react";
import PageDetails from "../../components/_page_details";
import { useLocation, useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../utils/toaster";
import { unsubscribeEmail } from "../../services/app/unsubscribe.service.js";

const reasons = [
  "I don't want to receive emails from PollSage",
  "I receive too many emails from PollSage",
  "I'm not interested in PollSage anymore",
  "I don't find PollSage emails useful",
  "I never signed up for PollSage",
  "Other",
];

const Unsubscribe = () => {
    const navigate = useNavigate();
  // get query string
  const query = new URLSearchParams(useLocation().search);
  const email = query.get("email");
  const [reason, setReason] = useState(null);

  const handleUnsubscribe = async () => {
    try {
      let res = await unsubscribeEmail({email, reason});
        console.log(res);
        if(res.data) {
            successToast("You have been unsubscribed successfully");
            navigate("/");
        }
    } catch (error) {
      errorToast(error.message || error || "Something went wrong");
    }
  };

    const handleOnChange = (e) => {
    setReason(e.target.value);
    }

  return (
    <>
      <PageDetails
        title="Unsubscribe"
        description="Unsubscribe from our mailing list"
      />
      <div className="container mx-auto px-4 sm:px-8 max-w-3xl">
        <div className="py-8">
          <div>
            <h1 className="text-4xl text-gray-100 font-semibold leading-tight text-center">
              PollSage
            </h1>
          </div>
          <div className="mt-16 border py-8 px-5 text-gray-600 dark:text-gray-400">
            <h2 className="text-2xl text-gray-100 font-semibold leading-tight">
              Unsubscribe
            </h2>
            <p className="mt-2">
              You are about to unsubscribe from our mailing list. Are you sure
              you want to do this?
            </p>
            <p className="mt-2 bg-yellow-500 bg-opacity-50 border border-yellow-700 py-2 px-2 text-black rounded">
              You will not receive any emails from us after this except for the
              login otp.
            </p>
            {/* unsubscribing reason radio button */}
            <div className="mt-4">
              <p className="text-gray-100 font-bold">
                If you have a moment, please let us know why you are
                unsubscribing. We value your feedback and will use it to improve
                our service.
              </p>
              {reasons &&
                reasons.map((reason) => {
                  return (
                    <label
                      className="inline-flex items-center w-full mt-2"
                      key={reason}
                    >
                      <input
                        type="radio"
                        className="form-radio"
                        name="radio"
                        value={reason}
                        onChange={handleOnChange}
                      />
                      <span className="ml-2">{reason}</span>
                    </label>
                  );
                })}
            </div>
            <p className="mt-2 text-indigo-200">
              If you are sure, click the button below.
            </p>
            <div className="mt-4">
              <button
                onClick={handleUnsubscribe}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-auto"
              >
                Unsubscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
