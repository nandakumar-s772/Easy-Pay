import { useState } from 'react';

const faqs = [
  {
    question: "How do I add money to my wallet?",
    answer: "Currently, you receive a balance when you sign up. Manual top-up options will be available soon.",
  },
  {
    question: "How can I send money?",
    answer: "Go to the 'Transaction' page, enter receiver UPI ID and amount, and click Send.",
  },
  {
    question: "Is EasyPay secure?",
    answer: "Yes, we use secure protocols and encryption. However, avoid sharing your login info.",
  },
];

export default function Help() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="min-h-screen bg-white px-6 py-10 md:px-20">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Help & Support</h1>

      {/*QandA*/}
      <div className="max-w-3xl mx-auto mb-12">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4 border-b pb-2">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-medium text-blue-700 focus:outline-none"
            >
              {faq.question}
            </button>
            {activeIndex === index && (
              <p className="mt-2 text-gray-700">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="max-w-xl mx-auto bg-blue-50 rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">Still need help?</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="your@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-700 mb-1">Message</label>
            <textarea
              rows="4"
              className="w-full p-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Describe your issue..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
