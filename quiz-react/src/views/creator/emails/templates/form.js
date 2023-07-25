import React from "react";

const MailTemplateForm = ({
  formData,
  errors,
  onChangeFormData,
  onSubmit,
  mailContent,
  setMailContent,
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
            id="question"
            placeholder="Enter your question"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.question
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
            value={formData.question || ""}
            onChange={(e) => onChangeFormData("question", e.target.value)}
          />
          {errors.question && (
            <p className="text-red-500 text-sm mt-1 text-left italic">
              {errors.question}
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

        <div className="mb-4">
          <label
            className="mb-2.5 block text-black dark:text-white required-field"
            htmlFor="mailContent"
          >
            Mail content
          </label>
          <textarea
            id="mailContent"
            placeholder="Enter your mail content"
            className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none
              transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
              dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
              ${errors.mailContent ? "border-red-500": "border-gray-600"}`}
            value={formData.mailContent || ""}
            onChange={(e) => onChangeFormData("mailContent", e.target.value)}
          />

          {errors.mailContent && (
            <p className="text-red-500 text-sm mt-1 text-left italic">
              {errors.mailContent}
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
