import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Sparkles, Youtube, Send, MoveRightIcon, MergeIcon } from 'lucide-react';
import { Button } from '@headlessui/react';
import DemoButton from './DemoButton';

interface AutomationCartProps {
  buttonText?: string;
}

const AutomationCart: React.FC<AutomationCartProps> = ({ buttonText = "Talk To An Expert" }) => {
  const automationFeatures = [
    {
      id: 1,
      icon: <Sparkles className="w-8 h-8 text-blue-600" />,
      title: "AutoMagic Push",
      description: "Select a random post from your recent X posts and schedule push notifications at your desired frequency.",
      color: "text-blue-600"
    },
    {
      id: 2,
      icon: <Youtube className="w-8 h-8 text-red-600" />,
      title: "Instart Push For Discover (Website) ",
      description: "Automatically send push notifications whenever you upload a new YouTube video. Keep your subscribers in the loop!",
      color: "text-red-600"
    },
    {
      id: 3,
      icon: <Send className="w-8 h-8 text-blue-600" />,
      title: "Push On Publish",
      description: "Send push notifications to your subscribers when you publish a new post. Rank your posts higher in Search.",
      color: "text-blue-600"
    },
    {
      id: 4,
      icon: <MergeIcon className="w-8 h-8 text-blue-600" />,
      title: "Migraion",
      description: "Send push notifications to your subscribers when you publish a new post. Rank your posts higher in Search.",
      color: "text-blue-600"
    }
  ];

  return (
    <section className="relative py-5 px-4 overflow-hidden">
      {/* Background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-30"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-blue-300 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 rounded-full opacity-25"></div>
        
        {/* Dotted patterns */}
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-blue-200 rounded-full opacity-15" 
             style={{ backgroundImage: 'radial-gradient(circle, transparent 30%, currentColor 30%, currentColor 40%, transparent 40%)', backgroundSize: '8px 8px' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-blue-200 rounded-full opacity-15"
             style={{ backgroundImage: 'radial-gradient(circle, transparent 30%, currentColor 30%, currentColor 40%, transparent 40%)', backgroundSize: '6px 6px' }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Main Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Also We bring{' '}
            <span className="text-blue-600">Automation</span>{' '}
            to the Next Level
          </h2>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {automationFeatures.map((feature) => (
            <Card key={feature.id} className="relative bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0">
              <CardContent className="p-6">
                {/* Icon */}
                <div className="flex justify-start mb-6">
                  <div className="p-3 bg-gray-50 rounded-full">
                    {feature.icon}
                  </div>
                </div>

                {/* Title */}
                <h3 className={`text-xl font-bold mb-4 text-start ${feature.color}`}>
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-start leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Call to Action Arrow */}
                <div className="flex justify-end">
                  <div className="p-2 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center mt-5">
          <DemoButton variant="primary" className="text-xl">
            <span>{buttonText}</span>
          </DemoButton>
        </div>
      </div>
    </section>
  );
};

export default AutomationCart;
