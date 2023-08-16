import React, { useEffect, useState } from "react";
import { verifyToken } from "../../../services/creator_auth.service";
import links from "../../../utils/nav_link";
import { successToast } from "../../../utils/toaster";
import { redirect } from "react-router-dom";


const EmailVerification = () => {
  const [token, setToken] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("Email verifying, please wait...")
  useEffect(() => {
    const token = window.location.pathname.split("/")[3]; // Extract the verification_token from the URL
    setToken(token); // Save it in state
    verifyEmail(token); // Call the API request function with the token
  }, []);

  const verifyEmail = async (token) => {
    try {
      const response = await verifyToken(token); // Make an API request to verify the token
      if(response) {
        // successToast("Email verified successfully. Please login to continue.");
        // redirect(links.login);
        window.location.href = links.login;
      }
    } catch (error) {
      setVerificationStatus(error || "Email verification failed. Please try again later.")
    }
  };

  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[80px] h-screen">
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
              <div className="mb-4 md:mb-8 text-center">
                <a href="/" className="inline-block max-w-[160px] mx-auto">
                  <h1 className="text-4xl font-bold">PollSage</h1>
                </a>
                <h1 className="text-lg mt-5">
                 {verificationStatus}
                </h1>
              </div>

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

export default EmailVerification;
