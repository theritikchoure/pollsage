import React, { useState } from "react";
import PageDetails from "../../../components/_page_details";
import { createAccessTokenValidation } from "../../../validations/access_token";
import { errorToast, loadingToast, successToast } from "../../../utils/toaster";
import { createAccessToken } from "../../../services/admin/access_token.service";
import { useNavigate } from "react-router-dom";

const CreateAccessToken = () => {
    const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    purpose: "",
    team: "internal_developers",
    expiration_time: "1h",
    methods: [],
    routes: [],
    is_active: false,
  });

  const [loading, setLoading] = useState(false);

  const onChangeFormData = (key, value) => {
    if (key === "methods") {
      console.log(value);
      const index = formData.methods.indexOf(value[0]);
      if (index > -1) {
        formData.methods.splice(index, 1);
      } else {
        formData.methods.push(value[0]);
      }

      setFormData({
        ...formData,
        [key]: formData.methods,
      });

      return;
    }

    if (key === "routes") {
      const index = formData.routes.indexOf(value[0]);
      if (index > -1) {
        formData.routes.splice(index, 1);
      } else {
        formData.routes.push(value[0]);
      }

      setFormData({
        ...formData,
        [key]: formData.routes,
      });

      return;
    }

    if(key === 'expiration_time') {
        value = value + 'h';
    }

    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
        e.preventDefault();
      setLoading(true);
      const { isValid, errors } = createAccessTokenValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        setLoading(false);
        return;
      }

      setErrors({});

      loadingToast("Creating token...");

      // write api call here
      let res = await createAccessToken(formData);

      if (res) {
        setLoading(false);
        successToast("Poll created successfully.");
        navigate("/admin/tokens/list");
      }

      return;
    } catch (error) {
      errorToast(error.message || error);
      setLoading(false);
    }
  };

  return (
    <>
      <PageDetails
        title="Create Access Token - PollSage"
        description="Create Poll"
      />
      <h1 className="text-slate-800 dark:text-slate-100 font-bold text-3xl">
        Create Access Token
      </h1>
      <div className="mt-4">
        {/* //form */}
        <form>
          <div className="mb-4 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <label
                htmlFor="purpose"
                className="mb-2.5 block text-black dark:text-white"
              >
                Purpose
              </label>
              <input
                type="text"
                id="purpose"
                placeholder="Enter your purpose"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.purpose
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
                value={formData.purpose || ""}
                onChange={(e) => onChangeFormData("purpose", e.target.value)}
              />
              {errors.purpose && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.purpose}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label className="mb-2.5 block text-black dark:text-white">
                Team
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  className={`relative z-20 w-full appearance-none rounded border border-gray-600 
                          bg-gray-800 py-3 px-5 outline-none transition focus:border-primary active:border-primary 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${errors.team ? "border-red-500" : "border-gray-600"}`}
                  value={formData.team}
                  onChange={(e) =>
                    onChangeFormData("team", e.target.value)
                  }
                >
                  <option value={"internal_developers"}>
                    Internal Developers
                  </option>
                  <option value={"testing_team"}>Testing Team</option>
                  <option value={"data_science"}>Data Science Team</option>
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
              {errors.team && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.team}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/3">
              <label
                htmlFor="expiration_time"
                className="mb-2.5 block text-black dark:text-white"
              >
                Expiration time (in hours)
              </label>
              <input
                type="number"
                id="expiration_time"
                max={24}
                min={1}
                placeholder="Enter your question"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
                          transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                          dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                          ${
                            errors.expiration_time
                              ? "border-red-500"
                              : "border-gray-600"
                          }`}
                value={formData.expiration_time?.replace('h', '') || ""}
                onChange={(e) => onChangeFormData("expiration_time", e.target.value)}
              />
              {errors.expiration_time && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.expiration_time}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="methods"
                className="mb-2.5 block text-black dark:text-white"
              >
                Request Methods
              </label>
              <select
                id="methods"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
            ${errors.methods ? "border-red-500" : "border-gray-600"}`}
                multiple
                value={formData.methods || []}
                onChange={(e) =>
                  onChangeFormData(
                    "methods",
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
              {errors.methods && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  {errors.methods}
                </p>
              )}
            </div>
            <div className="w-full xl:w-1/2">
              <label
                htmlFor="routes"
                className="mb-2.5 block text-black dark:text-white"
              >
                Request Routes
              </label>
              <select
                id="routes"
                className={`w-full rounded border-[1.5px] bg-transparent py-3 px-5 font-medium outline-none 
            transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
            dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
            ${errors.routes ? "border-red-500" : "border-gray-600"}`}
                multiple
                value={formData.routes || []}
                onChange={(e) =>
                  onChangeFormData(
                    "routes",
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
              >
                <option value="/api/v1/polls">/polls</option>
                <option value="/comments">/comments</option>
              </select>
              {errors.routes && (
                <p className="text-red-500 text-sm mt-1 text-left italic">
                  {errors.routes}
                </p>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label className="mb-2.5 block text-black dark:text-white">
              Token active status (Recommended: only active when token is shared
              with the team)
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
          {/* submit button */}
          <div className="flex justify-center border-t pt-8 mt-10">
            <button
              type="submit"
              onClick={onSubmit}
              className="w-full md:w-auto bg-indigo-500 text-white rounded py-3 px-6 font-medium"
            >
              Create Access Token
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAccessToken;
