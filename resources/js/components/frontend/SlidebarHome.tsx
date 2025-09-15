'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Review {
  id: number;
  rating: number;
  daysAgo: number;
  title: string;
  text: string;
  reviewerName: string;
}

const reviews: Review[] = [
  {
    id: 1,
    rating: 5,
    daysAgo: 9,
    title: "Very happy with the service",
    text: "I am very happy with the Notix service. The notifications are delivered quickly and efficiently.",
    reviewerName: "Neha Sharma"
  },
  {
    id: 2,
    rating: 5,
    daysAgo: 13,
    title: "Perfect for small businesses",
    text: "Notix is the perfect solution for small businesses that want to send push notifications.",
    reviewerName: "Ranjan Sahoo"
  },
  {
    id: 3,
    rating: 4,
    daysAgo: 16,
    title: "Highly recommend",
    text: "I highly recommend Notix to anyone looking for a self-hosted push notification service.",
    reviewerName: "Ankur Agarwal"
  },
  {
    id: 4,
    rating: 4,
    daysAgo: 20,
    title: "Easy to use",
    text: "I am very happy with how easy it is to use. The interface is intuitive and user-friendly.",
    reviewerName: "Amit Kumar"
  },
  {
    id: 5,
    rating: 5,
    daysAgo: 25,
    title: "Excellent support team",
    text: "The support team is very helpful and responsive. They helped me set up everything quickly.",
    reviewerName: "Priya Patel"
  },
  {
    id: 6,
    rating: 5,
    daysAgo: 30,
    title: "Great value for money",
    text: "Notix offers great value for money. The features are exactly what we needed.",
    reviewerName: "Rajesh Verma"
  },
  {
    id: 7,
    rating: 5,
    daysAgo: 35,
    title: "Outstanding performance",
    text: "Notix has exceeded our expectations. The performance is outstanding and delivery rates are excellent.",
    reviewerName: "Sneha Reddy"
  },
  {
    id: 8,
    rating: 4,
    daysAgo: 40,
    title: "Reliable service",
    text: "Very reliable service with consistent delivery. Perfect for our marketing campaigns.",
    reviewerName: "Vikram Singh"
  },
  {
    id: 9,
    rating: 5,
    daysAgo: 45,
    title: "Best in the market",
    text: "After trying many services, Notix is definitely the best self-hosted solution available.",
    reviewerName: "Meera Kapoor"
  },
  {
    id: 10,
    rating: 5,
    daysAgo: 50,
    title: "Highly satisfied customer",
    text: "I am a highly satisfied customer. The setup was simple and the results are amazing.",
    reviewerName: "Arjun Malhotra"
  }
];

const SlidebarHome: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = () => {
    if (currentIndex < reviews.length - 3) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev + 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setIsTransitioning(true);
      setCurrentIndex(prev => prev - 1);
      setTimeout(() => setIsTransitioning(false), 300);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating 
            ? 'fill-green-500 text-green-500' 
            : 'fill-gray-300 text-gray-300'
        }`}
      />
    ));
  };

  const overallRating = 4.5;
  const totalReviews = 87;

  // Function to get number of visible slides based on screen size
  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // Mobile: 1 slide
      if (window.innerWidth < 1024) return 2; // Tablet: 2 slides
      return 3; // Desktop: 3 slides
    }
    return 3; // Default for SSR
  };

  return (
    <section className="py-8 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Section - Overall Rating */}
          <div className="w-full lg:w-1/4 space-y-4 sm:space-y-6">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Excellent
              </h2>
              
              {/* Stars */}
              <div className="flex justify-center lg:justify-start items-center space-x-1 mb-4">
                {Array.from({ length: 5 }, (_, index) => (
                  <Star
                    key={index}
                    className={`w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 ${
                      index < Math.floor(overallRating)
                        ? 'fill-green-500 text-green-500'
                        : index === Math.floor(overallRating) && overallRating % 1 !== 0
                        ? 'fill-green-500 text-green-500'
                        : 'fill-gray-300 text-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Based on{' '}
                <span className="underline font-medium">{totalReviews} reviews</span>
              </p>
              
              {/* Trustpilot Logo */}
              <div className="flex items-center justify-center lg:justify-start space-x-2">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-green-500 text-green-500" />
                <span className="text-lg sm:text-xl font-semibold text-gray-900">Trustpilot</span>
              </div>
            </div>
          </div>

          {/* Right Section - Reviews Carousel */}
          <div className="w-full lg:w-3/4 relative">
            <div className="overflow-hidden">
              <div 
                className={`flex transition-transform duration-300 ease-in-out ${
                  isTransitioning ? 'transform-gpu' : ''
                }`}
                style={{
                  transform: `translateX(-${currentIndex * (100 / getVisibleSlides())}%)`
                }}
              >
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`flex-shrink-0 px-2 sm:px-3 ${
                      getVisibleSlides() === 1 ? 'w-full' :
                      getVisibleSlides() === 2 ? 'w-1/2' : 'w-1/3'
                    }`}
                  >
                    <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                     <div className='flex justify-between items-center'>
                         {/* Rating Stars */}
                      <div className="flex items-center space-x-1 mb-2 sm:mb-3">
                        {renderStars(review.rating)}
                      </div>
                      
                      {/* Days Ago */}
                      <p className="text-xs sm:text-sm text-gray-500 mb-2 sm:mb-3">
                        {review.daysAgo} days ago
                      </p>
                     </div>
                      
                      {/* Review Title */}
                      <h3 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">
                        {review.title}
                      </h3>
                      
                      {/* Review Text */}
                      <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3">
                        {review.text}
                      </p>
                      
                      {/* Reviewer Name */}
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {review.reviewerName}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

                         {/* Navigation Arrows */}
             <button
               onClick={prevSlide}
               disabled={currentIndex === 0}
               className={`absolute left-0 sm:-left-2 lg:-left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                 currentIndex === 0 
                   ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                   : 'opacity-100 hover:scale-110'
               }`}
             >
               <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
             </button>

             <button
               onClick={nextSlide}
               disabled={currentIndex >= reviews.length - getVisibleSlides()}
               className={`absolute right-0 sm:-right-2 lg:-right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${
                 currentIndex >= reviews.length - getVisibleSlides()
                   ? 'opacity-50 cursor-not-allowed bg-gray-400' 
                   : 'opacity-100 hover:scale-110'
               }`}
             >
               <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
             </button>

            {/* Bottom Text */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-500">
                Showing our 4 & 5 star reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SlidebarHome;
