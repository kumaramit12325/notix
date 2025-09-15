import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import UserLayout from '@/layouts/user-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Info, 
  X, 
  ArrowRight, 
  Edit, 
  CreditCard, 
  Grid3X3,
  ChevronRight
} from 'lucide-react';

interface BillingInfo {
  name: string;
  company: string;
  address: string;
  contactNo: string;
  country: string;
  localCurrency: string;
}

interface SubscriptionPlan {
  name: string;
  subscribersLimit: number;
  cost: number;
  validity: string;
}

export default function SubscriptionPage() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  const [billingInfo, setBillingInfo] = useState({
    name: user.name || '',
    company: user.company || '',
    address: user.address || '',
    contactNo: user.phone || '',
    country: user.country || '',
    localCurrency: user.localCurrency || ''
  });

  const [isEditing, setIsEditing] = useState(false);

  const subscriptionPlan: SubscriptionPlan = {
    name: 'Free',
    subscribersLimit: 10000,
    cost: 0.00,
    validity: 'Forever'
  };

  const isFormValid = billingInfo.address && billingInfo.contactNo && 
                     billingInfo.country && billingInfo.localCurrency;

  const handleInputChange = (field: keyof BillingInfo, value: string) => {
    setBillingInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProceed = () => {
    // Handle proceed to billing logic
    console.log('Proceeding to billing...');
  };

  return (
    <UserLayout breadcrumbs={[
      { title: 'User Dashboard', href: '/user-dashboard' },
      { title: 'Subscription Update', href: '/user/subscription' }
    ]}>
      <Head title="Subscription Update" />
      
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Subscription Update</h1>
              <Info className="h-5 w-5 text-gray-500" />
            </div>
            
            {/* Step Navigation */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full">
                  <CreditCard className="h-4 w-4 text-white" />
                </div>
                <span className="text-blue-600 font-medium">Billing & Payment</span>
              </div>
              
              <ChevronRight className="h-5 w-5 text-gray-400" />
              
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                  <Grid3X3 className="h-4 w-4 text-gray-500" />
                </div>
                <span className="text-gray-500">Select Plan</span>
              </div>
            </div>

            {/* Alert */}
            {/* <Alert className="border-red-200 bg-red-50">
              <X className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">
                Billing Address and Local Currency needs to be updated before proceeding.
              </AlertDescription>
            </Alert> */}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Billing Information */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl text-gray-900">Billing Information</CardTitle>
                      <Info className="h-4 w-4 text-gray-500" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Name</Label>
                        <div className="mt-1 p-3 bg-gray-100 rounded-md">
                          <span className="text-gray-900 font-medium">{billingInfo.name}</span>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Company</Label>
                        {isEditing ? (
                          <Input
                            value={billingInfo.company}
                            onChange={(e) => handleInputChange('company', e.target.value)}
                            className="mt-1"
                            placeholder="Enter company name"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md min-h-[44px]">
                            <span className="text-gray-500">{billingInfo.company || 'Enter company name'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <Label className="text-sm font-medium text-gray-700">Address</Label>
                        {isEditing ? (
                          <Input
                            value={billingInfo.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="mt-1"
                            placeholder="Enter address"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md min-h-[44px]">
                            <span className="text-gray-500">{billingInfo.address || 'Enter address'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Contact No.</Label>
                        {isEditing ? (
                          <Input
                            value={billingInfo.contactNo}
                            onChange={(e) => handleInputChange('contactNo', e.target.value)}
                            className="mt-1"
                            placeholder="Enter contact number"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md min-h-[44px]">
                            <span className="text-gray-500">{billingInfo.contactNo || 'Enter contact number'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Country</Label>
                        {isEditing ? (
                          <Input
                            value={billingInfo.country}
                            onChange={(e) => handleInputChange('country', e.target.value)}
                            className="mt-1"
                            placeholder="Enter country"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md min-h-[44px]">
                            <span className="text-gray-500">{billingInfo.country || 'Enter country'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Local Currency</Label>
                        {isEditing ? (
                          <Input
                            value={billingInfo.localCurrency}
                            onChange={(e) => handleInputChange('localCurrency', e.target.value)}
                            className="mt-1"
                            placeholder="Enter local currency"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-white border border-gray-300 rounded-md min-h-[44px]">
                            <span className="text-gray-500">{billingInfo.localCurrency || 'Enter local currency'}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Subscription Summary */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Subscription Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Selected Plan</span>
                        <span className="text-sm font-medium text-gray-900">{subscriptionPlan.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subscribers Limit</span>
                        <span className="text-sm font-medium text-gray-900">{subscriptionPlan.subscribersLimit.toLocaleString()}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Subscription Cost</span>
                        <span className="text-sm font-medium text-gray-900">$ {subscriptionPlan.cost.toFixed(2)} /month</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Plan Validity</span>
                        <span className="text-sm font-medium text-gray-900">{subscriptionPlan.validity}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Payable Amount</span>
                        <span className="text-sm font-bold text-gray-900">$0.00 /month</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Adjusted Amount</span>
                        <span className="text-sm font-bold text-gray-900">(-) $0.00</span>
                      </div>
                      
                      <div className="flex justify-between pt-2 border-t">
                        <span className="text-base font-medium text-gray-900">Total Payable Amount</span>
                        <span className="text-lg font-bold text-gray-900">$0.00</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleProceed}
                      disabled={!isFormValid}
                      className={`w-full mt-6 ${
                        isFormValid 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Proceed to Billing
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
