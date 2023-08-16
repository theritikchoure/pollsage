import React, { useState } from "react";
import { creatorRegisterValidation } from "../../../validations/creator_auth";
import { userRegister } from "../../../services/user_auth.service";
import { errorToast, successToast } from "../../../utils/toaster";
import { getUserIp } from "../../../utils/user_ip";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
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

      let ip = await getUserIp();
      console.log(ip)

      formData.country = ip.geo_location.country;

      console.log(formData)

      // write validation function
      const { isValid, errors } = creatorRegisterValidation(formData);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await userRegister(formData);
      
      if(res) {
        setFormData({name: "", email: "", password: "", confirm_password: ""});
        successToast("Account created successfully");
        navigate('/user/login')
      }
    } catch (error) {
      errorToast(error?.message || error);
    }
  };

  return (
    <section className="bg-slate-900 py-20 lg:py-[80px]">
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
              <div className="mb-4 md:mb-8 text-center text-white">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">
                  Sign up to your pollsage account
                </h1>
              </div>
              {registerSuccess && <p className="mb-4 text-green-600">Please verify your email before proceeding. Check your inbox for a verification email.</p>}
              <form onSubmit={onRegister}>
                <div className="mb-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className={`w-full rounded-md border border-gray-600 py-3 px-5 bg-gray-700 text-base text-white
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
                    className={`w-full rounded-md border border-gray-600 py-3 px-5 bg-gray-700 text-base text-white
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
                    border-gray-600
                    py-3
                    px-5
                    bg-gray-700
                    text-base text-white
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
                    border-gray-600
                    py-3
                    px-5
                    bg-gray-700
                    text-base text-white
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
                    className="bg-indigo-500 w-full rounded-md py-3 px-5 text-base text-white
                        cursor-pointer hover:bg-indigo-600"
                  />
                </div>
              </form>
              
              <p className="text-base text-[#adadad]">
                Already a member? &nbsp;
                <a
                  href="/creator/login"
                  className="text-primary hover:underline"
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
