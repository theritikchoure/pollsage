import React from "react";
import { successToast } from "../utils/toaster";

const ShareModal = ({ poll, pollUrl, onClose }) => {
  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
    successToast("Copied to clipboard.");
  };

  const handleClose = () => {
    onClose();
  }

  return (
    <>
      <div
        className={`fixed inset-0 flex items-center justify-center z-50 visible`}
      >
        <div
          className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none"
          id="exampleModal"
        >
          <div className="bg-white pointer-events-none relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out mx-auto w-10/12 mt-32 min-[576px]:max-w-[500px]">
            <div className="bg-white min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-white-600">
              <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-gray-300 border-opacity-100 p-4 dark:border-opacity-50">
                {/* <!--Modal title--> */}
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
                {/* <!--Close button--> */}
                <button onClick={handleClose}
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* <!--Modal body--> */}
              <div className="relative flex-auto p-4" data-te-modal-body-ref>
                <div className="mx-auto sm:max-w-md">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-900">
                    Share via link
                  </h3>

                  <p className="mt-1 text-gray-600 text-sm">
                    Use this link to share the poll with your participants.
                  </p>

                  <div className="mt-3 flex rounded-md shadow-sm">
                    <div className="relative flex items-stretch flex-grow focus-within:z-10">
                      <input
                        type="text"
                        name="poll-url"
                        className="block w-full p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 rounded-none rounded-l-md bg-white dark:bg-gray-300 dark:border-gray-700"
                        readOnly
                        value={window.location.href}
                      />
                    </div>
                    <button
                      onClick={() => copyToClipboard(window.location.href)}
                      type="button"
                      className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 dark:text-gray-200 bg-gray-50 dark:bg-gray-600 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        stroke=""
                      >
                        <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
                        <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
                      </svg>

                      <span>Copy</span>
                    </button>
                  </div>
                </div>

                <div className="mx-auto sm:max-w-md pt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-900">
                    Share on social media
                  </h3>

                  <p className="mt-1 text-gray-600 text-sm">
                    Share this poll with friends &amp; followers on social media
                    channels.
                  </p>

                  <div className="mt-3 space-y-4 inline-block">
                    <a
                      href={`https://api.whatsapp.com/send?text=${poll.question} - ${pollUrl}`}
                      target="_blank"
                      rel="noopener"
                      className="share-button w-full text-white space-x-2 hover:opacity-80"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <svg
                        className="text-white w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"></path>
                      </svg>
                      <span>Share on WhatsApp</span>
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${poll.question}%0AUrl%20-%20${pollUrl}`}
                      target="_blank"
                      rel="noopener"
                      className="share-button w-full text-white space-x-2 hover:opacity-80"
                      style={{ backgroundColor: "#1da1f2" }}
                    >
                      <svg
                        className="text-white w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                      </svg>
                      <span>Share on Twitter</span>
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${pollUrl}`}
                      target="_blank"
                      rel="noopener"
                      className="share-button w-full text-white space-x-2 hover:opacity-80"
                      style={{ backgroundColor: "#4267B2" }}
                    >
                      <svg
                        className="text-white w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                      </svg>
                      <span>Share on Facebook</span>
                    </a>

                    <a
                      href={`https://www.reddit.com/submit?url=${pollUrl}&amp;title=${poll.question} - PollSage`}
                      target="_blank"
                      rel="noopener"
                      className="share-button w-full text-white space-x-2 hover:opacity-80"
                      style={{ backgroundColor: "#ff4500" }}
                    >
                      <svg
                        className="text-white w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M24 11.779c0-1.459-1.192-2.645-2.657-2.645-.715 0-1.363.286-1.84.746-1.81-1.191-4.259-1.949-6.971-2.046l1.483-4.669 4.016.941-.006.058c0 1.193.975 2.163 2.174 2.163 1.198 0 2.172-.97 2.172-2.163s-.975-2.164-2.172-2.164c-.92 0-1.704.574-2.021 1.379l-4.329-1.015c-.189-.046-.381.063-.44.249l-1.654 5.207c-2.838.034-5.409.798-7.3 2.025-.474-.438-1.103-.712-1.799-.712-1.465 0-2.656 1.187-2.656 2.646 0 .97.533 1.811 1.317 2.271-.052.282-.086.567-.086.857 0 3.911 4.808 7.093 10.719 7.093s10.72-3.182 10.72-7.093c0-.274-.029-.544-.075-.81.832-.447 1.405-1.312 1.405-2.318zm-17.224 1.816c0-.868.71-1.575 1.582-1.575.872 0 1.581.707 1.581 1.575s-.709 1.574-1.581 1.574-1.582-.706-1.582-1.574zm9.061 4.669c-.797.793-2.048 1.179-3.824 1.179l-.013-.003-.013.003c-1.777 0-3.028-.386-3.824-1.179-.145-.144-.145-.379 0-.523.145-.145.381-.145.526 0 .65.647 1.729.961 3.298.961l.013.003.013-.003c1.569 0 2.648-.315 3.298-.962.145-.145.381-.144.526 0 .145.145.145.379 0 .524zm-.189-3.095c-.872 0-1.581-.706-1.581-1.574 0-.868.709-1.575 1.581-1.575s1.581.707 1.581 1.575-.709 1.574-1.581 1.574z"></path>
                      </svg>
                      <span>Share on Reddit</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* <!--Modal footer--> */}
              <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-gray-300 border-opacity-100 p-4 dark:border-opacity-50">
                <button onClick={handleClose}
                  type="button"
                  className="ml-1 inline-block rounded bg-blue-800 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
