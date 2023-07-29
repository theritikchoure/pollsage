import React, { Fragment, useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PageDetails from "../components/_page_details";
import useTabVisibility from "../components/_tab_visibility";
import axios from "axios";

const Home = () => {

  const onTabVisible = () => {
    document.title = "PollSage - Create polls in seconds";
  };

  const onTabHidden = () => {
    document.title = "Back soon!"
  };

  useTabVisibility(onTabVisible, onTabHidden);

  const [subscription, setSubscription] = useState(null);

  const handleSubscribe = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: 'BKyvZkw9C9pd6ByYHqASFvne96JT9nDFpH87B616fvLUVrnP_iVut-1nKHtsxi8948e3qE_J7LGi4TXpCrhcg4s',
      });

      await axios.post('/api/v1/push-notifications', subscription);
      setSubscription(subscription);
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };

  const handleSendNotification = async () => {
    try {
      await axios.post('/api/v1/push-notifications/send', {
        title: 'New Poll Available!',
        body: 'A new poll is now available for you to vote.',
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }; 

  return (
    <>
    <PageDetails title="PollSage - Create polls in seconds" description="Pollsage is a free online polling platform that allows you to create polls and share them with your audience." />
    <section className="bg-gray-900 text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Gather Insights,
            <span className="sm:block"> Make Informed Choices. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
          Empower Your Decision-Making with PollSage
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/create-poll"
              // onClick={handleSubscribe}
            >
              Create Poll
            </a>

            <a
              className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
              href="/creator/login"
              // onClick={handleSendNotification}
            >
              Manage polls
            </a>
          </div>
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
//                           stroke-width="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
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
//                           stroke-width="1.5"
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
//                           stroke-width="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
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
//                           stroke-width="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
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
//                           stroke-width="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
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
//                           stroke-width="1.5"
//                         >
//                           <path
//                             stroke-linecap="round"
//                             stroke-linejoin="round"
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

