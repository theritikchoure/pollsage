import React from "react";
import { Link } from "react-router-dom";
import ThemePreview from "../../../components/theme_preview";

const PollForm = ({
  formData,
  errors,
  onChangeFormData,
  onSubmit,
  booleanValue,
  onChangeBooleanValue,
  handleOptionChange,
  addOption,
  addOtherOption,
  removeOption,
  minPollEndDate,
  setMinPollEndDate,
  submitButtonText,
  step,
  setStep,
  totalSteps,
  handleStepChange,
  themes,
}) => {
  return (
    <form>
      <div className="p-6">
        <div className="mb-4 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label
              htmlFor="theme_name"
              className="mb-2.5 block text-black dark:text-white"
            >
              Theme name
            </label>
            <input
              type="text"
              id="theme_name"
              placeholder="Enter your theme name"
              className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.theme_name
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
              value={formData.theme_name || ""}
              onChange={(e) => onChangeFormData("theme_name", e.target.value)}
            />
            {errors.theme_name && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.theme_name}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/3">
            <label htmlFor="is_dark_theme" className="mb-2.5 block text-black dark:text-white">
              Is dark theme?
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-gray-600 
                          bg-gray-800 py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                value={formData.is_dark_theme}
                onChange={(e) =>
                  onChangeFormData("is_dark_theme", e.target.value)
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
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
                onChange={(e) =>
                  onChangeFormData("is_active", e.target.value)
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
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

        {/* create 4 column using flex and each column has one input type color */}
        <div className="flex flex-col gap-6 xl:flex-row mb-4">
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="pollContainerBackgroundColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Poll container background color
            </label>
            <input
              type="color"
              id="pollContainerBackgroundColor"
              className={``}
              value={formData.colors.pollContainerBackgroundColor || ""}
              onChange={(e) =>
                onChangeFormData(
                  "pollContainerBackgroundColor",
                  e.target.value, 'colors'
                )
              }
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="pollBoxBackgroundColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Poll box background color
            </label>
            <input
              type="color"
              id="pollBoxBackgroundColor"
              className={``}
              value={formData.colors.pollBoxBackgroundColor || ""}
              onChange={(e) =>
                onChangeFormData("pollBoxBackgroundColor", e.target.value, 'colors')
              }
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="pollQuestionColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Poll question color
            </label>
            <input
              type="color"
              id="pollQuestionColor"
              className={``}
              value={formData.colors.pollQuestionColor || ""}
              onChange={(e) =>
                onChangeFormData("pollQuestionColor", e.target.value, 'colors')
              }
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="formLabelColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Form label color
            </label>
            <input
              type="color"
              id="formLabelColor"
              className={``}
              value={formData.colors.formLabelColor || ""}
              onChange={(e) =>
                onChangeFormData("formLabelColor", e.target.value, 'colors')
              }
            />
          </div>
        </div>

        {/* add remaining fields */}
        <div className="flex flex-col gap-6 xl:flex-row mb-4">
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="pollOptionsLabelColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Poll options label color
            </label>
            <input
              type="color"
              id="pollOptionsLabelColor"
              className={``}
              value={formData.colors.pollOptionsLabelColor || ""}
              onChange={(e) =>
                onChangeFormData("pollOptionsLabelColor", e.target.value, 'colors')
              }
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="voteButtonBackgroundColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Vote button background color
            </label>
            <input
              type="color"
              id="voteButtonBackgroundColor"
              className={``}
              value={formData.colors.voteButtonBackgroundColor || ""}
              onChange={(e) =>
                onChangeFormData("voteButtonBackgroundColor", e.target.value, 'colors')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row mb-4">
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="inputFieldPlaceholderColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Input field placeholder color
            </label>
            <input
              type="color"
              id="inputFieldPlaceholderColor"
              className={``}
              value={formData.colors.inputFieldPlaceholderColor || ""}
              onChange={(e) =>
                onChangeFormData("inputFieldPlaceholderColor", e.target.value, 'colors')}
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="inputFieldColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Input field color
            </label>
            <input
              type="color"
              id="inputFieldColor"
              className={``}
              value={formData.colors.inputFieldColor || ""}
              onChange={(e) =>
                onChangeFormData("inputFieldColor", e.target.value, 'colors')}
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="commentNameColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Comment name color
            </label>
            <input
              type="color"
              id="commentNameColor"
              className={``}
              value={formData.colors.commentNameColor || ""}
              onChange={(e) =>
                onChangeFormData("commentNameColor", e.target.value, 'colors')}
            />
          </div>
          <div className="w-full xl:w-1/4">
            <label
              htmlFor="commentTextColor"
              className="mb-2.5 block text-black dark:text-white"
            >
              Comment text color
            </label>
            <input
              type="color"
              id="commentTextColor"
              className={``}
              value={formData.colors.commentTextColor || ""}
              onChange={(e) =>
                onChangeFormData("commentTextColor", e.target.value, 'colors')}
            />
          </div>
        </div>


        <div className="mb-4 flex flex-col gap-6 xl:flex-row">
          <button
            onClick={onSubmit}
            className="flex cursor-pointer w-full justify-center rounded bg-gray-900 border border-gray-600 hover:bg-gray-900 p-3 font-medium text-gray"
          >
            {submitButtonText}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PollForm;
