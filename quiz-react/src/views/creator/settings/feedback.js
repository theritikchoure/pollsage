import React from "react";
import CreatorPageTitle from "../../../components/creator/page_title";

const CreatorFeedback = () => {
  return (
    <>
      <div className="mt-4 mx-4">
        <CreatorPageTitle title={"Account Settings"} />
        <div className="flex-grow bg-slate-800">
          <div className="p-6">
            <h2 className="text-slate-800 dark:text-slate-100 font-bold text-2xl mb-4">
              Give Feedback
            </h2>

            <div className="text-normal text-slate-400">
              Our product depends on customer feedback to improve the overall
              experience!
            </div>

            <section className="mt-6">
              <h3 className="text-slate-800 dark:text-slate-100 font-bold text-xl">
                How likely would you recommend us to a friend or colleague?
              </h3>
            </section>

            <section className="mt-6">
              <h3 className="text-slate-800 dark:text-slate-100 font-bold text-xl">
                Subject
              </h3>
              <label className="sr-only" htmlFor="subject">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Enter your subject"
                className={`w-full rounded border border-gray-700 bg-slate-900 mt-2 py-2 px-5 font-normal outline-none
                transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter
                dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
              />
            </section>

            <section className="mt-6">
              <h3 className="text-slate-800 dark:text-slate-100 font-bold text-xl">
                Tell us in words
              </h3>
              <label className="sr-only" htmlFor="description">
                Leave a feedback
              </label>
              <textarea
                id="description"
                className={`w-full rounded border border-gray-700 bg-slate-900 mt-2 py-2 px-5 font-normal outline-none 
                transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter 
                dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary`}
                rows="4"
                placeholder="I really enjoy…"
              ></textarea>
            </section>
          </div>
          <footer>
            <div className="flex flex-col border-slate-200 dark:border-slate-700 py-5 px-6 border-t">
              <div className="flex self-end">
                <button className="border px-3 py-2 rounded dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  Cancel
                </button>
                <button className="ml-3 px-3 py-2 rounded bg-indigo-500 hover:bg-indigo-600">
                  Save Changes
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default CreatorFeedback;
