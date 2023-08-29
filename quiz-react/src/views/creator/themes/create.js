import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { createPoll } from "../../../services/creator/poll.service";
import { getAllThemes } from "../../../services/creator/theme.service";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
} from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import ThemePreview from "../../../components/theme_preview";

const CreateTheme = () => {
  const navigate = useNavigate();
  const initialState = {
    theme_name: "",
    is_dark_theme: false,
    colors: {
      pollContainerBackgroundColor: "",
      pollBoxBackgroundColor: "",
      pollQuestionColor: "",
      formLabelColor: "",
      pollOptionsLabelColor: "",
      pollOptionsInputColor: "",
      pollOptionsCheckedColor: "",
      voteButtonBackgroundColor: "",
      inputFieldPlaceholderColor: "",
      inputFieldColor: "",
      commentNameColor: "",
      commentTextColor: "",
    },
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [minPollEndDate, setMinPollEndDate] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const [errors, setErrors] = useState({});

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const [booleanValue, setBooleanValue] = useState({
    showDescription: false,
    showPassword: true,
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [step, setStep] = useState(1);

  // load themes from api
  const [themes, setThemes] = useState([]);

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
  const onChangeFormData = (key, value, color = null) => {
    if (!key) return;

    if (color) {
      setFormData((prevState) => {
        return {
          ...prevState,
          colors: {
            ...prevState.colors,
            [key]: value,
          },
        };
      });
      return;
    }

    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const handleOptionChange = (index, value) => {
    setFormData((prevState) => {
      const updatedOptions = [...prevState.options];
      updatedOptions[index].text = value;
      return {
        ...prevState,
        options: updatedOptions,
      };
    });
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

  const addOtherOption = (e) => {
    e.preventDefault();
    addOption(e);
    handleOptionChange(formData.options.length, "Other");
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

  const handleStepChange = (e, step) => {
    e.preventDefault();
    // check if any validation errors
    if (step === 2) {
      const { isValid, errors } = createPollValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      } else {
        setErrors({});
      }
    }
    setStep(step);
  };
  return (
    <>
      <PageDetails title="Create Poll - PollSage" description="Create Poll" />
      <div className="mt-4 mx-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="">
            <div className="flex flex-col gap-6 xl:flex-row mb-4">
              <div className="w-full xl:w-1/2 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                  <h3 className="font-medium text-black dark:text-white">
                    Create Theme
                  </h3>
                </div>
                <Form
                  formData={formData}
                  errors={errors}
                  onChangeFormData={onChangeFormData}
                  onSubmit={onSubmit}
                  booleanValue={booleanValue}
                  handleOptionChange={handleOptionChange}
                  addOption={addOption}
                  addOtherOption={addOtherOption}
                  removeOption={removeOption}
                  minPollEndDate={minPollEndDate}
                  setMinPollEndDate={setMinPollEndDate}
                  submitButtonText={"Create poll"}
                  step={step}
                  setStep={setStep}
                  totalSteps={3}
                  handleStepChange={handleStepChange}
                  themes={themes}
                />
                

              </div>
              <div className="w-full xl:w-1/2 p-8 rounded-sm border border-gray-600 bg-gray-800 shadow-default dark:border-strokedark dark:bg-boxdark">
                <ThemePreview selectedTheme={formData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateTheme;
