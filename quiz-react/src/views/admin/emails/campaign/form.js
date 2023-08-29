import React from "react";

const Form = ({
  formData,
  errors,
  onChangeFormData,
  onSubmit,
  submitButtonText,
}) => {

    // Get the current date and time in the correct format
  const getCurrentDateAndTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    console.log(minutes);
    
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <form>
      <div className="">
        <div className="mb-4 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/3">
            <label
              htmlFor="title"
              className="mb-2.5 block text-black dark:text-white"
            >
              Name
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter campaign name"
              className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.name ? "border-red-500" : "border-gray-600"
                          }`}
              value={formData.name || ""}
              onChange={(e) => onChangeFormData("name", e.target.value)}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 text-left">
                {errors.name}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/3">
            <label className="mb-2.5 block text-black dark:text-white">
              Template
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
        <div className="w-full">
          <label
            htmlFor="recipient_list"
            className="mb-2.5 block text-black dark:text-white"
          >
            Recipient List (CSV)
          </label>
          <textarea
            type="text"
            id="recipient_list"
            placeholder={`email,firstName,lastName,age
john.doe@example.com,John,Doe,35
jane.smith@example.com,Jane,Smith,28
mike.johnson@example.com,Mike,Johnson,45
susan.brown@example.com,Susan,Brown,31`}
            rows={10}
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                            ${
                              errors.recipient_list
                                ? "border-red-500"
                                : "border-gray-600"
                            }`}
            value={formData.recipient_list || ""}
            onChange={(e) => onChangeFormData("recipient_list", e.target.value)}
          />
          {errors.recipient_list && (
            <p className="text-red-500 text-sm mt-1 text-left">
              {errors.recipient_list}
            </p>
          )}
        </div>

        <div className="mb-4 mt-4 flex flex-col gap-6 xl:flex-row">
          <div className="w-full xl:w-1/6">
            <label
              htmlFor="title"
              className="mb-2.5 block text-black dark:text-white"
            >
              Sending Time
            </label>
          </div>
          <div className="w-full xl:w-1/6">
            <input
              type="radio"
              id="option1"
              name="options"
              value="draft"
              className="h-3 w-3 border-gray-600 rounded-full focus:ring-2 focus:ring-primary"
              checked={formData.selectedOption === "draft"}
              onChange={(e) =>
                onChangeFormData("selectedOption", e.target.value)
              }
            />
            <label htmlFor="option1" className="ml-2 text-gray-300">
              Draft
            </label>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.title}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/6">
            <input
              type="radio"
              id="option1"
              name="options"
              value="now"
              className="h-3 w-3 border-gray-600 rounded-full focus:ring-2 focus:ring-primary"
              checked={formData.selectedOption === "now"}
              onChange={(e) =>
                onChangeFormData("selectedOption", e.target.value)
              }
            />
            <label htmlFor="option1" className="ml-2 text-gray-300">
              Send now
            </label>
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.title}
              </p>
            )}
          </div>
          <div className="w-full xl:w-1/3">
            <input
              type="radio"
              id="option2"
              name="options"
              value="scheduled"
              className="h-3 w-3 border-gray-600 rounded-full focus:ring-2 focus:ring-primary"
              checked={formData.selectedOption === "option1"}
              onChange={(e) =>
                onChangeFormData("selectedOption", e.target.value)
              }
            />
            <label htmlFor="option2" className="ml-2 text-gray-300">
              Schedule campaign on
            </label>
            <input
                  type="datetime-local"
                  className="ml-3 px-2 bg-slate-800 border border-gray-600 rounded text-white text-sm w-44 h-8 focus:border-transparent"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                  min={getCurrentDateAndTime()}
                />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1 text-left italic">
                {errors.title}
              </p>
            )}
          </div>
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

export default Form;
