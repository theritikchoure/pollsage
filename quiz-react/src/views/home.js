import React, { Fragment, useState } from "react";
import PageDetails from "../components/_page_details";
import FAQSection from "../components/faq";
import useTabVisibility from "../components/_tab_visibility";
import axios from "axios";
import create_poll from '../assets/images/create-poll.png';

const Home = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  const onTabVisible = () => {
    document.title = "PollSage - Create polls in seconds";
  };

  const onTabHidden = () => {
    document.title = "Back soon!";
  };

  useTabVisibility(onTabVisible, onTabHidden);

  const [subscription, setSubscription] = useState(null);

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          "BKyvZkw9C9pd6ByYHqASFvne96JT9nDFpH87B616fvLUVrnP_iVut-1nKHtsxi8948e3qE_J7LGi4TXpCrhcg4s",
      });

      await axios.post("/api/v1/push-notifications", subscription);
      setSubscription(subscription);
    } catch (error) {
      console.error("Error subscribing:", error);
    }
  };

  const handleSendNotification = async () => {
    try {
      await axios.post("/api/v1/push-notifications/send", {
        title: "New Poll Available!",
        body: "A new poll is now available for you to vote.",
      });
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };

  return (
    <>
      <PageDetails
        title="PollSage - Create polls in seconds"
        description="Pollsage is a free online polling platform that allows you to create polls and share them with your audience."
      />
      <section className="bg-white text-black h-full">
        <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-32 flex flex-col md:flex-row lg:items-center lg:justify-between">
          <div className="order-2 lg:order-1 lg:w-1/2 text-center lg:text-left">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl md:text-7xl font-extrabold text-transparent ">
              Gather Insights,
              <span className="sm:block"> Make Informed Choices. </span>
            </h1>
            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed lg:mx-0">
              Empower Your Decision-Making with PollSage
            </p>
          </div>
          <div className="mt-8 mb-12 lg:mt-0 order-1 lg:order-2 lg:w-1/2">
            <img
              src={create_poll}
              alt="PollSage screenshot"
              className="mx-auto lg:mx-0 lg:ml-auto rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      {/* <!-- component --> */}
      <section className="py-32 bg-gray-100 overflow-hidden">
        <div className="container max-w-7xl mx-auto text-center px-6 space-y-8 text-gray-500 md:px-12">
          <div>
            <p className="text-black mb-4 text-2xl font-semibold">
              Getting Started with Pollsage
            </p>
            <p className="text-black text-lg">
              At Pollsage, we've made it our mission to provide an easy and
              intuitive poll-making experience.
              <br />
              Follow these straightforward steps to create engaging and
              effective polls effortlessly:
            </p>
          </div>
          <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-3">
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    1. Fill out the form
                  </h5>
                  <p className="text-sm text-gray-600">
                    Choose a title, add your answer options, and customize your
                    poll settings to suit your needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    2. Invite participants
                  </h5>
                  <p className="text-sm text-gray-600">
                    Share your poll link or embed the poll on your site to
                    gather responses from your audience.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    3. Get instant results
                  </h5>
                  <p className="text-sm text-gray-600">
                    Watch the results update in real-time as votes are cast, and
                    export the data whenever you need it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- component --> */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container max-w-7xl mx-auto text-center px-6 space-y-8 text-gray-500 md:px-12">
          <div>
            <span className="text-black text-2xl font-semibold">Features</span>
          </div>
          <div className="mt-16 grid border divide-x divide-y rounded-xl overflow-hidden sm:grid-cols-2 lg:divide-y-0 lg:grid-cols-3 xl:grid-cols-3">
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/burger.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Easy Poll Creation
                  </h5>
                  <p className="text-sm text-gray-600">
                    Create polls in minutes with our user-friendly interface.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/trowel.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Real-time Results
                  </h5>
                  <p className="text-sm text-gray-600">
                    Get instant feedback from your audience with real-time
                    results.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Customizable Polls
                  </h5>
                  <p className="text-sm text-gray-600">
                    Personalize your polls to match your brand's look and feel.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Mobile-Friendly Design
                  </h5>
                  <p className="text-sm text-gray-600">
                    Create and participate in polls seamlessly on any device,
                    whether it's a desktop, tablet, or smartphone.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Multiple Question Types
                  </h5>
                  <p className="text-sm text-gray-600">
                    Choose from a variety of question types, including multiple
                    choice, single choice, and open-ended questions.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative group bg-white transition hover:z-[1] hover:shadow-2xl">
              <div className="relative p-8 space-y-8 flex flex-col items-center">
                <img
                  src="https://tailus.io/sources/blocks/stacked/preview/images/avatars/package-delivery.png"
                  className="w-10"
                  width="512"
                  height="512"
                  alt="burger illustration"
                />

                <div className="space-y-2">
                  <h5 className="text-xl text-gray-800 font-medium transition group-hover:text-yellow-600">
                    Schedule Polls
                  </h5>
                  <p className="text-sm text-gray-600">
                    Plan ahead by scheduling your polls to go live at a specific
                    date and time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <section className="py-32 bg-white overflow-hidden">
        <div className="text-center">
          <span className="text-black text-2xl font-semibold">
            Testimonials
          </span>
        </div>

        <blockquote className="flex flex-col items-center p-4">
          <p className="max-w-4xl text-black text-xl text-center md:text-2xl lg:text-xl">
            "I recently used this website for a purchase and I was extremely
            satisfied with the ease of use and the variety of options available.
            The checkout process was seamless and the delivery was prompt. "
          </p>
          <a
            href=""
            target="_blank"
            className="inline-block font-bold tracking-tight"
          >
            <p>Jane Doe</p>
            <p className="font-medium text-black/60">Founder of XYZ</p>
          </a>
        </blockquote>
      </section>

      <section className="h-auto bg-gray-100 w-full pt-12 md:pb-20 p-3">
        <div className="max-w-6xl mx-auto md:text-center tails-relative">
          <h2 className="jakarta text-black font-bold text-xl md:px-0 px-10 md:text-3xl">
            Get Started with PollSage Today! ✨
          </h2>
          <p className="text-gray-400 mt-2 md:mt-5 md:px-0 px-10 md:text-2xl">
            Ready to create engaging polls and gather valuable insights? Join
            PollSage now and experience the easiest way to create, share, and
            analyze polls in real-time.
          </p>
          <a
            href="/"
            className="inline-flex mt-12 justify-center md:mt-8 items-center w-full px-8 py-5 md:mb-6 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-700 sm:mb-0 md:w-auto hover:bg-indigo-600 md:rounded-full"
          >
            <svg
              className="w-5 h-5 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g fill="none" stroke="none">
                <path
                  d="M6 12l5.485-5.485A12 12 0 0 1 19.971 3H21v1.029a12 12 0 0 1-3.515 8.486L12 18m-6-6l6 6m-6-6L3 9l.828-.828A4 4 0 0 1 6.657 7H11l-5 5zm6 6l3 3 .828-.828A4 4 0 0 0 17 17.343V13l-5 5zm-4.5-4.5l-2.379 2.379A7.242 7.242 0 0 0 3 21a7.243 7.243 0 0 0 5.121-2.121L10.5 16.5"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  d="M16.778 7.916a.5.5 0 1 1-.556-.832.5.5 0 0 1 .556.832z"
                  fill="#212121"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </svg>
            <span>Try the App for FREE</span>
          </a>
        </div>
      </section>

      {/* <!-- component --> */}
      <section
        className="py-32 bg-white text-black overflow-hidden"
        id="contact-us"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-black text-2xl font-semibold">Contact us</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 grid md:grid-cols-2 lg:grid-cols-2 gap-y-8 md:gap-x-8 md:gap-y-8 lg:gap-x-8 lg:gap-y-16">
          <div>
            <h2 className="text-lg font-bold">Contact Us</h2>
            <p className="max-w-sm mt-4 mb-4">
              Have something to say? We are here to help. Fill up the form or
              send email or call phone.
            </p>
            <div className="flex items-center mt-8 space-x-2 text-dark-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                ></path>
              </svg>
              <span>14th avenue glory road</span>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                ></path>
              </svg>
              <a href="mailto:hello@company.com">hello@company.com</a>
            </div>
            <div className="flex items-center mt-2 space-x-2 text-dark-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                ></path>
              </svg>
              <a href="tel:11111111111">+51 11111111111</a>
            </div>
          </div>
          <div>
            <form>
              <input
                type="checkbox"
                id=""
                className="hidden"
                style={{ display: "none" }}
                name="botcheck"
              />
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  autocomplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none focus:ring-4 border-gray-300"
                  name="name"
                />
              </div>
              <div className="mb-5">
                <label for="email_address" className="sr-only">
                  Email Address
                </label>
                <input
                  id="email_address"
                  type="email"
                  placeholder="Email Address"
                  autocomplete="false"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none focus:ring-4  border-gray-300"
                  name="email"
                />
              </div>
              <div className="mb-3">
                <textarea
                  placeholder="Your Message"
                  className="w-full px-4 py-3 border-2 placeholder:text-gray-800 dark:text-white rounded-md outline-none  h-36 focus:ring-4  border-gray-300"
                  name="message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 font-semibold text-white transition-colors bg-gray-900 rounded-md hover:bg-gray-800 px-7"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

// --------------------------------------------------------------------------------
// const Home = () => {
//   return (
//     <Fragment>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <div className="flex-grow">
//           <section className="bg-blue-500 py-20 text-white">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col items-center justify-center">
//                 <h1 className="text-4xl font-bold mb-4 text-center">
//                   Welcome to PollSage
//                 </h1>
//                 <p className="text-lg mb-8 text-center">
//                   Create and participate in polls with ease!
//                 </p>
//                 <a
//                   href="/create-poll"
//                   className="bg-white text-blue-500 font-bold py-3 px-6 rounded-lg hover:bg-blue-100 transition duration-300"
//                 >
//                   Create Poll
//                 </a>
//               </div>
//             </div>
//           </section>
//           <section className="bg-gray-100 py-16">
//             <div className="container mx-auto px-4">
//               <div className="flex flex-col lg:flex-row justify-between items-center">
//                 {/* <!-- component --> */}
//                 <div
//                   className="px-3 md:lg:xl:px-40   border-t border-b py-20 bg-opacity-10"
//                 >
//                   <div className="grid grid-cols-1 md:lg:xl:grid-cols-3 group bg-white shadow-xl shadow-neutral-100 border ">
//                     <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-red-500 text-white shadow-lg shadow-red-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                             d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       Create Polls
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       Easily create custom polls and surveys.
//                       </p>
//                     </div>

//                     <div className="p-10 flex flex-col items-center text-center group md:lg:xl:border-r md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-orange-500 text-white shadow-lg shadow-orange-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
//                           <polyline points="14 2 14 8 20 8"></polyline>
//                           <line x1="16" y1="13" x2="8" y2="13"></line>
//                           <line x1="16" y1="17" x2="8" y2="17"></line>
//                           <polyline points="10 9 9 9 8 9"></polyline>
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       Multiple Choice
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       Allow participants to select multiple choices.
//                       </p>
//                     </div>

//                     <div className="p-10 flex flex-col items-center text-center group   md:lg:xl:border-b hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-yellow-500 text-white shadow-lg shadow-yellow-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                             d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       Real-time Results
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       View live results as votes come in.
//                       </p>
//                     </div>

//                     <div className="p-10 flex flex-col items-center text-center group   md:lg:xl:border-r hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-lime-500 text-white shadow-lg shadow-lime-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                             d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       User Authentication
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       Register and login to manage your polls.
//                       </p>
//                     </div>

//                     <div className="p-10 flex flex-col items-center text-center group    md:lg:xl:border-r hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-teal-500 text-white shadow-lg shadow-teal-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                             d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       Responsive Design
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       Enjoy a seamless experience on any device.
//                       </p>
//                     </div>

//                     <div className="p-10 flex flex-col items-center text-center group     hover:bg-slate-50 cursor-pointer">
//                       <span className="p-5 rounded-full bg-indigo-500 text-white shadow-lg shadow-indigo-200">
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-10 w-10"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                           strokeWidth="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             strokeLinejoin="round"
//                             d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                           />
//                         </svg>
//                       </span>
//                       <p className="text-xl font-medium text-slate-700 mt-3">
//                       Share Polls
//                       </p>
//                       <p className="mt-2 text-sm text-slate-500">
//                       Share your polls easily via email or social media.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </section>

//           <section className="">
//           <div className="w-full bg-indigo-600 shadow-xl shadow-indigo-200 py-10 px-44 flex justify-between items-center">
//             <p className=" text-white"> <span className="text-4xl font-medium">Create poll now</span> </p>
//             <button className="px-5 py-3  font-medium text-slate-700 shadow-xl  hover:bg-white duration-150  bg-yellow-400">BOOK AN APPOINTMENT </button>
//         </div>
//           </section>
//         </div>
//         <Footer />
//       </div>
//     </Fragment>
//   );
// };
