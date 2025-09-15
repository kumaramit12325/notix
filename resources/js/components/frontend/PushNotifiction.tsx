import React from 'react';
import DemoButton from './DemoButton';

const PushNotification: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-6">
            What, Why & How? - We Are The Best Push Notification Software?
          </h1>
          
          {/* Explanatory Text */}
          <div className="max-w-4xl mx-auto space-y-4 text-lg text-gray-700">
            <p>
              We are a team of bloggers who were frustrated by the huge recurring fees charged by SaaS brands.
            </p>
            <p>
              We were getting charged hundreds and sometimes thousands of dollars every month.
            </p>
            <p>
              So, we came up with a solution to solve this problem by creating a self hosted push notification panel, Notix.
            </p>
          </div>
        </div>

        {/* Video Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-2xl">
            {/* YouTube Video Embed */}
            <div className="aspect-video w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Notix - Self Hosted Push Notification Tool"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Video Overlay with Feature Grid (for visual appeal) */}
            <div className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-20">
              <div className="grid grid-cols-5 gap-2 p-4 h-full items-center">
                {/* Feature tiles similar to the video thumbnail */}
                <div className="bg-blue-200 rounded-lg p-2 text-center text-xs">
                  <div className="text-blue-600 mb-1">📨</div>
                  <div>Instant Delivery</div>
                </div>
                <div className="bg-blue-200 rounded-lg p-2 text-center text-xs">
                  <div className="text-blue-600 mb-1">📁</div>
                  <div>Project Cloning</div>
                </div>
                <div className="bg-blue-200 rounded-lg p-2 text-center text-xs">
                  <div className="text-blue-600 mb-1">📦</div>
                  <div>Import & Export</div>
                </div>
                <div className="bg-blue-200 rounded-lg p-2 text-center text-xs">
                  <div className="text-blue-600 mb-1">🛡️</div>
                  <div>Token Security</div>
                </div>
                <div className="bg-blue-200 rounded-lg p-2 text-center text-xs">
                  <div className="text-blue-600 mb-1">🔥</div>
                  <div>Fastest Delivery</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Description */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              Watch our comprehensive demo showcasing all the powerful features of Notix
            </p>
          </div>
        </div>

        {/* KEY THINGS YOU SHOULD KNOW Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Main Heading */}
            <div className="text-left">
              <h2 className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight">
                <span className="block">KEY THINGS</span>
                <span className="block">YOU SHOULD</span>
                <span className="block">KNOW</span>
              </h2>
            </div>

            {/* Right Side - Features List */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-blue-900">Register Unlimited domains</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-blue-900">Collect Unlimited Subscribers</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-red-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-blue-900">No Daily Limits, No Delayed Delivery </span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-blue-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-blue-900">For as long as you want</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-green-200 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-lg font-semibold text-blue-900">By just paying a One-time Fee</span>
              </div>
            </div>
          </div>

          {/* Call-to-Action Button */}
          <div className="text-center mt-16">
            <DemoButton variant="primary" className="text-xl">
              View Demo 
            </DemoButton>
          </div>
        </div>

       
      </div>
    </section>
  );
};

export default PushNotification;
