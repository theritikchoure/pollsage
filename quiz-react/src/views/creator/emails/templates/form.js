import React from "react";

const MailTemplateForm = ({
  formData,
  errors,
  onChangeFormData,
  onSubmit,
  submitButtonText,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="p-6">
        <div className="mb-4">
          <label
            htmlFor="question"
            className="mb-2.5 block text-black dark:text-white required-field"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter template title"
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

        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white required-field"
            htmlFor="subject"
          >
            Subject line
          </label>
          <input
            type="text"
            id="subject"
            placeholder="Enter your subject"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.subject
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
            value={formData.subject || ""}
            onChange={(e) => onChangeFormData("subject", e.target.value)}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1 text-left italic">
              {errors.subject}
            </p>
          )}
        </div>

        {/* is_active status input field*/}
        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white"
            htmlFor="is_active"
          >
            Status
          </label>
          <select
            id="is_active"
            className={`w-full rounded border-[1.5px] bg-gray-800 py-3 px-5 font-medium outline-none
              transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
              dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
              ${errors.is_active ? "border-red-500" : "border-gray-600"}`}
            value={formData.is_active}
            onChange={(e) => onChangeFormData("is_active", e.target.value)}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white required-field"
            htmlFor="html_content"
          >
            HTML Content
          </label>
          <textarea
            id="html_content"
            placeholder="Enter your mail content"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none
              transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
              dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
              ${errors.html_content ? "border-red-500" : "border-gray-600"}`}
            value={formData.html_content || ""}
            onChange={(e) => onChangeFormData("html_content", e.target.value)}
          />

          {errors.html_content && (
            <p className="text-red-500 text-sm mt-1 text-left italic">
              {errors.html_content}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white"
            htmlFor="css_content"
          >
            CSS Content
          </label>
          <textarea
            id="css_content"
            placeholder="Enter your mail content"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none
              transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
              dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
              ${errors.css_content ? "border-red-500" : "border-gray-600"}`}
            value={formData.css_content || ""}
            onChange={(e) => onChangeFormData("css_content", e.target.value)}
          />

          {errors.css_content && (
            <p className="text-red-500 text-sm mt-1 text-left italic">
              {errors.css_content}
            </p>
          )}
        </div>

        <div className="mb-4 flex flex-col gap-6 xl:flex-row">
          <input
            type="submit"
            value={submitButtonText}
            className="flex cursor-pointer w-full justify-center rounded bg-gray-900 border border-gray-600 hover:bg-gray-900 p-3 font-medium text-gray"
          />
        </div>
      </div>
    </form>
  );
};

export default MailTemplateForm;
