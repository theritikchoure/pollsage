import React, { useState } from "react";
import { adminLogin } from "../../../services/admin_auth.service.js";
import { errorToast, successToast } from "../../../utils/toaster";
import links from "../../../utils/nav_link";
import { Link, useNavigate } from "react-router-dom";
import PageDetails from "../../../components/_page_details";
import { adminLoginValidation } from "../../../validations/admin_auth";

const AdminLogin = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // write on change function
  const onChangeFormData = (key, value) => {
    if (!key) return;

    setFormData({ ...formData, [key]: value });
  };

  const onLogin = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = adminLoginValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await adminLogin(formData);

      if (res) {
        setFormData({
          username: "",
        password: "",
        });
        successToast("Login successful");
        const auth = {
          user: localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null,
          token: localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : null,
        };    
        props.setIsAuth(true);
        props.setAuth(auth);
        navigate("/admin/dashboard");
      }
    } catch (error) {
      errorToast(error.message || error);
    }
  };
  return (
    <>
        <PageDetails title="Admin Login - PollSage" />
      <section className="bg-slate-900 py-20 lg:py-[80px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div
                className="
               max-w-[525px]
               mx-auto
               rounded-lg
               relative
               overflow-hidden
               py-16
               px-10
               sm:px-12
               md:px-[60px]
               "
              >
                <div className="mb-8 text-center text-gray-100">
                  <a href="/" className="inline-block max-w-[160px] mx-auto">
                    <h1 className="text-4xl font-bold">PollSage</h1>
                  </a>
                  <h1 className="text-lg mt-5">
                    Login to your pollsage account
                  </h1>
                </div>
                <form onSubmit={onLogin}>
                  <div className="mb-5">
                    <label className="text-base text-indigo-200">
                      Username
                    </label>
                    <input
                      type="text"
                      placeholder="Username"
                      className={`w-full mt-4
                    rounded-md
                    border
                    border-gray-600
                    py-3
                    px-5
                    bg-transparent
                    text-base text-gray-100
                    placeholder-[#ACB6BE]
                    outline-none
                    focus-visible:shadow-none
                    focus:border-primary
                    ${errors.username ? "border-red-500" : ""}`}
                      value={formData.username}
                      onChange={(e) =>
                        onChangeFormData("username", e.target.value)
                      }
                    />
                    {errors.username && (
                      <p className="text-red-500 text-sm mt-1 text-left">
                        {errors.username}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label className="text-base text-indigo-200">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Password"
                      className={`w-full mt-4
                    rounded-md
                    border
                    border-gray-600
                    py-3
                    px-5
                    bg-transparent
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
                      <p className="text-red-500 text-sm mt-1 text-left">
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
                        bg-indigo-500
                        hover:bg-indigo-600
                        "
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminLogin;
