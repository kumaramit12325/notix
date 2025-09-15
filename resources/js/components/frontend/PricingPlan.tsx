import React from 'react';

const PricingPlan: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-blue-600">
              Pricing & Plans
            </h2>
            
            {/* Underline */}
            <div className="w-20 h-1 bg-black"></div>
            
            {/* Description paragraph */}
            <p className="text-lg text-gray-700 leading-relaxed">
              Unlike other services, <strong>Notix</strong> requires only a one-time payment, 
              that's it! A one-time payment, that will allow you to go unlimited 🚀
            </p>
          </div>
          
          {/* Right side - Heart hands illustration */}
          <div className="flex justify-center lg:justify-end">
            <img 
              src="/images/heart-hand.png" 
              alt="Heart hands illustration" 
              className="w-full max-w-md lg:max-w-lg h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
