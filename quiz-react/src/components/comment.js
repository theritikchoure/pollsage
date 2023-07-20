import React from "react";

const Comment = () => {
  const submitComment = (e) => {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.comment.value);
  };
  return (
    <section className="max-w-md mx-auto mt-5">
      <div className="bg-gray-800 custom-box border border-gray-600 sm:border-x sm:rounded-md overflow-hidden">
        <div class="px-4 py-5 sm:px-6">
          <h2
            id="comments-title"
            class="text-lg text-gray-900 dark:text-gray-200 custom-title font-medium flex items-center"
          >
            <svg
              class="h-5 w-5 -ml-1 mr-2 text-gray-400 custom-text"
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
        <div className="border-t border-gray-300 dark:border-gray-700 custom-border">
          <div class="px-4 py-6 sm:px-6 border-b border-gray-300 dark:border-gray-700 custom-border">
            <div class="rounded-md bg-gray-700 p-4">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <svg
                    class="h-5 w-5 text-blue-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    stroke=""
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                <div class="ml-3">
                  <div class="text-sm text-gray-400">
                    <p>No comments yet. Be the first to write one!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="px-4 py-6 sm:px-6 border-b border-gray-300 dark:border-gray-700 custom-border">
          <li>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <div class="h-10 w-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                  <svg
                    class="h-6 w-6 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    stroke=""
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
              </div>
              <div class="flex-grow">
                <div className="text-sm">
                  <span class="flex items-center space-x-2">
                    <span className="text-gray-200">ritik</span>

                    <span class="inline-flex text-gray-600 items-center rounded-full font-medium bg-gray-300 text-gray-800 dark-bg-opacity-gray px-2 py-0.5 text-xs">
                      Guest
                    </span>
                  </span>
                </div>
                <div>
                  <div class="mt-1 text-sm text-gray-700 dark:text-gray-300 custom-text">
                    <p>good</p>
                  </div>
                  <div className="mt-2 text-sm space-x-2">
                    <span class="text-gray-500 custom-text font-medium">
                      just now
                    </span>
                    <span class="text-gray-500 custom-text font-medium">·</span>
                    <button
                      type="button"
                      class="text-gray-900 dark:text-gray-200 custom-title font-medium"
                    >
                      Reply
                    </button>
                    <span className="space-x-2">
                      <span class="text-gray-500 font-medium">·</span>
                      <button
                        type="button"
                        class="text-gray-900 dark:text-gray-200 font-medium"
                      >
                        Edit
                      </button>
                      <span class="text-gray-500 font-medium">·</span>
                      <button
                        type="button"
                        class="text-gray-900 dark:text-gray-200 font-medium"
                      >
                        Delete
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="px-4 py-6 sm:px-6">
          <div class="flex space-x-3">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center">
                <svg
                  class="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  stroke=""
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <div class="min-w-0 flex-1">
              <form class="space-y-3" onSubmit={submitComment}>
                <div>
                  <label for="name" class="sr-only">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    class="w-full text-gray-200 rounded border-[1.5px] border-gray-600 bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Enter your name"
                    required=""
                  />
                </div>
                <div>
                  <label for="comment" class="sr-only">
                    Comment
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="3"
                    class="w-full text-gray-200 rounded border-[1.5px] border-gray-600 bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    placeholder="Add a comment"
                    x-model="newComment.text"
                    required=""
                  ></textarea>
                </div>
                <div class="mt-3 flex items-center justify-between">
                  <input
                    type="submit"
                    value="Post comment"
                    class="bg-gray-900 cursor-pointer border border-gray-600 px-5 py-2 rounded text-white flex items-center hover:bg-gray-800"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comment;
