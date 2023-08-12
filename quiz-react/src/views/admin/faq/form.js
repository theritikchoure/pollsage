import React from "react";

const PollForm = ({
  formData,
  errors,
  onChangeFormData,
  onSubmit,
  addOption,
  removeOption,
  submitButtonText,
  otherData,
}) => {
  return (
    <form>
      <div className="">
        <div className="mb-4 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label
              htmlFor="title"
              className="mb-2.5 block text-black dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter your title"
              className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.title ? "border-red-500" : "border-gray-600"
                          }`}
              value={formData.title || ""}
              onChange={(e) => onChangeFormData("title", e.target.value)}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.title}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-2.5 block text-black dark:text-white">
              Tags
            </label>
            <input
              type="text"
              id="tags"
              placeholder="Enter your tags, use comma separated"
              className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.tags ? "border-red-500" : "border-gray-600"
                          }`}
              value={formData.tags || ""}
              onChange={(e) => onChangeFormData("tags", e.target.value)}
            />
            {otherData.tags && (
              <div className="flex flex-wrap gap-2 mt-2">
                {otherData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-indigo-400 text-white rounded-full px-3 py-1 text-sm font-semibold flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="focus:outline-none"
                      onClick={() => removeOption("tags", index)}
                    >
                      <svg
                       className="fill-current w-5 h-5"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L8 9.58579L9.29289 8.29289C9.68342 7.90237 10.3166 7.90237 10.7071 8.29289C11.0976 8.68342 11.0976 9.31658 10.7071 9.70711L9.41421 11L10.7071 12.2929C11.0976 12.6834 11.0976 13.3166 10.7071 13.7071C10.3166 14.0976 9.68342 14.0976 9.29289 13.7071L8 12.4142L6.70711 13.7071C6.31658 14.0976 5.68342 14.0976 5.29289 13.7071C4.90237 13.3166 4.90237 12.6834 5.29289 12.2929L6.58579 11L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill="#FF0000"
                          />
                        </g>
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.tags}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-2.5 block text-black dark:text-white">
              Active status
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-gray-600 
                          bg-gray-800 py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={formData.is_active}
                onChange={(e) => onChangeFormData("is_active", e.target.value)}
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                  className="fill-current"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                      fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div className="mt-3 text-white">Add Questions to FAQ</div>
        <div className="mb-4 mt-4">
          {formData.faqs.map((faq, index) => (
            <div className="my-4">
              <div className="mb-4 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label
                    htmlFor={`question-${index}`}
                    className="mb-2.5 block text-black dark:text-white"
                  >
                    Question
                  </label>
                  <input
                    type="text"
                    id={`question-${index}`}
                    placeholder="Enter your question"
                    className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                            ${
                              errors.question
                                ? "border-red-500"
                                : "border-gray-600"
                            }`}
                    value={faq.question || ""}
                    onChange={(e) =>
                      onChangeFormData("question", e.target.value, index, true)
                    }
                  />
                  {errors.question && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.question}
                    </p>
                  )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Active status
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className="relative z-20 w-full appearance-none rounded border border-gray-600 
                            bg-gray-800 py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      value={faq.is_active}
                      onChange={(e) =>
                        onChangeFormData("is_active", e.target.value, index, true)
                      }
                    >
                      <option value={true}>Active</option>
                      <option value={false}>Inactive</option>
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.8">
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                            fill=""
                          ></path>
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <label
                  htmlFor={`answer-${index}`}
                  className="mb-2.5 block text-black dark:text-white"
                >
                  Answer
                </label>
                <input
                  type="text"
                  id={`answer-${index}`}
                  placeholder="Enter your question"
                  className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                            ${
                              errors.question
                                ? "border-red-500"
                                : "border-gray-600"
                            }`}
                  value={faq.answer || ""}
                  onChange={(e) => onChangeFormData("answer", e.target.value, index, true)}
                />
                {errors.question && (
                  <p className="text-red-500 text-sm mt-1 text-left italic">
                    {errors.question}
                  </p>
                )}
              </div>
              {/* Remove FAQ  */}
              <p
                className="text-red-700 cursor-pointer mt-2"
                onClick={() => removeOption("faqs", index)}
              >
                Remove Question
              </p>
            </div>
          ))}
          <button
            className="text-gray-200 font-bold bg-indigo-500 px-4 py-2 rounded"
            onClick={addOption}
          >
            + Add Question
          </button>
        </div>

        <div className="mb-4 flex flex-col gap-6 xl:flex-row border-t pt-8 mt-10">
          <div className="mb-4 flex flex-col gap-6 xl:flex-row">
            <button
              onClick={onSubmit}
              className="flex mx-auto cursor-pointer w-full justify-center rounded bg-gray-900 border border-gray-600 hover:bg-gray-900 p-3 font-medium text-gray"
            >
              {submitButtonText}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PollForm;
