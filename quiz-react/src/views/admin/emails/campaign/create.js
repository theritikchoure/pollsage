import React, { Fragment, useEffect, useState } from "react";
import { emailCampaignValidation } from "../../../../validations/email_campaign.js";
import { createPoll } from "../../../../services/admin/faq.service.js";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
} from "../../../../utils/toaster";
import PageDetails from "../../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";

const CreateCampaign = () => {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    tags: [],
    is_active: true,
    faqs: [
      {
        question: "",
        answer: "",
        is_active: true,
      },
    ],
  };
  const [formData, setFormData] = useState(initialState);

  const [otherData, setOtherData] = useState({});

  const [loading, setLoading] = useState(false);

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
  const onChangeFormData = (key, value, index = null, faq = false) => {
    if (!key) return;

    if (key === "tags") {
      // check comma separated
      if (value.includes(",")) {
        let tags = value.split(',').map(tag => tag.trim()).filter(tag => tag !== '');

        setOtherData({ ...otherData, [key]: tags });
      }
    }

    if (faq) {
      let faqs = [...formData.faqs];
      faqs[index][key] = value;
      setFormData({ ...formData, faqs });
      return;
    }

    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const addOption = (e) => {
    e.preventDefault();
    setFormData((prevState) => {
      return {
        ...prevState,
        faqs: [
          ...prevState.faqs,
          { question: "", answer: "", is_active: true },
        ],
      };
    });
  };

  const removeOption = (key, index) => {
    if (key === "tags") {
      // remove from otherData.tags
      let tags = [...otherData.tags];
      tags.splice(index, 1);
      setOtherData({ ...otherData, tags });

      tags = tags.join(', ');
      setFormData({ ...formData, tags });
    }

    if (key === "faqs") {
      setFormData((prevState) => {
        const updatedFaqs = [...prevState.faqs];
        updatedFaqs.splice(index, 1);
        return {
          ...prevState,
          faqs: updatedFaqs,
        };
      });
    }
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(formData);
      const { isValid, errors } = emailCampaignValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        setLoading(false);
        return;
      }

      setErrors({});

      loadingToast("Creating poll...");

      formData.tags = otherData.tags;

      // write api call here
      let res = await createPoll(formData);

      if (res) {
        setFormData(initialState);
        setLoading(false);
        dismissToast();
        successToast("FAQ created successfully.");
        navigate("/admin/faqs/list");
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
      <PageDetails title="Create Poll - PollSage" description="Create Poll" />
      <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
        Add FAQs
      </h1>
      <div className="w-full overflow-hidden rounded-lg shadow-xs mt-6">
        <div className="">
          <div className="flex flex-col gap-9">
            <div className="shadow-default dark:border-strokedark dark:bg-boxdark">
              <Form
                formData={formData}
                errors={errors}
                onChangeFormData={onChangeFormData}
                onSubmit={onSubmit}
                addOption={addOption}
                removeOption={removeOption}
                submitButtonText={"Create Campaign"}
                otherData={otherData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateCampaign;
