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
    <section className="bg-gray-100 py-20 lg:py-[80px]" style={{height: '100vh'}}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-[525px]">
            <div
              className="
            text-center
            bg-white
            rounded-lg
            relative
            overflow-hidden
            py-16
            px-10
            sm:px-12
            md:px-[60px]
            shadow-lg
          "
            >
              <div className="mb-4 md:mb-8 text-center text-black">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">Login to your PollSage account</h1>
              </div>
              <form onSubmit={onLogin}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Email"
                    className={`w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color
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
                <div className="mb-6">
                  <input
                    type="password"
                    placeholder="Password"
                    className={`w-full rounded-md border border-[#E9EDF4] py-3 px-5 bg-[#FCFDFE] text-base text-body-color
                  placeholder-[#ACB6BE] outline-none focus-visible:shadow-none focus:border-primary ${
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
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Sign In"
                    className="bg-blue-600 w-full rounded-md border border-primary py-3 px-5 text-base text-white
                  cursor-pointer hover:bg-opacity-90"
                  />
                </div>
              </form>
              <Link
                to={links.creatorForgetPassword}
                className="
              text-base
              inline-block
              mb-2
              text-black
              hover:underline hover:text-primary
            "
              >
                Forget Password?
              </Link>
              <p className="text-base text-[#adadad]">
                Not a member yet? &nbsp;
                <Link
                  to={links.register}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
