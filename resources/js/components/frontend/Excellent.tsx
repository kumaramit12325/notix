import React from 'react';

const Excellent: React.FC = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Background decorative element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full opacity-30 transform translate-x-32 -translate-y-32"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          {/* Main Heading */}
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="text-slate-800">We Even Got Excellent</span>{' '}
            <span className="text-blue-600">Dashboard</span>{' '}
            <span className="text-slate-800">Features</span>
          </h2>
          
          {/* Separator */}
          <div className="w-24 h-1 bg-slate-800 mx-auto mb-8"></div>
          
          {/* Descriptive Paragraph */}
          <p className="text-xl  text-slate-700 leading-relaxed max-w-4xl mx-auto">
            We have added all the Dashboard Panel features for you to minimize your effort in sending push.
          </p>
          
                     {/* Additional Features Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
             {/* Project Cloning */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 4h8m-8 4h2m6-4v4m0 0v4" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Project Cloning</h3>
             </div>

             {/* Quick Push */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Quick Push</h3>
             </div>

             {/* Import & Export */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Import & Export</h3>
             </div>

             {/* Campaign Scheduling */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Campaign Scheduling</h3>
             </div>

             {/* Customizable Prompts */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Customizable Prompts</h3>
             </div>

             {/* Campaign Cloning */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 4h8m-8 4h2m6-4v4m0 0v4" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Campaign Cloning</h3>
             </div>

             {/* View Server Stats */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">View Server Stats</h3>
             </div>

             {/* Instant Delivery Notice */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Instant Delivery Notice</h3>
             </div>

             {/* Drip Notifications */}
             <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
               <div className="w-16 h-16 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                 </svg>
               </div>
               <h3 className="text-lg font-semibold text-slate-800 text-center">Drip Notifications</h3>
             </div>
           </div>
          
          
        </div>
      </div>
    </section>
  );
};

export default Excellent;
