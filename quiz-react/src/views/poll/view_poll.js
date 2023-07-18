import React, { Fragment, useEffect, useState } from "react";
import { submitPollValidation } from "../../validations/poll.js";
import { getPoll, submitPoll } from "../../services/poll.service";
import { errorToast, successToast } from "../../utils/toaster";
import ShareModal from "../../components/share_modal.js";
import Loader from "../../components/_loader.js";
import PageDetails from "../../components/_page_details.js";

const ViewPoll = () => {
  const initialState = {
    optionId: "",
    ip: "",
    country: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [pollId, setPollId] = useState(null);
  const [poll, setPoll] = useState(null);
  const [pollUrl, setPollUrl] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pId) => {
    try {
      // load the poll
      const id = window.location.pathname.split("/")[2];
      setPollId(id);
      let res = await getPoll(id);
      setPoll(res.data);
      setPollUrl(window.location.href);
      await loadUserIp();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const loadUserIp = async () => {
    try {
      // load the poll
      let res = await fetch("https://ipv4.jsonip.com/");
      res = await res.json();
      setFormData({ ...formData, ip: res.ip, country: res.country });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // write on change function
  const onChangeFormData = (key, value, index = null) => {
    if (!key) return;

    if (key === "options") {
      let options = [...formData.options];
      options[index].text = value;
      setFormData({ ...formData, options });
      return;
    }

    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = submitPollValidation(formData);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});
      let res = await submitPoll(pollId, formData);
      if (res) {
        successToast("Poll submit successfully.");
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleOptionChange = (event) => {
    onChangeFormData("optionId", event.target.value);
  };

  return (
    <Fragment>
      <div className="min-h-screen bg-gray-900 p-0 p-12">
        {/* loading... text center horizontally and vertically */}
        {loading && <Loader />}
        {!loading && (
          <>
            <PageDetails title={poll.question} />
            <div className="mx-auto max-w-md px-6 py-12 bg-gray-800 border-0 shadow-lg rounded-xl">
              <h1 className="text-2xl font-bold mb-4 text-gray-100">{poll.question}</h1>
              <form onSubmit={onSubmit}>
                <fieldset className="relative z-0 w-full p-px mb-5">
                  <div className="block pt-3 pb-2">
                    {poll.options.map((option, index) => (
                      <div className="mb-4" key={index}>
                        <label className="text-gray-100">
                          <input
                            type="radio"
                            name="radio"
                            value={option._id}
                            className="mr-2 text-gray-100 border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                            checked={formData.optionId === option._id}
                            onChange={handleOptionChange}
                          />
                          {option.text}
                        </label>
                      </div>
                    ))}
                    {errors.optionId && (
                      <p className="text-red-500 text-sm mt-1 text-left italic">
                        {errors.optionId}
                      </p>
                    )}
                  </div>
                </fieldset>

                <input
                  id="button"
                  type="submit"
                  value={"Vote"}
                  className="w-full px-6 py-3 mt-3 text-lg text-white cursor-pointer transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
                />

                <div className="block mt-5">
                  <div className="sm:flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <a
                        href={`/results/${pollId}`}
                        className="w-full sm:w-40 flex bg-gray-300 px-5 py-2 rounded items-center"
                      >
                        <svg
                          className="h-5 w-5 -ml-1 mr-2 "
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          stroke=""
                        >
                          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"></path>
                        </svg>

                        <span>Show results</span>
                      </a>
                    </div>
                    <button
                      onClick={() => setShowShareModal(true)}
                      type="button"
                      className="w-full my-2 sm:w-40 sm:ml-4 bg-purple-500 px-5 py-2 rounded text-white flex items-center"
                    >
                      <svg
                        className="h-5 w-5 -ml-1 mr-2 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        stroke=""
                      >
                        <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z"></path>
                      </svg>

                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex justify-center items-center mt-5 text-gray-100">
              <svg
                className="h-4 w-4 -ml-1 mr-2 "
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                stroke=""
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                ></path>
              </svg>

              <span>One vote per IP-Address allowed.</span>
            </div>
          </>
        )}
      </div>
      {showShareModal && (
        <ShareModal poll={poll} pollUrl={pollUrl} onClose={setShowShareModal} />
      )}
    </Fragment>
  );
};

export default ViewPoll;
