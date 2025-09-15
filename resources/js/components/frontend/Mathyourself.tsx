import React from 'react';
import { Button } from '@/components/ui/button';

const Mathyourself: React.FC = () => {
  const services = [
    {
      name: 'Onesignal',
      costPerMillion: '$3000',
      estimatedSubs: '10 Mil',
      totalCost: '$30,000 + platform fee + taxes per year'
    },
    {
      name: 'Gravitec',
      costPerMillion: '$1000 / month',
      estimatedSubs: '10 Mil',
      totalCost: '$120,000 + taxes per year'
    },
    {
      name: 'Notix',
      costPerMillion: '$1000',
      estimatedSubs: '10 Mil',
      totalCost: '$10,000 + taxes per year'
    },
    {
      name: 'Notix',
      costPerMillion: '$0',
      estimatedSubs: 'Unlimited',
      totalCost: '$499 for Lifetime',
      isRecommended: true
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
      <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Do the <span className='text-blue-600'>Math</span> yourself
          </h2>
          <div className="w-16 h-0.5 bg-black mx-auto mt-2"></div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Pricing Comparison Table - 2/3 width */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Service</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Cost / 1M Subs</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-r border-gray-200">Estimated Subs / Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className={`px-6 py-4 border-r border-gray-200 ${service.isRecommended ? 'font-bold' : ''}`}>
                        {service.name}
                      </td>
                      <td className={`px-6 py-4 border-r border-gray-200 ${service.isRecommended ? 'font-bold' : ''}`}>
                        {service.costPerMillion}
                      </td>
                      <td className={`px-6 py-4 border-r border-gray-200 ${service.isRecommended ? 'font-bold' : ''}`}>
                        {service.estimatedSubs}
                      </td>
                      <td className={`px-6 py-4 ${service.isRecommended ? 'font-bold' : ''}`}>
                        {service.totalCost}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Descriptive Content - 1/3 width */}
          <div className="lg:col-span-1 space-y-4 text-base text-gray-900">
            <p>
              Our customer base ranges from 1 to 50 million subscribers.
            </p>
            
            <p>
              If you aim to acquire 0.5 million or 5 lakhs subscribers in a year 
              (which is a conservative estimate), you will still have to pay more than $5000 per year 
              to other push notification service providers.
            </p>
            
            <p>
              If you doubt, you can check their pricing plans and do the math yourself.
            </p>
            
            <p>
              Additionally, we are truly unlimited. You can check the features comparison table on our{' '}
              <Button variant="link" className="p-0 h-auto text-blue-600 hover:text-blue-800 underline">
                features page
              </Button>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mathyourself;
