import React, { Fragment, useEffect, useState } from "react";
import { createPollValidation } from "../../../validations/poll";
import { createPoll } from "../../../services/creator/poll.service";
import {
  dismissToast,
  errorToast,
  loadingToast,
  successToast,
} from "../../../utils/toaster";
import PageDetails from "../../../components/_page_details";
import { useNavigate } from "react-router-dom";
import Form from "./form";
import { getPoll, updatePoll } from "../../../services/creator/poll.service";
import { getAllThemesForForm } from "../../../services/creator/theme.service";
import StepProgressBar from "../../../components/stepper";

const CreatePoll = () => {
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
    theme: "dark",
  };
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const additionalFeatureInitialState = {
    startDate: "",
    endDate: "",
  };

  const [minPollEndDate, setMinPollEndDate] = useState(
    new Date().toISOString().slice(0, 16)
  );

  const [errors, setErrors] = useState({});

  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [additionalFeatures, setAdditionalFeatures] = useState(false);

  const [booleanValue, setBooleanValue] = useState({
    showDescription: false,
    showPassword: false,
    showAdvancedSettings: false,
  });
  const [themeSetting, setThemeSetting] = useState({
    theme: "dark",
  });

  const [isFormDirty, setIsFormDirty] = useState(false);

  const [step, setStep] = useState(1);

  // load themes from api
  const [themes, setThemes] = useState([]);
  useEffect(() => {
    const fetchThemes = async () => {
      try {
        let res = await getAllThemesForForm();
        let themes = separateThemesByDarkness(res.data); // separate themes by darkness
        console.log(themes);
        setThemes(themes);
      } catch (error) {
        errorToast(error.message);
      }
    };
    fetchThemes();
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

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async (pId) => {
    try {
      // load the poll
      const id = window.location.pathname.split("/")[3];
      let res = await getPoll(id);
      delete res.data.createdAt;
      delete res.data.updatedAt;
      setFormData(res.data);
      if (res.data.description) {
        setBooleanValue({ ...booleanValue, showDescription: true });
      }

      if (res.data.password || res.data.start_date || res.data.end_date) {
        setAdditionalFeatures(true);

        if (res.data.password) {
          setBooleanValue({ ...booleanValue, showPassword: true });
        }

        if (res.data.start_date) {
          setMinPollEndDate(res.data.start_date);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const separateThemesByDarkness = (themes) => {
    const dark_themes = [];
    const light_themes = [];

    themes.forEach((theme) => {
      if (theme.is_dark_theme) {
        dark_themes.push(theme);
      } else {
        light_themes.push(theme);
      }
    });

    return {
      dark_themes,
      light_themes,
    };
  };

  // write on change booleanValue
  const onChangeBooleanValue = (key, value) => {
    if (!key) return;
    setBooleanValue({ ...booleanValue, [key]: value });
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

    if (key === "password") {
      value = !value ? null : value;
    }

    console.log(key, value);
    setFormData({ ...formData, [key]: value });
    setIsFormDirty(true);
  };

  const onChangeThemeSetting = (key, value) => {
    if (!key) return;

    setThemeSetting({ ...formData, [key]: value });
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

      let payload = {
        ...formData,
        selected_theme: JSON.parse(themeSetting.selectedTheme)._id,
      };

      // write api call here
      let res = await updatePoll(pollId, payload);

      if (res) {
        setFormData(initialState);
        setRegisterSuccess(true);
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
      <h1 className="text-slate-800 font-bold text-3xl">Edit Poll</h1>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="">
          <div className="flex flex-col gap-9">
            <div className="shadow-default dark:border-strokedark dark:bg-boxdark">
              <Form
                formData={formData}
                errors={errors}
                onChangeFormData={onChangeFormData}
                onSubmit={onSubmit}
                booleanValue={booleanValue}
                onChangeBooleanValue={onChangeBooleanValue}
                additionalFeatures={additionalFeatures}
                setAdditionalFeatures={setAdditionalFeatures}
                handleOptionChange={handleOptionChange}
                addOption={addOption}
                addOtherOption={addOtherOption}
                removeOption={removeOption}
                minPollEndDate={minPollEndDate}
                setMinPollEndDate={setMinPollEndDate}
                submitButtonText={"Update poll"}
                step={step}
                setStep={setStep}
                totalSteps={3}
                handleStepChange={handleStepChange}
                themes={themes}
                themeSetting={themeSetting}
                onChangeThemeSetting={onChangeThemeSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePoll;
