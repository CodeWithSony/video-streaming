"use client";
import { useState } from "react";

const faqs = [
  { question: "What is Netflix?", answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, and more." },
  { question: "How much does Netflix cost?", answer: "Netflix offers various subscription plans starting from ₹149 per month." },
  { question: "Where can I watch?", answer: "You can watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device." },
  { question: "How do I cancel?", answer: "You can cancel your subscription anytime online with no cancellation fees." },
  { question: "What can I watch on Netflix?", answer: "Netflix has a vast library of TV shows, movies, documentaries, and anime." },
  { question: "Is Netflix good for kids?", answer: "Yes! Netflix offers a Kids experience with content suitable for children." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
     <div className="bg-black text-white py-10"> 
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg">
              <button 
                className="w-full flex justify-between items-center p-4 text-lg font-semibold focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-2xl">{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="p-4 border-t border-gray-700">
                  <p className="text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
