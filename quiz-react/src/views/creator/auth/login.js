import React, { useState } from "react";
import { creatorLoginValidation } from "../../../validations/creator_auth";
import { creatorLogin } from "../../../services/creator_auth.service";
import { errorToast, successToast } from "../../../utils/toaster";
import links from "../../../utils/nav_link";
import { Link, useNavigate } from "react-router-dom";

const Login = (props) => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [registerSuccess, setRegisterSuccess] = useState(false);

  // write on change function
  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
  };

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = creatorLoginValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await creatorLogin(formData);

      if (res) {
        setFormData({
          email: "",
          password: "",
        });
        setRegisterSuccess(true);
        successToast("Login successful");
        props.setIsAuth(true);
        navigate('/creator/dashboard');
      }
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <section className="bg-gray-900 py-20 lg:py-[80px]">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div
              className="
               max-w-[525px]
               mx-auto
               text-center
               bg-gray-800
               rounded-lg
               relative
               overflow-hidden
               py-16
               px-10
               sm:px-12
               md:px-[60px]
               "
            >
              <div className="mb-10 md:mb-16 text-center text-gray-100">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">Login to your pollsage account</h1>
              </div>
              <form onSubmit={onLogin}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Email"
                    className={`w-full
                    rounded-md
                    border
                    border-gray-600
                    py-3
                    px-5
                    bg-gray-700
                    text-base text-gray-100
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
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full
                    rounded-md
                    border
                    border-gray-600
                    py-3
                    px-5
                    bg-gray-700
                    text-base text-gray-100
                    placeholder-[#ACB6BE]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary
                    ${errors.password ? "border-red-500" : ""}`}
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
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    className="
                        w-full
                        rounded-md
                        border
                        border-gray-600
                        py-3
                        px-5
                        text-base text-white
                        cursor-pointer
                        bg-gray-800
                        hover:bg-gray-900
                        "
                  />
                </div>
              </form>
              <Link
                to={links.creatorForgetPassword}
                className="
                  text-base
                  inline-block
                  mb-2
                  text-[#adadad]
                  hover:underline hover:text-primary
                  "
              >
                Forget Password?
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
