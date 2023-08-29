import React, { useState } from "react";
import { creatorForgetPasswordValidation } from "../../../validations/creator_auth";
import { creatorForgetPassword } from "../../../services/creator_auth.service";
import { errorToast, successToast } from "../../../utils/toaster";
import links from "../../../utils/nav_link";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState('');

  // write on change function
  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = creatorForgetPasswordValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await creatorForgetPassword(formData);
    } catch (error) {
      // errorToast(error);
    } finally {
      setFormData({
        email: "",
      });
      setMessage('If account is found then reset password link will be sent on that email address');
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
                <h1 className="text-lg mt-5">Forgot your password?</h1>
              </div>
              {message && <p className="mb-4 text-blue-500">{message}</p>}
              <form onSubmit={onSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Email"
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
                    ${errors.email ? "border-red-500" : ""}`}
                    value={formData.email}
                    onChange={(e) => onChangeFormData("email", e.target.value)}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1 text-left italic">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Send reset password link"
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
