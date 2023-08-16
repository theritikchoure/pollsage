import React, { useEffect, useState } from "react";
import { creatorResetPasswordValidation } from "../../../validations/creator_auth";
import { creatorResetPassword } from "../../../services/creator_auth.service";
import { errorToast, successToast } from "../../../utils/toaster";
import links from "../../../utils/nav_link";
import { Link } from "react-router-dom";

const Login = () => {
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    password: "",
    confirm_password: "",
    token: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = window.location.pathname.split("/")[3]; // Extract the verification_token from the URL
    onChangeFormData("token", token); // Save it in state
  }, []);

  // write on change function
  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = creatorResetPasswordValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await creatorResetPassword(formData);
      successToast("Password reset successfully, you can login now");
    } catch (error) {
      errorToast(error);
    } 
  };
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
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
              <div className="mb-8 md:mb-8 text-center">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">Reset your password</h1>
              </div>
              <form onSubmit={onSubmit}>
                <div className="mb-2">
                  <input
                    type="password"
                    placeholder="New password"
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
                    focus:border-primary
                    ${errors.password ? "border-red-500" : ""}`}
                    value={formData.password}
                    onChange={(e) => onChangeFormData("password", e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.password}
                    </p>
                  )}
                </div>
                <div className="mb-2">
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
                    focus:border-primary
                    ${errors.confirm_password ? "border-red-500" : ""}`}
                    value={formData.confirm_password}
                    onChange={(e) => onChangeFormData("confirm_password", e.target.value)}
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
                    value="Reset password"
                    className="
                        bg-blue-600
                        w-full
                        rounded-md
                        border
                        border-primary
                        py-3
                        px-5
                        text-base text-white
                        cursor-pointer
                        hover:bg-opacity-90
                        "
                  />
                </div>
              </form>
              <Link
                to={links.login}
                className="
                  text-base
                  inline-block
                  mb-2
                  text-[#adadad]
                  hover:underline hover:text-primary
                  "
              >
                Sign In
              </Link>
              <p className="text-base text-[#adadad]">
                Not a member yet? &nbsp;
                <a
                  href="/creator/register"
                  className="text-primary hover:underline"
                >
                  Sign Up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
