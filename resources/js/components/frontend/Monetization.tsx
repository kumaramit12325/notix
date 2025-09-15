import React from 'react';

const Monetization: React.FC = () => {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Why not to go with{' '}
            <span className="text-blue-600">Monetization Plan</span>?
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Content Paragraphs */}
        <div className="space-y-8 max-w-7xl mx-auto">
          {/* First Paragraph */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-400">
            <p className="text-lg text-gray-700 leading-relaxed">
              Many push notification companies offer a monetization plan, but these plans often come with a catch. 😟{' '}
              <span className="block mt-2">
                First, these companies spam your users with a lot of inappropriate/spam notifications, which can be frustrating for your audience and they unsubscribe. 🚫
              </span>
              <span className="block mt-2">
                Additionally, your notifications will not get priority over the advertisements, meaning that your messages will be drowned out by irrelevant ads. 📢
              </span>
            </p>
          </div>

          {/* Second Paragraph */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-400">
            <p className="text-lg text-gray-700 leading-relaxed">
              Essentially, you are simply providing the push notification company with subscribers, but not receiving any real value in return. 😔{' '}
              <span className="block mt-2">
                This is similar to adding someone else's AdSense to your website and they advertise to your users, and you not getting any benefit. 💸
              </span>
            </p>
          </div>

          {/* Third Paragraph */}
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400">
            <p className="text-lg text-gray-700 leading-relaxed">
              If you want to offer a great push notification experience to your users without sacrificing control or subjecting them to spammy ads,{' '}
              <span className="font-semibold text-blue-600">Notix</span> is definitely worth considering. 👍
            </p>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default Monetization;
