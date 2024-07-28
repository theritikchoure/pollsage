import React, { useState } from "react";
import { creatorRegisterValidation } from "../../../validations/creator_auth";
import { creatorRegister } from "../../../services/creator_auth.service";
import { errorToast, successToast } from "../../../utils/toaster";
import { Link } from "react-router-dom";
import links from "../../../utils/nav_link";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});

  const [registerSuccess, setRegisterSuccess] = useState(false);

  // write on change function
  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
  };

  const onRegister = async (e) => {
    try {
      e.preventDefault();
      // write validation function
      const { isValid, errors } = creatorRegisterValidation(formData);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await creatorRegister(formData);

      if (res) {
        setFormData({
          name: "",
          email: "",
          password: "",
          confirm_password: "",
        });
        setRegisterSuccess(true);
        successToast("Account created successfully");
      }
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <section
      className="bg-gray-100 py-20 lg:py-[80px]"
      style={{ height: "100vh" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[525px]">
            <div
              className="
               max-w-[525px]
               mx-auto
               text-center
               bg-white
               rounded-lg
               relative
               overflow-hidden
               py-16
               px-10
               sm:px-12
               md:px-[60px]
               "
            >
              <div className="mb-4 md:mb-8 text-center">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">
                  Sign up to your pollsage account
                </h1>
              </div>
              {registerSuccess && (
                <p className="mb-4 text-green-600">
                  Please verify your email before proceeding. Check your inbox
                  for a verification email.
                </p>
              )}
              <form onSubmit={onRegister}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className={`w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color
                        placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ${
                          errors.name ? "border-red-500" : "border-[#E9EDF4]"
                        }`}
                    value={formData.name}
                    onChange={(e) => onChangeFormData("name", e.target.value)}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Email"
                    className={`w-full rounded-md border bordder-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color
                        placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ${
                          errors.email ? "border-red-500" : "border-[#E9EDF4]"
                        }`}
                    value={formData.email}
                    onChange={(e) => onChangeFormData("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-2">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full
                    rounded-md
                    border
                    bordder-[#E9EDF4]
                    py-3
                    px-5
                    bg-[#FCFDFE]
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary ${
                      errors.password ? "border-red-500" : "border-[#E9EDF4]"
                    }`}
                    value={formData.password}
                    onChange={(e) =>
                      onChangeFormData("password", e.target.value)
                    }
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={`w-full
                    rounded-md
                    border
                    bordder-[#E9EDF4]
                    py-3
                    px-5
                    bg-[#FCFDFE]
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary ${
                      errors.confirm_password
                        ? "border-red-500"
                        : "border-[#E9EDF4]"
                    }`}
                    value={formData.confirm_password}
                    onChange={(e) =>
                      onChangeFormData("confirm_password", e.target.value)
                    }
                  />
                  {errors.confirm_password && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.confirm_password}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign Up"
                    className="bg-blue-600 w-full rounded-md border border-primary py-3 px-5 text-base text-white
                        cursor-pointer hover:bg-opacity-90"
                  />
                </div>
              </form>

              <p className="text-base text-[#adadad]">
                Already a member? &nbsp;
                <Link
                 to={links.login}
                  className="text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
