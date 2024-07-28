import React from "react";

const faqs = [
  {
    question: "What is PollSage?",
    answer:
      "PollSage is a user-friendly platform designed for quickly creating and sharing live polls for various purposes. Whether you're making decisions with friends, seeking public opinion, or collecting feedback from your audience, PollSage offers a simple and effective way to gather and analyze responses in real-time.",
  },
  {
    question: "How do I create a poll on PollSage?",
    answer:
      "Creating a poll on PollSage is quick and easy:\n1. Enter your question in the designated field.\n2. Select a poll type and add your poll options.\n3. Adjust the poll settings to match your preferences, such as enabling multiple answers or restricting who can vote.\n4. Submit the form, and you'll be redirected to your new poll.\n5. Share the poll link with your audience via social media, email, or instant messenger.",
  },
  {
    question: "Can I customize my poll?",
    answer:
      "Absolutely! PollSage offers various customization options to suit your needs. You can:\n- Allow voters to select multiple options if necessary.\n- Keep the poll anonymous for privacy and candid responses.\n- Set an automatic closing date for the poll.\n- Control the visibility of the results, choosing to display them immediately after voting, only after the poll closes, or keep them hidden.",
  },
  {
    question: "Are PollSage results reliable?",
    answer:
      "PollSage employs several measures to enhance the reliability of poll results. These include:\n- Restricting votes through IP checks or unique participant codes.\n- Blocking VPN connections by default.\n- Using CAPTCHA verification (available in the Pro version).\n\nWhile these measures greatly increase reliability, it’s important to understand that no online voting system is completely immune to manipulation.",
  },
  {
    question: "How can I share my poll, and who can vote in it?",
    answer:
      "Once your poll is created, you'll get a unique link to share wherever you like—on social media, via email, or on your website. Anyone with the link can vote, making it easy to reach a broad audience. To engage with interested communities, share your poll on platforms relevant to your poll's topic.",
  },
  {
    question: "Is PollSage free to use?",
    answer: "Yes, PollSage is free for both creating and participating in polls. We are dedicated to providing accessible polling tools for everyone, from individuals to businesses. For users who need more advanced features, we offer premium options that include additional customization and detailed analytics.\n\nAt PollSage, we are committed to helping you make your voice heard through the power of polls. If you have any further questions or need assistance, please contact our support team.",
  },
];

const FAQSection = () => {
  return (
    <div className="relative w-full bg-gray-100 text-black px-6 pt-10 pb-8 mt-8 sm:mx-auto  sm:px-10">
      <div className="mx-auto px-5 max-w-7xl">
        <div className="flex flex-col items-center">
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">
            FAQ
          </h2>
          <p className="mt-3 text-lg text-neutral-500 md:text-xl">
            Frequenty asked questions
          </p>
        </div>
        <div className="mx-auto mt-8 grid w-full divide-y divide-neutral-200">
          {faqs.map((faq) => {
            return (
              <div className="py-5">
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                    <span>{faq.question}</span>
                    <span className="transition group-open:rotate-180">
                      <svg
                        fill="none"
                        height="24"
                        shape-rendering="geometricPrecision"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.5"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </summary>
                  <p className="group-open:animate-fadeIn mt-3 text-neutral-600">
                    {faq.answer}
                  </p>
                </details>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
