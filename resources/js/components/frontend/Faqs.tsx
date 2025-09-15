import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const Faqs: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0); // First item open by default

  const faqData: FAQItem[] = [
    {
      id: 0,
      question: "Do I need any coding knowledge to use this panel?",
      answer: "No, you don't need any coding knowledge to use Notix panel. It is designed to be user-friendly and can be used by anyone without any technical knowledge."
    },
    {
      id: 1,
      question: "How does Notix work?",
      answer: "Notix is a comprehensive push notification solution that allows you to send targeted notifications to your subscribers. It integrates seamlessly with your existing systems and provides analytics to track engagement."
    },
    {
      id: 2,
      question: "What will happen to my current subscribers?",
      answer: "Your current subscribers will be automatically migrated to the new system. All existing data and preferences will be preserved, ensuring a smooth transition without any loss of subscribers."
    },
    {
      id: 3,
      question: "Is Notix truly unlimited?",
      answer: "Yes, Notix offers unlimited push notifications with no monthly caps or restrictions. You can send as many notifications as you need to engage with your audience effectively."
    },
    {
      id: 4,
      question: "I have more questions, where can I ask?",
      answer: "For additional questions or support, you can reach out to our customer support team through the contact form, email, or live chat. We're here to help you succeed with Notix."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100">
        {/* Title Section */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-blue-600">FAQs</h2>
        </div>

        {/* FAQ Items */}
        <div className="divide-y divide-gray-100">
          {faqData.map((item) => (
            <div key={item.id} className="relative">
              {/* Question Bar */}
              <button
                onClick={() => toggleItem(item.id)}
                className={`w-full p-6 text-left transition-all duration-200 ease-in-out ${
                  openItem === item.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                    <span className={`font-medium ${
                      openItem === item.id ? 'text-blue-600' : 'text-gray-700'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <div className="flex items-center">
                    {openItem === item.id ? (
                      <svg
                        className="w-5 h-5 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              {/* Answer Content */}
              {openItem === item.id && (
                <div className="px-6 pb-6 bg-white">
                  <div className="pt-4 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faqs;
