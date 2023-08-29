import React, { useEffect, useState } from "react";
import { commentValidation } from "../validations/comment.js";
import { errorToast, successToast } from "../utils/toaster.js";
import { createComment, getComments } from "../services/comment.service.js";
import { getCookie } from "../helpers/cookie.js";
import { formattedDateFromNow } from "../helpers/common.js";

const Comment = ({ pollId }) => {
  const initialState = {
    display_name: "",
    comment: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    loadData();
  }, [page]);

  const loadData = async () => {
    try {
      console.log(page);
      let res = await getComments(pollId, limit, page);
      setComments((prevComments) => [...prevComments, ...res.data.docs]); 
      setLoadMore(res.data.next);
    } catch (error) {
      errorToast(error.message);
    }
  };

  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const submitComment = async (e) => {
    try {
      e.preventDefault();
      console.log(formData);
      const { isValid, errors } = commentValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      let user_info = getCookie("user_info");

      console.log(user_info);

      let res = await createComment(pollId, formData);
      if (res) {
        successToast("Comment added successfully.");
        setFormData(initialState);
        loadData();
      }
    } catch (error) {
      errorToast(error.message);
    }
  };

  const loadMoreComments = async () => {
    setPage(prevPage => prevPage + 1);
  }

  return (
    <section className="max-w-md mx-auto mt-5">
      <div className="bg-gray-800 custom-box border border-gray-600 sm:border-x sm:rounded-md overflow-hidden" id="comment-box" >
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
        {comments && comments.length < 1 && (
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
              <form className="space-y-3" onSubmit={submitComment}>
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
                    input-field
                    ${
                      errors.display_name ? "border-red-500" : "border-gray-600"
                    }`}
                    placeholder="Enter your name"
                    value={formData.display_name}
                    onChange={(e) =>
                      onChangeFormData("display_name", e.target.value)
                    }
                  />
                  {errors.display_name && (
                    <span className="text-red-500 text-xs">
                      {errors.display_name}
                    </span>
                  )}
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
                    input-field
                    ${errors.comment ? "border-red-500" : "border-gray-600"}`}
                    placeholder="Add a comment"
                    onChange={(e) =>
                      onChangeFormData("comment", e.target.value)
                    }
                    value={formData.comment}
                  ></textarea>
                  {errors.comment && (
                    <span className="text-red-500 text-xs">
                      {errors.comment}
                    </span>
                  )}
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
                          <span className="text-gray-500 font-medium">·</span>
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


        {/* load more button */}
        {loadMore && (
          <div className="flex items-center justify-center py-5">
            <button onClick={loadMoreComments}
              type="button"
              className="inline-flex text-gray-100 items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-100 bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Comment;
