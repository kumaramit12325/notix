import React from 'react';

const Lifetime: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Rocket Image - Left Side */}
          <div className="lg:w-1/3 flex justify-center lg:justify-start">
            <img 
              src="/images/rocket.png" 
              alt="Rocket" 
              className="w-96 h-96 object-contain"
            />
          </div>

          {/* Features Grid - Right Side */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Top Row - Left Column */}
              <div className="space-y-3">
                <h3 className="text-2xl  font-bold text-blue-800">
                  Lifetime Deal
                </h3>
                <div className="w-12 h-0.5 bg-blue-800 "></div>
                <p className="text-gray-700 leading-relaxed ">
                  Lifetime Deal breaks the bondage of recurring payments every month. 
                  This means you don't have to worry about ROI every month because 
                  it is a one-time investment and lifetime usage.
                </p>
              </div>

              {/* Top Row - Right Column */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-800">
                  No Limit on Domains
                </h3>
                <div className="w-12 h-0.5 bg-blue-800"></div>
                <p className="text-gray-700 leading-relaxed">
                  You no longer have to worry about charges of adding a domain. 
                  You can literally add thousands of websites and work with all 
                  of them together without any issue.
                </p>
              </div>

              {/* Bottom Row - Left Column */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-800 ">
                  Unlimited Subscribers
                </h3>
                <div className="w-12 h-0.5 bg-blue-800"></div>
                <p className="text-gray-700 leading-relaxed">
                  We have clients who have more than 20M subscribers, and almost 
                  every post posted in their blog ranks to #1 because Notix 
                  drives real-time traffic like crazy.
                </p>
              </div>

              {/* Bottom Row - Right Column */}
              <div className="space-y-3">
                <h3 className="text-2xl font-bold text-blue-800">
                  Limitless Campaigns
                </h3>
                <div className="w-12 h-0.5 bg-blue-800"></div>
                <p className="text-gray-700 leading-relaxed">
                  There is no limit to anything we provide. We have developed 
                  Notix in such a way that you don't ever feel bound. We have 
                  removed every boundary that exists in this industry.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifetime;
