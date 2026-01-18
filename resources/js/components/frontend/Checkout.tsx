import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight, ArrowLeft, Link, CreditCard, Bitcoin, DollarSign, Building2, X } from 'lucide-react';
import PricingPlansub from './pricingPlansub';
import { router } from '@inertiajs/react';

interface PricingPlan {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  currency: string;
  billing_period: string | null;
  features: string[];
  is_active: boolean;
  is_featured: boolean;
  sort_order: number;
  cta_text: string;
}

interface CheckoutProps {
  plans?: PricingPlan[];
}

const Checkout: React.FC<CheckoutProps> = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>('pro');
  const [premiumAddon, setPremiumAddon] = useState(false);
  const [accountDetailsExpanded, setAccountDetailsExpanded] = useState(false);
  const [billingDetailsExpanded, setBillingDetailsExpanded] = useState(true);
  const [companyDetailsExpanded, setCompanyDetailsExpanded] = useState(false);
  const [companyType, setCompanyType] = useState<'individual' | 'business'>('individual');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'emi' | 'phonepe' | 'cashfree'>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
 

  const products: Product[] = [
    {
      id: 'startup',
      name: 'Startup v5',
      price: 499.00,
      features: [
        'Unlimited Domains',
        'Unlimited Subscribers',
        'Unlimited Notification',
        'Customizable Prompt',
        'Project Cloning & Retargetting',
        'Basic Analytics',
        'Medium Sending Speed'
      ],
      selected: false
    },
    {
      id: 'pro',
      name: 'Pro v5',
      price: 799.00,
      features: [
        'Unlimited Domains',
        'Unlimited Subscribers',
        'Unlimited Notification',
        'Customizable Prompt',
        'Project Cloning & Retargetting',
        'Advanced Statistics',
        'Customizable Speed',
        'AutoMagic Push',
        'Schedule Notifications',
        'Wordpress Plugin',
        'Segmentation',
        'Import Export',
        'AMP Addition',
        'API For Developers'
      ],
      selected: true
    }
  ];

  const products = plans.length > 0 
    ? plans.map((plan, index) => ({
        id: plan.slug || `plan-${plan.id}`,
        name: plan.name,
        price: parseFloat(plan.price.toString()),
        features: plan.features || [],
        selected: index === 0 || plan.is_featured
      }))
    : defaultProducts;

  const defaultSelectedId = products.find(p => p.selected)?.id || products[0]?.id || 'pro';
  const [selectedProduct, setSelectedProduct] = useState<string>(defaultSelectedId);
  const [premiumAddon, setPremiumAddon] = useState(false);
  const [accountDetailsExpanded, setAccountDetailsExpanded] = useState(false);
  const [billingDetailsExpanded, setBillingDetailsExpanded] = useState(true);
  const [companyDetailsExpanded, setCompanyDetailsExpanded] = useState(false);
  const [companyType, setCompanyType] = useState<'individual' | 'business'>('individual');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'emi'>('card');
  const [termsAccepted, setTermsAccepted] = useState(false);
 

  const selectedProductData = products.find(p => p.id === selectedProduct);
  const gst = selectedProductData ? (selectedProductData.price * 0.18) : 0;
  const total = selectedProductData ? selectedProductData.price + gst : 0;
  const totalInr = total * 83; // Approximate conversion rate

  const handlePayment = () => {
    if (paymentMethod === 'phonepe') {
        router.post(route('phonepe.pay'), { amount: total });
    } else if (paymentMethod === 'cashfree') {
        router.post(route('cashfree.pay'), { amount: total });
    }
  };

  const premiumAddonFeatures = [
    'URL Shortener with subscription',
    'Collection through external links',
    'Templating & cloning options',
    'URL & directory segmentation',
    'YouTube links token collection',
    'Automated push for YouTube',
    'Automated Google Drive backup',
    'Priority support',
    'Real time link reports/analytics'
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Product Selection and Forms */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Product Selection */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Select a Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      product.id === selectedProduct
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedProduct(product.id)}
                  >
                    {product.id === selectedProduct && (
                      <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full"></div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="text-2xl font-bold text-blue-600 mb-3">${product.price.toFixed(2)}</div>
                    <ul className="space-y-1 text-sm text-gray-600">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    {product.id === selectedProduct && (
                      <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                        Qty: 1
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Addon */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Premium Addon</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-blue-600">$399.00</span>
                  <input
                    type="checkbox"
                    checked={premiumAddon}
                    onChange={(e) => setPremiumAddon(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
              <h4 className="font-medium text-gray-900 mb-3">LaraPush Premium Addon Includes:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {premiumAddonFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Account Details */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setAccountDetailsExpanded(!accountDetailsExpanded)}
              >
                <h3 className="text-lg font-semibold text-gray-900">ACCOUNT DETAILS</h3>
                {accountDetailsExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              {accountDetailsExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Website URL</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md">
                          https://
                        </span>
                        <input
                          type="text"
                          placeholder="Your Website Url"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country Code</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option>India (+91)</option>
                          <option>US (+1)</option>
                          <option>UK (+44)</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                          type="tel"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">How did you hear about us?</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>Competitors Website</option>
                        <option>Social Media</option>
                        <option>Search Engine</option>
                        <option>Referral</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Please specify (Optional)</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Billing Details */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setBillingDetailsExpanded(!billingDetailsExpanded)}
              >
                <h3 className="text-lg font-semibold text-gray-900">BILLING DETAILS</h3>
                {billingDetailsExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
              {billingDetailsExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        defaultValue="302001"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City/District</label>
                      <input
                        type="text"
                        defaultValue="JAIPUR"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                      <input
                        type="text"
                        defaultValue="Rajasthan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Company Details */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div
                className="flex items-center justify-between p-4 cursor-pointer"
                onClick={() => setCompanyDetailsExpanded(!companyDetailsExpanded)}
              >
                <h3 className="text-lg font-semibold text-gray-900">COMPANY DETAILS (Optional)</h3>
                {companyDetailsExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
              </div>
              {companyDetailsExpanded && (
                <div className="px-4 pb-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Company type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          companyType === 'individual'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setCompanyType('individual')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="companyType"
                            checked={companyType === 'individual'}
                            onChange={() => setCompanyType('individual')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Individual</div>
                            <div className="text-sm text-gray-500">For Personal Use</div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          companyType === 'business'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setCompanyType('business')}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="companyType"
                            checked={companyType === 'business'}
                            onChange={() => setCompanyType('business')}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div>
                            <div className="font-medium text-gray-900">Business</div>
                            <div className="text-sm text-gray-500">For Business Use</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms and Purchase Button - Left */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I've read the{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                </span>
              </div>
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  termsAccepted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!termsAccepted}
                onClick={handlePayment}
              >
                Complete Purchase
              </button>
            </div>
          </div>

          {/* Right Column - Summary and Payment */}
          <div className="space-y-6 ">
            
            {/* Order Summary */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">SUMMARY</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">1x LaraPush Pro v5</span>
                  <span className="font-medium">${selectedProductData?.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Convenience Fee</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="font-medium">${gst.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total</span>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">${total.toFixed(2)}</div>
                    <div className="text-sm font-semibold text-blue-600">or (₹{totalInr.toLocaleString('en-IN', { minimumFractionDigits: 2 })})</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <a href="#" className="text-blue-600 hover:underline text-sm">Have a coupon?</a>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">SELECT PAYMENT METHOD</h3>
              <div className="space-y-3">
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('card')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Credit/ Debit Card</div>
                        <div className="text-sm text-gray-500">Secure and encrypted</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                      <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                      <div className="w-8 h-5 bg-blue-800 rounded text-white text-xs flex items-center justify-center font-bold">AMEX</div>
                      <div className="w-8 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">DISCOVER</div>
                    </div>
                  </div>
                </div>
                
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'phonepe'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('phonepe')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'phonepe'}
                        onChange={() => setPaymentMethod('phonepe')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">PhonePe</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    paymentMethod === 'cashfree'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setPaymentMethod('cashfree')}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        checked={paymentMethod === 'cashfree'}
                        onChange={() => setPaymentMethod('cashfree')}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div>
                        <div className="font-medium text-gray-900">Cashfree</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms and Purchase Button - Right */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  I've read the{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms & Conditions</a>
                </span>
              </div>
              <button
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                  termsAccepted
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!termsAccepted}
              >
                Complete Purchase
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
