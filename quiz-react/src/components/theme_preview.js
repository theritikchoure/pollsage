import React, { Fragment, useEffect } from "react";
import { formattedDateFromNow } from "../helpers/common";
import { Link } from "react-router-dom";

const ThemePreview = ({ selectedTheme }) => {
  const poll = {
    question: "What is your favorite programming language?",
    createdAt: "2021-08-01T00:00:00.000Z",
    options: [
      {
        _id: "1",
        text: "JavaScript",
      },
      {
        _id: "2",
        text: "Python",
      },
    ],
    allow_multiple_selection: false,
  };

  const comments = [
    {
      _id: "1",
      display_name: "John Doe",
      comment: "This is a comment",
      createdAt: "2021-08-01T00:00:00.000Z",
    },
  ]

  useEffect(() => {
    if (!selectedTheme) return;
    let theme;
    if (typeof selectedTheme === "string") {
      theme = JSON.parse(selectedTheme)?.colors;
    } else {
      theme = selectedTheme?.colors;
    }

    const pollContainer = document.getElementById("poll-container-preview");
    const pollBox = document.getElementById("poll-box");
    const pollQuestion = document.getElementById("poll-question");
    const pollOptions = document.getElementsByClassName("poll-option");
    const voteButton = document.getElementById("vote-button");
    const oneVoteMsg = document.getElementById("one-vote-msg-preview");

    // comment 
    const commentBox = document.getElementById("comment-box");

    // get input-field class name
    const inputFields = document.getElementsByClassName("input-field");
    const formLabel = document.getElementsByClassName("form-label");

    console.log(pollOptions);

    // // map  with selected theme
    pollContainer.style.backgroundColor = theme.pollContainerBackgroundColor;
    pollBox.style.backgroundColor = theme.pollBoxBackgroundColor;
    pollQuestion.style.color = theme.pollQuestionColor;
    for (let i = 0; i < pollOptions.length; i++) {
      pollOptions[i].style.color = theme.pollOptionsLabelColor;
    }
    voteButton.style.backgroundColor = theme.voteButtonBackgroundColor;
    oneVoteMsg.style.color = theme.pollQuestionColor;
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].style.color = theme.inputFieldColor;
    }
    for (let i = 0; i < formLabel.length; i++) {
      formLabel[i].style.color = theme.formLabelColor;
    }

    // comment
    commentBox.style.backgroundColor = theme.pollBoxBackgroundColor;
    if(theme.is_dark_theme) {
      commentBox.style.border = "1px solid black";
    } else {
      commentBox.style.border = "none";
    }
  }, [selectedTheme]);

  return (
    <div className="mb-4">
      <h2 className="text-black dark:text-white mb-2.5">Theme Preview</h2>
      {/* Replace the following div with your actual poll preview */}
      <Fragment>
        <div
          className="min-h-screen bg-gray-900 p-0 p-12"
          id="poll-container-preview"
        >
          <div
            className="mx-auto max-w-md px-6 py-12 bg-gray-800 border-0 shadow-lg rounded-xl"
            id="poll-box"
          >
            <h1
              className="text-2xl font-bold mb-4 text-gray-100"
              id="poll-question"
            >
              {poll.question}
            </h1>
            <p className="text-gray-400 mb-4">
              Poll created {formattedDateFromNow(poll.createdAt)}
            </p>

            <div id="preview-form">
              {!poll.allow_multiple_selection && (
                <fieldset
                  className="relative z-0 w-full p-px mb-2"
                  id="poll-options"
                >
                  <div className="block pt-3 pb-2">
                    {poll.options.map((option, index) => (
                      <div className="mb-4" key={index}>
                        <label className="text-gray-100 cursor-pointer poll-option">
                          <input
                            type="radio"
                            name="radio"
                            value={option._id}
                            className="mr-2 text-gray-100 border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                          />
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="mb-4">
                <label className="mb-2.5 block text-black dark:text-white form-label">
                  Require participant's name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className={`w-full rounded border-[1.5px] text-gray-100 bg-transparent py-3 px-5 font-medium 
                      outline-none transition focus:border-primary active:border-primary disabled:cursor-default 
                      disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                      input-field border-gray-600`}
                />
              </div>

              <input
                id="vote-button"
                type="submit"
                value={"Vote"}
                disabled={true}
                className="w-full px-6 py-3 mt-3 text-lg text-white cursor-pointer transition-all duration-150 ease-linear rounded-lg shadow outline-none bg-pink-500 hover:bg-pink-600 hover:shadow-lg focus:outline-none"
              />

              <div className="block mt-5">
                <div className="sm:flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Link
                      to={"#"}
                      className="w-full sm:w-40 flex bg-gray-300 text-black px-5 py-2 rounded items-center"
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
                    </Link>
                  </div>
                  <button
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
            </div>
          </div>
          <div
            className="flex justify-center items-center mt-5 text-gray-100"
            id="one-vote-msg-preview"
          >
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
          <section className="max-w-md mx-auto mt-5">
            <div
              className="bg-gray-800 custom-box border border-gray-600 sm:border-x sm:rounded-md overflow-hidden"
              id="comment-box"
            >
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="comment-heading"
                  className="text-lg text-gray-900 dark:text-gray-200 custom-title font-medium flex items-center"
                >
                  <svg
                    className="h-5 w-5 -ml-1 mr-2 text-gray-400 custom-text comment-svg-color"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    stroke=""
                  >
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"></path>
                    <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"></path>
                  </svg>

                  <span>Comments</span>
                </h2>
              </div>

              {/* if no comments then show this */}
              {comments &&  (
                <div className="border-t border-gray-300 dark:border-gray-700 custom-border">
                  <div className="px-4 py-6 sm:px-6 border-b border-gray-300 dark:border-gray-700 custom-border">
                    <div className="rounded-md bg-gray-700 p-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <svg
                            className="h-5 w-5 text-blue-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            stroke=""
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm text-gray-400">
                            <p>No comments yet. Be the first to write one!</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Comment form */}
              <div className="px-4 py-6 sm:px-6 border-t border-gray-600">
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                      <svg
                        className="h-6 w-6 "
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        stroke=""
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <form className="space-y-3">
                      <div>
                        <label htmlFor="name" className="sr-only">
                          Name
                        </label>
                        <input
                          type="text"
                          name="display_name"
                          className={`w-full text-gray-200 rounded border-[1.5px]  bg-transparent py-3 px-5 
                    outline-none transition focus:border-primary active:border-primary disabled:cursor-default 
                    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                    input-field`}
                          placeholder="Enter your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="comment" className="sr-only">
                          Comment
                        </label>
                        <textarea
                          id="comment"
                          name="comment"
                          rows="3"
                          className={`w-full text-gray-200 rounded border-[1.5px] bg-transparent py-3 px-5 
                    outline-none transition focus:border-primary active:border-primary disabled:cursor-default 
                    disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                    input-field`}
                          placeholder="Add a comment"
                        ></textarea>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <input
                          type="submit"
                          value="Post comment"
                          id="post-comment-button"
                          className="bg-gray-900 cursor-pointer border border-gray-600 px-5 py-2 rounded text-white flex items-center hover:bg-gray-800"
                        />
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              {comments && comments.length > 0 && (
                <ul className="px-4 py-6 pb-0 sm:px-6 border-b border-t border-gray-300 border-gray-300 dark:border-gray-700 custom-border">
                  {comments.map((comment, index) => (
                    <li key={index} className="mb-8">
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                            <svg
                              className="h-6 w-6 "
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              stroke=""
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-sm">
                            <span className="flex items-center space-x-2">
                              <span className="text-gray-200 comment-name">
                                {comment.display_name}
                              </span>

                              <span className="inline-flex text-gray-600 items-center rounded-full font-medium bg-gray-300 text-gray-800 dark-bg-opacity-gray px-2 py-0.5 text-xs">
                                Guest
                              </span>
                            </span>
                          </div>
                          <div>
                            <div className="mt-1 text-sm text-gray-700 dark:text-gray-300 custom-text comment-text">
                              <p>{comment.comment}</p>
                            </div>
                            <div className="mt-2 text-sm space-x-2">
                              <span className="text-gray-500 custom-text font-medium">
                                {formattedDateFromNow(comment.createdAt)}
                              </span>
                              <span className="text-gray-500 custom-text font-medium">
                                ·
                              </span>
                              <button
                                type="button"
                                className="text-gray-900 dark:text-gray-200 custom-title font-medium"
                              >
                                Reply
                              </button>
                              <span className="space-x-2">
                                <span className="text-gray-500 font-medium">
                                  ·
                                </span>
                                <button
                                  type="button"
                                  className="text-gray-900 dark:text-gray-200 font-medium"
                                >
                                  Like
                                </button>
                                {/* <span className="text-gray-500 font-medium">·</span>
                          <button
                            type="button"
                            className="text-gray-900 dark:text-gray-200 font-medium"
                          >
                            Delete
                          </button> */}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="flex items-center justify-center py-5">
                <button
                  type="button"
                  className="inline-flex text-gray-100 items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-100 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Load more
                </button>
              </div>
            </div>
          </section>
        </div>
      </Fragment>
    </div>
  );
};

export default ThemePreview;
