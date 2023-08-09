import React, { useState } from "react";

const UserLogin = () => {
  const [otpSent, setOtpSent] = useState(false);

  const handlePaste = (event) => {
    event.preventDefault();
    const clipboardData = event.clipboardData.getData("text/plain");
    const otpInputFields = document.querySelectorAll("#otp input");

    for (let i = 0; i < otpInputFields.length; i++) {
      if (i < clipboardData.length) {
        otpInputFields[i].value = clipboardData[i];
      } else {
        otpInputFields[i].value = "";
      }
    }
  };

  const handleInput = (event) => {
    const input = event.target;
    const nextInput = input.nextElementSibling;
    const prevInput = input.previousElementSibling;
    const inputType = event.nativeEvent.inputType;

    if (inputType === "deleteContentBackward" && input.value === "") {
      if (prevInput) {
        prevInput.focus();
      }
    } else {
      if (input.value !== "") {
        input.value = input.value.toUpperCase();
      }

      if (input.value !== "" && nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleLastInput = (event) => {
    const input = event.target;
    const prevInput = input.previousElementSibling;

    console.log(input, prevInput);
    console.log(event, input.value);

    console.log(event.nativeEvent.inputType);

    if (
      event.nativeEvent.inputType === "deleteContentBackward" &&
      input.value === ""
    ) {
      if (prevInput) {
        prevInput.focus();
        prevInput.value = "";
      }
    }
  };

  const verifyOtp = () => {
    const otpInputFields = document.querySelectorAll("#otp input");
    let otp = "";
    otpInputFields.forEach((otpInputField) => {
      otp += otpInputField.value;
    });
    console.log(otp);
  };

  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-slate-800 rounded-lg p-6 relative">
        <button onClick={() => setOtpSent(false)} class="absolute top-3 right-3 text-gray-300 hover:text-gray-500 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="container mx-auto">
          <div class="max-w-sm mx-auto md:max-w-lg">
            <div class="w-full h-64">
              <div class="py-3 rounded text-center my-auto">
                <h1 class="text-2xl font-bold">Login in to your account</h1>

                {!otpSent && <>
                <div class="flex flex-col mt-4">
                  <span>Enter your email</span>
                </div>

                <input class="border border-slate-600 mt-4 bg-slate-900 h-8 w-full text-center rounded" type="text" />

                <button
                    class="bg-slate-900 text-white rounded mt-4 py-2 w-full"
                    onClick={() => setOtpSent(true)}
                    >
                    Send OTP
                </button>
                </> }

                {otpSent && <>
                <div class="flex flex-col mt-4">
                  <span>Enter the OTP you received at</span>
                  <span class="font-bold">+91 ******876</span>
                </div>

                <div
                  id="otp"
                  class="flex flex-row justify-center text-center px-2 mt-5"
                >
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="first"
                    maxlength="1"
                    onPaste={handlePaste}
                    onInput={handleInput}
                  />
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="second"
                    maxlength="1"
                    onInput={handleInput}
                  />
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="third"
                    maxlength="1"
                    onInput={handleInput}
                  />
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="fourth"
                    maxlength="1"
                    onInput={handleInput}
                  />
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="fifth"
                    maxlength="1"
                    onInput={handleInput}
                  />
                  <input
                    class="m-2 border bg-slate-900 h-10 w-10 text-center form-control rounded"
                    type="text"
                    id="sixth"
                    maxlength="1"
                    onInput={handleInput}
                  />
                </div>
                <button
                  onClick={verifyOtp}
                  class="mt-4 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-4 rounded"
                >
                  Verify
                </button>
                <div class="flex justify-center text-center mt-5">
                  <a class="flex items-center text-indigo-500 hover:text-indigo-700 cursor-pointer">
                    <span class="">Resend OTP</span>
                  </a>
                </div>
                </> }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
