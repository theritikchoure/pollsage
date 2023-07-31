import React from "react";
import CreatorPageTitle from "../../../components/creator/page_title";

const faqs = [
  {
    question: "How do I create a poll on PollSage?",
    answer:
      "To create a poll, log in to your PollSage account and click on the 'Create Poll' button. Fill in the poll details, add options, and set the duration for the poll. Once you're done, click 'Create' to publish your poll.",
  },
  {
    question: "Can I allow participants to select multiple choices in a poll?",
    answer:
      "Yes, you can. When creating a poll, there is an option to enable multiple choices. Participants will be able to select more than one option in the poll.",
  },
  {
    question: "How do I view the real-time results of my poll?",
    answer:
      "Once your poll is live, you can view real-time results on the poll details page. The results will update automatically as participants vote.",
  },
  {
    question: "Can I share my poll on social media or via email?",
    answer:
      "Absolutely! After creating a poll, you'll find sharing options. You can share the poll link on social media platforms or send it via email to gather more votes.",
  },
  {
    question: "Is user authentication required to create a poll?",
    answer:
      "Yes, you need to be logged in to your PollSage account to create and manage your polls. User authentication ensures the security and privacy of your polls.",
  },
  {
    question: "How can I edit or delete a poll I created?",
    answer:
      "To edit or delete a poll, go to the 'My Polls' section in your account dashboard. Find the poll you want to modify and click on the respective action buttons (edit/delete).",
  },
  {
    question: "Can I set an expiration date for my poll?",
    answer:
      "Yes, you can set a duration for your poll. Once the specified time is up, the poll will automatically close, and participants won't be able to vote anymore.",
  },
  {
    question: "Can I export poll results for analysis?",
    answer:
      "At the moment, PollSage doesn't offer a built-in export feature, but you can take screenshots of the results or manually record the data for analysis.",
  },
  {
    question: "How do I embed a poll on my website or blog?",
    answer:
      "PollSage provides an embed code for each poll. Copy the code and paste it into your website's HTML to display the poll on your site.",
  },
  {
    question:
      "What happens if a participant tries to vote multiple times in the same poll?",
    answer:
      "PollSage prevents multiple votes from the same participant in the same poll. Each participant can only vote once.",
  },
];

const CreatorFAQs = () => {
  return (
    <>
      <div className="mt-4 mx-4">
        <div className="flex-grow lg:px-64">
          {/* write text common faqs in center */}
          <div className="text-center text-3xl font-bold text-gray-200 mb-8 mt-4">
            Common FAQs
          </div>
          {/* map faqs */}
          {faqs.map((faq, index) => (
            <div className="my-6 border-b border-gray-600 pb-4" key={index}>
              <h4 className="text-xl font-bold mb-2">✨ {faq.question}</h4>
              <p className="text-normal text-indigo-200">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CreatorFAQs;
