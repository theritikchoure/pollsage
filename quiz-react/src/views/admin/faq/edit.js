import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { getPollById, updatePoll } from "../../../services/admin/faq.service";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
} from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";

const CreatePoll = () => {
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pId) => {
    try {
      // load the poll
      const id = window.location.pathname.split("/")[4];
      let res = await getPollById(id);
      if(res.data) {
        setFormData(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // write on change function
  const onChangeFormData = (key, value, index = null) => {
    if (!key) return;

    if (key === "options") {
      let options = [...formData.options];
      options[index].text = value;
      setFormData({ ...formData, options });
      return;
    }

    if(key === 'password') {
      value = !value ? null : value;
    }

    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const addOption = (e) => {
    e.preventDefault();
    setFormData((prevState) => {
      return {
        ...prevState,
        options: [...prevState.options, { text: "" }],
      };
    });
  };

  const removeOption = (index) => {
    setFormData((prevState) => {
      const updatedOptions = [...prevState.options];
      updatedOptions.splice(index, 1);
      return {
        ...prevState,
        options: updatedOptions,
      };
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(formData);
      const { isValid, errors } = createPollValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        setLoading(false);
        return;
      }

      setErrors({});

      loadingToast("Updating poll...");

      let pollId = formData.pollId;
      delete formData.pollId;
      delete formData._id;

      // write api call here
      let res = await updatePoll(pollId, formData);

      if (res) {
        setFormData(initialState);
        setLoading(false);
        dismissToast();
        successToast("Poll updated successfully.");
        navigate("/creator/polls");
      }

      return;
    } catch (error) {
      dismissToast();
      errorToast(error.message ? error.message : error);
      setLoading(false);
    }
  };

  return (
    <>
      <PageDetails title="Create Poll - PollSage" description="Create Poll" />
      <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
        Edit FAQ
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
                submitButtonText={"Update FAQ"}
                otherData={otherData}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
