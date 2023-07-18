import React, { Fragment, useEffect, useRef, useState } from "react";
import { submitPollValidation } from "../../validations/poll.js";
import { getPollResult, submitPoll } from "../../services/poll.service";
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
      let res = await getPollResult(id);
      console.log(res);
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
      <div className="min-h-screen bg-gray-900 p-0 p-8">
        {/* loading... text center horizontally and vertically */}
        {loading && <Loader />}
        {!loading && (
          <>
          <PageDetails title={`${poll.poll.question} - Poll Result - PollSage`} />
            <div className="h-full mb-10">
              <div className="text-center mt-5">
                <h1 className="text-2xl text-white mb-2">
                  {poll.poll.question}
                </h1>
                <span className="text-gray-100 ">Poll Result</span>
              </div>
              <div className="p-4">
                {/* <!-- Social Traffic --> */}
                <div className="relative lg:w-1/2 m-auto flex flex-col min-w-0 mb-4 lg:mb-0 break-words  bg-gray-800 border-0 shadow-lg rounded-xl">
                  <div className="rounded-t mb-0 px-0 border-0">
                    <div className="flex flex-wrap items-center px-4 py-2">
                      <div className="relative w-full max-w-full flex-grow flex-1">
                        <h3 className="font-semibold text-base text-gray-100 dark:text-gray-100">
                          Votes
                        </h3>
                      </div>
                      <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                        <a href={`/poll/${pollId}`}
                          className="bg-blue-500 dark:bg-green-100 text-white cursor-pointer dark:text-gray-800 dark:active:text-gray-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Back to Polls
                        </a>
                      </div>
                    </div>
                    <div className="block w-full overflow-x-auto">
                      <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                          <tr>
                            <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Options
                            </th>
                            <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                              Votes
                            </th>
                            <th className="px-4 bg-gray-800 dark:bg-gray-800 text-gray-100 dark:text-gray-100 align-middle border border-solid border-gray-200 dark:border-gray-500 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left min-w-140-px"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {poll.poll.options.map((option, index) => (
                            <tr className="text-gray-100 dark:text-gray-100" key={index}>
                              <th className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {option.text}
                              </th>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {option.votes}
                              </td>
                              <td className="border-t-0 px-4 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                <div className="flex items-center">
                                  <span className="mr-2">
                                    {(Number(option.votes) /
                                      Number(poll.totalVotes)) *
                                      100}
                                    %
                                  </span>
                                  <div className="relative w-full">
                                    <div className="overflow-hidden h-2 text-xs flex rounded bg-blue-200">
                                      <div
                                        style={{
                                          width: `${
                                            (Number(option.votes) /
                                              Number(poll.totalVotes)) *
                                            100
                                          }%`,
                                        }}
                                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-600"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* <!-- ./Social Traffic --> */}
              </div>

              {/* <!-- Client Table --> */}
              <div className="mt-4 mx-4">
                <div className="lg:w-1/2 m-auto overflow-hidden rounded-lg shadow-xs">
                  <div className="w-full overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs bg-gray-800 font-semibold tracking-wide text-left text-gray-100 uppercase border-b dark:border-gray-700 dark:text-gray-100 ">
                          <th className="px-4 py-3">Client</th>
                          <th className="px-4 py-3">Amount</th>
                          <th className="px-4 py-3">Status</th>
                          <th className="px-4 py-3">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 divide-y dark:divide-gray-700">
                        <tr className="bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">Hans Burger</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  10x Developer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$855.85</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Approved{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">15-01-2021</td>
                        </tr>
                        <tr className="bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;facepad=3&amp;fit=facearea&amp;s=707b9c33066bf8808c934c8ab394dff6"
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">Jolina Angelie</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Unemployed
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$369.75</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-yellow-700 bg-yellow-100 rounded-full">
                              {" "}
                              Pending{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">23-03-2021</td>
                        </tr>
                        <tr className="bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src="https://images.unsplash.com/photo-1502720705749-871143f0e671?ixlib=rb-0.3.5&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;s=b8377ca9f985d80264279f277f3a67f5"
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">Dave Li</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Influencer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$775.45</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700">
                              {" "}
                              Expired{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">09-02-2021</td>
                        </tr>
                        <tr className="bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src="https://images.unsplash.com/photo-1551006917-3b4c078c47c9?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">Rulia Joberts</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Actress
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$1276.75</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                              {" "}
                              Approved{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">17-04-2021</td>
                        </tr>
                        <tr className="bg-gray-800  hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <img
                                  className="object-cover w-full h-full rounded-full"
                                  src="https://images.unsplash.com/photo-1566411520896-01e7ca4726af?ixlib=rb-1.2.1&amp;q=80&amp;fm=jpg&amp;crop=entropy&amp;cs=tinysrgb&amp;w=200&amp;fit=max&amp;ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
                                  alt=""
                                  loading="lazy"
                                />
                                <div
                                  className="absolute inset-0 rounded-full shadow-inner"
                                  aria-hidden="true"
                                ></div>
                              </div>
                              <div>
                                <p className="font-semibold">Hitney Wouston</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                  Singer
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">$863.45</td>
                          <td className="px-4 py-3 text-xs">
                            <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-full dark:text-red-100 dark:bg-red-700">
                              {" "}
                              Denied{" "}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">11-01-2021</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800">
                    <span className="flex items-center col-span-3">
                      {" "}
                      Showing 21-30 of 100{" "}
                    </span>
                    <span className="col-span-2"></span>
                    {/* <!-- Pagination --> */}
                    <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
                      <nav aria-label="Table navigation">
                        <ul className="inline-flex items-center">
                          <li>
                            <button
                              className="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Previous"
                            >
                              <svg
                                aria-hidden="true"
                                className="w-4 h-4 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              1
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              2
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 text-white dark:text-gray-800 transition-colors duration-150 bg-blue-600 dark:bg-gray-100 border border-r-0 border-blue-600 dark:border-gray-100 rounded-md focus:outline-none focus:shadow-outline-purple">
                              3
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              4
                            </button>
                          </li>
                          <li>
                            <span className="px-3 py-1">...</span>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              8
                            </button>
                          </li>
                          <li>
                            <button className="px-3 py-1 rounded-md focus:outline-none focus:shadow-outline-purple">
                              9
                            </button>
                          </li>
                          <li>
                            <button
                              className="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                              aria-label="Next"
                            >
                              <svg
                                className="w-4 h-4 fill-current"
                                aria-hidden="true"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                ></path>
                              </svg>
                            </button>
                          </li>
                        </ul>
                      </nav>
                    </span>
                  </div>
                </div>
              </div>
              {/* <!-- ./Client Table --> */}
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
