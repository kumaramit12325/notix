import React, { useState } from 'react';

// WordPress Icon Component
const WordPressIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <span className="text-white text-2xl font-bold">W</span>
  </div>
);

// Fastest Delivery Icon Component
const FastestDeliveryIcon = () => (
  <div className="w-12 h-12 relative">
    <div className="w-full h-full bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  </div>
);

// Analytics Icon Component
const AnalyticsIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  </div>
);

// Segmentation Icon Component
const SegmentationIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </div>
);

// Templates Icon Component
const TemplatesIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <div className="grid grid-cols-2 gap-1">
      <div className="w-3 h-3 bg-white rounded-sm"></div>
      <div className="w-3 h-3 bg-white rounded-sm"></div>
      <div className="w-3 h-3 bg-white rounded-sm"></div>
      <div className="w-3 h-3 bg-white rounded-sm"></div>
    </div>
  </div>
);

// Blogger Icon Component
const BloggerIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
    <span className="text-white text-xl font-bold">B</span>
  </div>
);

// API for Developers Icon Component
const APIIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  </div>
);

// Google Drive Backup Icon Component
const GoogleDriveIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <div className="relative w-8 h-8">
      <div className="absolute top-0 left-0 w-4 h-4 bg-white rounded-sm transform rotate-45 origin-bottom-right"></div>
      <div className="absolute top-0 right-0 w-4 h-4 bg-white rounded-sm transform -rotate-45 origin-bottom-left"></div>
      <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-white rounded-sm transform translate-x-1/2"></div>
    </div>
  </div>
);

// Security Icon Component
const SecurityIcon = () => (
  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  </div>
);

// Feature Card Component
const FeatureCard = ({ Icon, title, description, href, onClick }: {
  Icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="group relative bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4">
          {Icon}
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed flex-grow">
          {description}
        </p>
        
        {/* Arrow Icon */}
        <div className="mt-4 flex justify-end">
          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors duration-300">
            <svg 
              className="w-3 h-3 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7" 
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
const FeatureModal = ({ isOpen, onClose, feature }: {
  isOpen: boolean;
  onClose: () => void;
  feature: any;
}) => {
  if (!isOpen || !feature) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-lg max-w-md w-full p-6 relative border border-gray-200 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors bg-white rounded-full p-1 shadow-md"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="text-center">
          {/* Icon */}
          <div className="mb-4 flex justify-center">
            {feature.Icon}
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {feature.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-4">
            {feature.description}
          </p>
          
          {/* Action Button */}
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Features Data
const featuresData = [
  {
    Icon: <WordPressIcon />,
    title: "WordPress Plugin",
    description: "Send push notifications to your subscribers with just one click or send push notification as soon as you publish.",
    href: "#"
  },
  {
    Icon: <FastestDeliveryIcon />,
    title: "Fastest Push Delivery",
    description: "Our notification delivery significantly surpasses that of available SAAS solutions.",
    href: "#"
  },
  {
    Icon: <AnalyticsIcon />,
    title: "Advanced Analytics",
    description: "Comprehensive view of your audience on multiple parameters including Location and much more..",
    href: "#"
  },
  {
    Icon: <SegmentationIcon />,
    title: "Segmentation",
    description: "Segment your audience and send notification on multiple parameters including the page they subscribed to.",
    href: "#"
  },
  {
    Icon: <TemplatesIcon />,
    title: "Templates",
    description: "Create custom push notification templates for quick reuse, ensuring consistency and saving time in your campaigns.",
    href: "#"
  },
  {
    Icon: <BloggerIcon />,
    title: "AMP Compatible",
    description: "We officially support Blogger and Google's AMP. Keep your blog posts on Google Discover and gain subscribers rapidly.",
    href: "#"
  },
  {
    Icon: <APIIcon />,
    title: "API for Developers",
    description: "We have a REST API for developers. You can get creative and build your own custom integration or automation.",
    href: "#"
  },
  {
    Icon: <GoogleDriveIcon />,
    title: "Google Drive Backup",
    description: "Automatically back up your subscribers data to your own Google Drive account to keep it extra safe in case of recovery.",
    href: "#"
  },
  {
    Icon: <SecurityIcon />,
    title: "Security",
    description: "In self-hosted push notification panel, unlike SAAS, tokens remain on your server. Nobody can use them unless you allow.",
    href: "#"
  }
];

// Main Features Section Component
export default function FeaCart() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute top-8 right-8 opacity-20">
        <div className="grid grid-cols-3 gap-2">
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            We Got All Of The{' '}
            <span className="text-blue-600 underline decoration-2 underline-offset-4">
              Features
            </span>{' '}
            In The Industry!
          </h2>
          
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            When we developed Notix, we collected all the features available in the industry and added them in. 
            We wanted to make sure that{' '}
            <strong className="font-semibold">
              You Never Have To Think Even Once About Any Limitations
            </strong>{' '}
            before purchasing the product.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, index) => (
            <FeatureCard
              key={index}
              Icon={feature.Icon}
              title={feature.title}
              description={feature.description}
              href={feature.href}
              onClick={() => handleFeatureClick(feature)}
            />
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={closeModal}
        feature={selectedFeature}
      />
    </section>
  );
}
