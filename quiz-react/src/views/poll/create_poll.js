import React, { Fragment, useState } from "react";
import Header from "../../components/header";
import Footer from "../../components/footer";
import links from "../../utils/nav_link";
import { createPollValidation } from "../../validations/poll.js";
import { createPoll } from "../../services/poll.service";
import { errorToast, successToast } from "../../utils/toaster";
import PageDetails from "../../components/_page_details";
import { useNavigate } from "react-router-dom";

const CreatePoll = () => {

  const navigate = useNavigate();

    const initialState = {
        question: "",
        allow_multiple_selection: false,
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      };

  const [formData, setFormData] = useState(initialState);

  const [errors, setErrors] = useState({});

  const [registerSuccess, setRegisterSuccess] = useState(false);

  // write on change function
  const onChangeFormData = (key, value, index = null) => {
    if (!key) return;

    if (key === "options") {
      let options = [...formData.options];
      options[index].text = value;
      setFormData({ ...formData, options });
      return;
    }

    setFormData({ ...formData, [key]: value });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { isValid, errors } = createPollValidation(formData);
      console.log(errors);
      if (!isValid) {
        setErrors(errors);
        return;
      }

      setErrors({});

      // write api call here
      let res = await createPoll(formData);
      console.log(res)
      if (res) {
        // setFormData(initialState);
        setRegisterSuccess(true);
        successToast("Poll created successfully."); 
        navigate(`/poll/${res.data.pollId}`)
        // window.location.href = links.creatorDashboard;
      }
    } catch (error) {
      errorToast(error);
    }
  };
  return (
    <Fragment>
      <div className="flex flex-col min-h-screen">
        <PageDetails title={'Create Poll - PollSage - Free Poll Maker'} />
        {/* <Header /> */}
        <div className="min-h-screen bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="relative px-4 py-10 bg-gray-800 mx-8 md:mx-0 shadow rounded-xl sm:p-10">
              <div className="max-w-md mx-auto">
                <div className="flex items-center space-x-5">
                  <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">
                    i
                  </div>
                  <div className="block pl-2 font-semibold text-xl self-start text-white">
                    <h2 className="leading-relaxed">Create a Poll</h2>
                    <p className="text-sm text-gray-500 font-normal leading-relaxed">
                      Complete the below fields to create your poll.
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  <form onSubmit={onSubmit}>
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="flex flex-col">
                        <label className="leading-loose text-gray-100">Title</label>
                        <input
                          type="text"
                          className={`px-4 py-2 bg-gray-700 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100 ${
                            errors.question ? "border-red-500" : ""
                          }`}
                          placeholder="Title"
                          value={formData.question}
                          onChange={(e) =>
                            onChangeFormData("question", e.target.value)
                          }
                        />
                        {errors.question && (
                          <p className="text-red-500 text-sm mt-1 text-left italic">
                            {errors.question}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose text-gray-100" htmlFor="voting_type">
                          Voting type
                        </label>
                        <select
                          id="voting_type"
                          type="select"
                          className="px-4 bg-gray-700  py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100"
                          placeholder="Optional"
                          value={formData.allow_multiple_selection}
                          onChange={(e) =>
                            onChangeFormData(
                              "allow_multiple_selection",
                              e.target.value
                            )
                          }
                        >
                          <option value={false}>Single</option>
                          <option value={true}>Multiple</option>
                        </select>
                      </div>
                      <div className="flex flex-col">
                        <label className="leading-loose text-gray-100">Answer options</label>
                        <input
                          type="text"
                          className="px-4 bg-gray-700 py-2 mb-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100"
                          placeholder="Option 1"
                          value={formData.options[0].text}
                          onChange={(e) =>
                            onChangeFormData("options", e.target.value, 0)
                          }
                        />
                        <input
                          type="text"
                          className="px-4  bg-gray-700  py-2 mb-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100"
                          placeholder="Option 2"
                          value={formData.options[1].text}
                          onChange={(e) =>
                            onChangeFormData("options", e.target.value, 1)
                          }
                        />
                        <input
                          type="text"
                          className="px-4 bg-gray-700  py-2 mb-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100"
                          placeholder="Option 3"
                          value={formData.options[2].text}
                          onChange={(e) =>
                            onChangeFormData("options", e.target.value, 2)
                          }
                        />
                        <input
                          type="text"
                          className="px-4 bg-gray-700  py-2 mb-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-600 rounded-md focus:outline-none text-gray-100"
                          placeholder="Option 4"
                          value={formData.options[3].text}
                          onChange={(e) =>
                            onChangeFormData("options", e.target.value, 3)
                          }
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex items-center space-x-4">
                      <button className="bg-white text-purple-800 flex justify-center items-center w-full text-gray-900 px-4 py-3 rounded-md focus:outline-none hover:text-white hover:bg-purple-800">
                        <svg
                          className="w-6 h-6 mr-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>{" "}
                        Cancel
                      </button>
                      <input
                        type="submit"
                        value={"Create Poll"}
                        className="bg-purple-800 flex justify-center cursor-pointer items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:text-purple-800 hover:bg-white"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </Fragment>
  );
};

export default CreatePoll;
