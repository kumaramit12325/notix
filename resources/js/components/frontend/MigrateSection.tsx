import React, { useState } from 'react';
import DemoButton from './DemoButton';

const MigrateSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      name: "Crida.in",
      company: "Media Agency",
      text: "100% recommended. IF you are a media buyer, then Notix is for you 🔥 One of the best push notification services out there!",
      avatar: "C"
    },
    {
      name: "TechFlow Solutions",
      company: "SaaS Platform",
      text: "Notix helped us increase our engagement rates by 300%. The migration process was seamless and the support team is amazing!",
      avatar: "T"
    },
    {
      name: "DigitalMarketers Pro",
      company: "Marketing Agency",
      text: "We've tried many push notification services, but Notix stands out with its reliability and advanced targeting features.",
      avatar: "D"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  return (
    <section className="relative bg-white py-16 px-4 overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-32 -translate-y-32"></div>
      
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Main Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          <span className="text-gray-800">And Don't Worry, We'll </span>
          <span className="text-blue-600">Migrate</span>
          <span className="text-gray-800"> You.</span>
        </h2>
        
        {/* Separator line */}
        <div className="w-24 h-1 bg-gray-800 mx-auto mb-8"></div>
        
        {/* Description text */}
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12">
          If you are already using another push notification service, you won't lose your existing subscribers. 
          We will migrate all of your existing tokens from your current push notification service to your 
          Notix Pro Panel without any hassle.
        </p>
   
        {/* Customer Testimonials Slider */}
        <div className="mb-12">
          
          {/* Testimonial Card */}
          <div className="bg-gradient-to-b from-blue-600 to-blue-500 rounded-2xl p-8 text-white relative overflow-hidden">
          {/* Testimonial Heading */}
          <h3 className="text-4xl text-white font-bold text-gray-800 mb-8">
            Hear from our customers ✨
          </h3>
          
            
            {/* Separator line */}
            <div className="w-16 h-0.5 bg-white mx-auto mb-6 opacity-80"></div>
            
            <div className="flex items-center space-x-6 flex-row justify-center px-20">
              {/* Avatar */}
              <div className="flex-shrink-0 ">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center border-5 border-red-600">
                  <span className="text-blue-600 text-5xl font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 text-left ">
                <div className="mb-2">
                  <h4 className="text-lg font-semibold">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-blue-100 text-sm">({testimonials[currentTestimonial].company})</p>
                </div>
               
              </div>
              <div className=" w-2/3">
              <blockquote className="text-lg leading-relaxed">
                  "{testimonials[currentTestimonial].text}"
                </blockquote>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-6 mt-8">
            <button
              onClick={prevTestimonial}
              className="text-blue-600 hover:text-blue-700 transition-colors text-2xl font-bold"
            >
              ←
            </button>
            
            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="text-blue-600 hover:text-blue-700 transition-colors text-2xl font-bold"
            >
              →
            </button>
          </div>
        </div>
        
        {/* CTA Button */}  
        <DemoButton variant="primary" className="text-xl">
          Book a Demo
        </DemoButton>
      </div>
    </section>
  );
};

export default MigrateSection;
