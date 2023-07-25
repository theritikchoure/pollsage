import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../../validations/poll";
import { createPoll } from "../../../../services/creator/poll.service";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
} from "../../../../utils/toaster";
import PageDetails from "../../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";

const CreateMailTemplate = () => {
  const navigate = useNavigate();
  const initialState = {
    question: null,
    allow_multiple_selection: false,
    description: null,
    options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
    publish_status: "published",
    start_date: null,
    end_date: null,
    result_visibility: "public",
    password: null,
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [mailContent, setMailContent] = useState("");

  const [errors, setErrors] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false);

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

  // write on change function
  const onChangeFormData = (key, value, index = null) => {
    if (!key) return;

    if (key === "options") {
      let options = [...formData.options];
      options[index].text = value;
      setFormData({ ...formData, options });
      return;
    }

    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const { isValid, errors } = createPollValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        setLoading(false);
        return;
      }

      setErrors({});

      loadingToast("Creating poll...");

      // write api call here
      let res = await createPoll(formData);

      if (res) {
        setFormData(initialState);
        setRegisterSuccess(true);
        setLoading(false);
        dismissToast();
        successToast("Poll created successfully.");
        navigate("/creator/polls");
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
            <div className="flex flex-col gap-9">
              <div className="rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Create mail template
                  </h3>
                </div>
                <Form
                  formData={formData}
                  errors={errors}
                  onChangeFormData={onChangeFormData}
                  onSubmit={onSubmit}
                  mailContent={mailContent}
                  setMailContent={setMailContent}
                  submitButtonText={"Create poll"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMailTemplate;
