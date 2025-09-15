import React from 'react';

const Brand: React.FC = () => {
  const brands = [
    {
      id: 1,
      name: 'The Begusarai',
      logo: (
        <div className="flex items-center space-x-2">
          <div className="text-red-600">
            <div className="text-sm font-medium">The</div>
            <div className="text-xl font-bold">Begusarai</div>
          </div>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      )
    },
    {
      id: 2,
      name: 'Taza Hindi Samachar',
      logo: (
        <div className="bg-blue-400 rounded-lg p-3 text-white text-center">
          <div className="text-lg font-semibold">ताज़ा</div>
          <div className="text-sm">हिंदी समाचार</div>
        </div>
      )
    },
    {
      id: 3,
      name: 'Kisan Yojana',
      logo: (
        <div className="bg-green-600 border-2 border-white rounded-lg p-3 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
            </div>
          </div>
          <div className="text-white font-bold">
            <div>KISAN</div>
            <div className="text-sm">YOJANA</div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      name: 'Daily News 24',
      logo: (
        <div className="bg-red-600 border-2 border-white rounded-lg p-3 text-center">
          <div className="text-white">
            <div className="text-sm">DAILY</div>
            <div className="text-sm">NEWS</div>
            <div className="text-2xl font-bold">24</div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      name: 'Tollywood & Bollywood',
      logo: (
        <div className="bg-gray-800 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-yellow-400 text-2xl font-bold">B</div>
            <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-green-400 rounded-full"></div>
          </div>
          <div className="text-white text-xs mt-1">TOLLYWOOD & BOLLYWOOD</div>
        </div>
      )
    },
    {
      id: 6,
      name: 'Haryana Invest',
      logo: (
        <div className="rounded-lg overflow-hidden">
          <div className="bg-orange-500 p-2 text-center">
            <div className="flex items-center justify-center space-x-2 text-white">
              <div className="w-4 h-4 bg-white rounded"></div>
              <span className="font-semibold">हरियाणा</span>
            </div>
          </div>
          <div className="bg-green-600 p-2 text-center">
            <div className="text-white font-semibold">Invest</div>
            <div className="text-xs text-white">Hindi News & Education Portal</div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      name: 'Kannada News',
      logo: (
        <div className="bg-red-600 rounded-lg p-3 text-center">
          <div className="flex text-white">
            <div className="flex-1">ಕನ್ನಡ</div>
            <div className="bg-blue-600 px-2 rounded">ನ್ಯೂಸ್</div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      name: 'Timesbull',
      logo: (
        <div className="bg-red-600 rounded-lg p-3 text-center">
          <div className="text-white text-xl font-bold">Timesbull</div>
        </div>
      )
    },
    {
      id: 9,
      name: 'Plus Media',
      logo: (
        <div className="bg-purple-600 rounded-lg p-3 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="text-yellow-400 text-2xl font-bold">+</div>
            <div className="w-8 h-6 bg-purple-600 border border-white rounded"></div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          {/* Medal Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
            </div>
          </div>
          
          {/* Title */}
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Brands Who <span className="text-blue-600">Trust</span> US
          </h2>
          
          {/* Divider Line */}
          <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-6"></div>
          
          {/* Description */}
          <div className="max-w-5xl mx-auto text-gray-600 text-lg leading-relaxed">
            <p className="mb-4">
              We have lots of satisfied customers who use LaraPush regularly to send notifications to their subscribers.
            </p>
            <p className="mb-4">
              Some even have more than 400 million subscribers, which makes us one of the best push notification services and the top push notification company.
            </p>
            <p className="text-center text-lg font-medium">
              You can trust us 🤝
            </p>
          </div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-6xl mx-auto ">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-full h-20 flex items-center justify-center mb-3">
                {brand.logo}
              </div>
              <h3 className="text-sm text-gray-600 text-center font-medium">
                {brand.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brand;
