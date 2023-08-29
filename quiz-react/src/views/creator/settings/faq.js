import React, { useEffect, useState } from "react";
import { getFaqByTag } from "../../../services/app/faq.service";

const CreatorFAQs = () => {

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    try {
      const res = await getFaqByTag("creator_faq");
      console.log(res);
      setFaqs(res.data.faqs);
    } catch (error) {
      console.log(error);
    }
  };
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
