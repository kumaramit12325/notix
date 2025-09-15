import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Check, X, ChevronDown } from 'lucide-react';

interface FeatureItem {
  id: number;
  name: string;
  basic: boolean | string;
  advanced: boolean | string;
  description: string;
}

const Forever: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0); // First item open by default

  const features: FeatureItem[] = [
    {
      id: 0,
      name: "Unlimited Domains",
      basic: true,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 1,
      name: "Unlimited Subscribers",
      basic: true,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 2,
      name: "Customizable Prompt",
      basic: true,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 3,
      name: "Project Cloning & Retargetting",
      basic: true,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 4,
      name: "Campaign Reports",
      basic: true,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 5,
      name: "Analytics",
      basic: "Basic",
      advanced: "Advanced",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 6,
      name: "AutoMagic Push",
      basic: false,
      advanced: true,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ];

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id);
  };

  const premiumModules = [
    "YouTube links token collection",
    "URL shortener with subscription",
    "Templating & cloning options",
    "URL & directory segmentation",
    "Automated push for YouTube",
    "Automated Google Drive Backup",
    "Collection through external links",
    "Priority support",
    "Real time link reports/analytics"
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Pay Once, Use Forever Section */}
        <div className="text-center mb-20">
          {/* Main Headline */}
          <div className="flex items-center justify-center gap-6 mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Pay Once,{' '}
              <span className="text-blue-600">Use Forever</span>
            </h1>
            
            {/* Call-to-Action Button */}
            <Button 
              variant="outline" 
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-200 px-6 py-3 rounded-full"
            >
              <span className="mr-2">Talk to a Human</span>
              <div className="flex -space-x-2">
                <Avatar className="w-6 h-6 border-2 border-white">
                  <AvatarImage src="/images/avatar1.jpg" alt="Support Team Member 1" />
                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs font-medium">
                    JD
                  </AvatarFallback>
                </Avatar>
                <Avatar className="w-6 h-6 border-2 border-white">
                  <AvatarImage src="/images/avatar2.jpg" alt="Support Team Member 2" />
                  <AvatarFallback className="bg-green-100 text-green-600 text-xs font-medium">
                    MK
                  </AvatarFallback>
                </Avatar>
              </div>
            </Button>
          </div>

          {/* Separator Line */}
          <div className="w-24 h-0.5 bg-gray-900 mx-auto mb-6"></div>

          {/* Supporting Text */}
          <p className="text-md text-gray-700 max-w-2xl mx-auto">
            Every purchase includes a{' '}
            <span className="text-blue-600 font-medium">perpetual license</span>
            {' '}that you can use forever.
          </p>
        </div>

        {/* Pricing Comparison Table */}
        <div className='flex justify-center bg-blue-50 pt-2 relative'>
            {/* EMI Ribbon */}
            <div className='absolute top-10 right-5 bg-blue-600 text-white px-4 py-2 transform rotate-45 translate-x-8 -translate-y-2 text-sm font-medium'>
                EMIs Available
            </div>
            <div className='w-1/2 p-5'>
                <h2 className='text-5xl text-blue-600 font-bold mb-3'>Features</h2>
                <p>That make Notix different.</p>
                <p>Get Enterprise level features, all at a one time cost</p>
            </div>
            <div className='w-1/2 p-2'>
                <div className='flex justify-center items-center'>
                    <div className='w-1/2 p-5'>
                        <h2 className='text-2xl font-bold text-gray-600 my-3'>STARTUP</h2>
                        <h2>USD <span className='text-5xl'>499</span> /ONETIME</h2>
                        <Button className='bg-blue-500 my-3 rounded-full hover:bg-blue-600 w-full text-white'>Buy Now</Button>
                    </div>
                    <div className='w-1/2 p-5'>
                        <h2 className='text-2xl font-bold text-gray-600 my-3'>PRO</h2>
                        <h2>USD <span className='text-5xl'>799</span> /ONETIME</h2>
                        <Button className='bg-blue-500 my-3 rounded-full hover:bg-blue-600 w-full text-white'>Buy Now</Button>
                    </div>
                   
                </div>
            </div>
        </div>

   

        {/* Feature Comparison Table - Image Design */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Table Header */}
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 rounded-t-lg">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Basic</h3>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900">Advanced</h3>
                </div>
              </div>
            </div>

            {/* Feature Items */}
            <div className="divide-y divide-gray-200">
              {features.map((feature) => (
                <div key={feature.id} className="relative">
                  {/* Feature Row - Clickable */}
                  <button
                    onClick={() => toggleItem(feature.id)}
                    className={`w-full p-6 text-left transition-all duration-200 ease-in-out ${
                      openItem === feature.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-4 items-center">
                      {/* Feature Name with Chevron */}
                      <div className="flex items-center space-x-3">
                        <span className="text-black font-medium">&gt;</span>
                        <span className={`font-bold ${
                          openItem === feature.id ? 'text-blue-600' : 'text-blue-900'
                        }`}>
                          {feature.name}
                        </span>
                      </div>

                      {/* Basic Column */}
                      <div className="text-center">
                        {typeof feature.basic === 'boolean' ? (
                          feature.basic ? (
                            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-white" />
                            </div>
                          )
                        ) : (
                          <span className="text-sm font-medium text-gray-700">{feature.basic}</span>
                        )}
                      </div>

                      {/* Advanced Column */}
                      <div className="text-center">
                        {typeof feature.advanced === 'boolean' ? (
                          feature.advanced ? (
                            <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mx-auto">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          ) : (
                            <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center mx-auto">
                              <X className="w-4 h-4 text-white" />
                            </div>
                          )
                        ) : (
                          <span className="text-sm font-medium text-gray-700">{feature.advanced}</span>
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Feature Details Content */}
                  {openItem === feature.id && (
                    <div className="px-6 pb-6 bg-white">
                      <div className="pt-4 text-gray-600 leading-relaxed">
                        {feature.description}
                      </div>
                    </div>
                  )}
                </div>

              ))}
            </div>
          </div>
        </div>

             {/* Premium Add-on Section - Two Column Layout */}
             <div className="mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section - Premium Add-on */}
            <div className="bg-blue-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-6">Premium Add-on</h2>
              <div className="text-start mb-8">
                <div className="text-gray-700 mb-2">
                  <span className="text-lg">USD</span>
                  <span className="text-5xl font-bold text-blue-900 mx-2">399</span>
                  <span className="text-lg">/ONETIME</span>
                </div>
              </div>
              <Button className="w-1/2 bg-blue-600 hover:bg-blue-600 text-white py-3 rounded-lg text-lg font-medium">
                Buy Now with Pro
              </Button>
            </div>

            {/* Right Section - Modules Included */}
            <div className="bg-white rounded-lg p-8 border border-gray-200 relative">
              {/* Decorative Dots Pattern */}
              <div className="absolute top-6 right-6">
                <div className="grid grid-cols-3 gap-1">
                  {[...Array(9)].map((_, i) => (
                    <div key={i} className="w-2 h-2 bg-blue-200 rounded-full"></div>
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-blue-900 mb-6">Modules Included</h3>
              <div className="space-y-2">
                {premiumModules.map((module, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-blue-900 underline cursor-pointer hover:text-blue-700">
                      {module}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-6 flex justify-between items-center">
            {/* Currency Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-700">Currency:</span>
              <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Tax Disclaimer */}
            <p className="text-sm italic text-blue-900">* Prices are exclusive of Taxes.</p>
          </div>
        </div>
      
      </div>
    </section>
  );
};

export default Forever;
