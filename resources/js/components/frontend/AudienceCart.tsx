import React from 'react';

interface AudienceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const AudienceCard: React.FC<AudienceCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        
        <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">
          {description}
        </p>
        
        <div className="flex justify-end">
          <svg 
            className="w-5 h-5 text-blue-500" 
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
  );
};

const AudienceCart: React.FC = () => {
  const audienceMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z"/>
        </svg>
      ),
      title: "Websites Apps Androded",
      description: "Seamlessly grow your subscriber base from YouTube videos and redirect them to your website for conversion."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.71 19.5c-.83 1.24-2.04 2.5-3.5 2.5-1.66 0-3.5-1.34-3.5-3.5s1.34-3.5 3.5-3.5c1.46 0 2.67 1.26 3.5 2.5z"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
        </svg>
      ),
      title: "iPhones",
      description: "Easily capture subscribers directly from iOS devices. Get notifications directly to your subscribers' phones."
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
      ),
      title: "Links",
      description: "Collect subscribers through shareable subscription links. Perfect for use in email or across social media platforms."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white relative overflow-hidden">
      {/* Background decorative shapes */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-32 h-32 bg-blue-100 rounded-full opacity-30 -ml-16"></div>
      <div className="absolute right-0 top-1/4 w-24 h-24 bg-blue-100 rounded-full opacity-30 -mr-12"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 leading-tight">
            And you can collect{' '}
            <span className="text-blue-500">Audience</span>{' '}
            from Anywhere
          </h2>
        </div>
        
        {/* Audience Collection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {audienceMethods.map((method, index) => (
            <AudienceCard
              key={index}
              icon={method.icon}
              title={method.title}
              description={method.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceCart;
