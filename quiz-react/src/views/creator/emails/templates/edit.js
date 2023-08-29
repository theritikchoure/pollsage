import React, { Fragment, useEffect, useState } from "react";
import { emailTemplateValidation } from "../../../../validations/email_template.js";
import { getEmailTemplateById, updateEmailTemplateById } from "../../../../services/creator/email_template.service.js";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
  warningToast,
} from "../../../../utils/toaster";
import PageDetails from "../../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";

const CreateMailTemplate = () => {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    subject: "",
    html_content: "",
    css_content: "",
    is_active: false,
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [mailContent, setMailContent] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

  useEffect(() => {
    loadData()
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isFormDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isFormDirty]);

  // useEffect to set mail content in iframe
  useEffect(() => {
    const html = `<html>
    <head>
      <style>
        ${formData.css_content}
      </style>
    </head>
    <body>
      ${formData.html_content}
    </body>
  </html>`;

    const iframe = document.getElementById("previewFrame");
    const iframeContentWindow = iframe.contentWindow;
    const iframeDocument = iframeContentWindow.document;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();
  }, [formData]);

  const loadData = async () => {
    try {
      setLoading(true);
      const id = window.location.pathname.split("/")[5];
      console.log(id);
      let res = await getEmailTemplateById(id);
      delete res.data.createdAt;
      delete res.data.updatedAt;
      setFormData(res.data);
      setLoading(false);
    } catch (error) {
      errorToast(error.message);
      setLoading(false);
    }
  };

  // write on change function
  const onChangeFormData = (key, value, index = null) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log(formData);

      setLoading(true);
      const { isValid, errors } = emailTemplateValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        setLoading(false);
        return;
      }

      setErrors({});

      loadingToast("Creating template...");

      let id = formData._id;
      delete formData._id;
      delete formData.is_approved;

      // write api call here
      let res = await updateEmailTemplateById(id, formData);

      if (res) {
        setFormData(initialState);
        setLoading(false);
        dismissToast();
        successToast("Template updated successfully");
        navigate("/creator/emails/template/list");
      }

      return;
    } catch (error) {
      dismissToast();
      errorToast(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <PageDetails
        title="Create Mail Template - PollSage"
        description="Create Mail Template"
      />
      <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="">
            <div className="flex flex-col gap-6 xl:flex-row mb-4">
              <div className="w-full xl:w-1/2 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Edit mail template
                  </h3>
                </div>
                <Form
                  formData={formData}
                  errors={errors}
                  onChangeFormData={onChangeFormData}
                  onSubmit={onSubmit}
                  mailContent={mailContent}
                  setMailContent={setMailContent}
                  submitButtonText={"Update template"}
                />
              </div>
              <div className="w-full xl:w-1/2 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                <iframe
                  id="previewFrame"
                  style={{
                    width: "100%",
                    height: "100%",
                    border: "1px solid #ccc",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMailTemplate;
