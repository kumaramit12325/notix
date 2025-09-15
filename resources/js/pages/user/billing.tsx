import { Head, usePage } from '@inertiajs/react'
import UserLayout from '@/layouts/user-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Info, Edit, Rocket, Package } from 'lucide-react'

interface Payment {
  date: string
  amount: string
  status: string
  invoiceId: string
}

export default function UserBilling() {
  const { auth } = usePage().props as any;
  const user = auth?.user || {};
  const subscriptionData = {
    currentPlan: user.plan || 'Free',
    accountExpiry: user.accountExpiry || 'Forever',
    planPrice: user.planPrice || '$0/month'
  };
  const billingInfo = {
    name: user.name || '',
    company: user.company || '',
    address: user.address || '',
    contactNo: user.phone || '',
    country: user.country || ''
  };

  const usageStats = {
    activeSubscribers: {
      current: 0,
      limit: 10000,
      percentage: 0
    },
    fairUsageLimit: {
      current: 0,
      limit: 300000,
      percentage: 0
    }
  }

  const payments: Payment[] = [] // Empty payments array

  return (
    <UserLayout breadcrumbs={[
      { title: 'User Dashboard', href: '/user-dashboard' },
      { title: 'Billing', href: '/user/billing' }
    ]}>
      <Head title="Billing" />
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold">Billing</h1>
          <Info className="h-5 w-5 text-blue-500" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Subscription & Billing Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subscription Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">Subscription Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Current Plan:</span>
                    <span className="font-semibold">{subscriptionData.currentPlan}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Account Expiry:</span>
                    <span className="font-semibold">{subscriptionData.accountExpiry}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">Plan Price:</span>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-blue-600">{subscriptionData.planPrice}</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 gap-2">
                        <Rocket className="h-4 w-4" />
                        Upgrade
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing Information */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Billing Information</CardTitle>
                  <Button variant="ghost" size="sm" className="gap-2 text-blue-600 hover:text-blue-700">
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Name:</span>
                    <span className="font-semibold">{billingInfo.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Company:</span>
                    <span className="text-gray-400">{billingInfo.company || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Address:</span>
                    <span className="text-gray-400">{billingInfo.address || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-600">Contact No.:</span>
                    <span className="text-gray-400">{billingInfo.contactNo || '-'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-600">Country:</span>
                    <span className="text-gray-400">{billingInfo.country || '-'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payments Section */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg font-semibold">Payments</CardTitle>
                  <Info className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                      <Package className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 font-medium">No Data</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Payment Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Amount</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">Invoice ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map((payment, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-4">{payment.date}</td>
                            <td className="py-3 px-4">{payment.amount}</td>
                            <td className="py-3 px-4">
                              <Badge variant={payment.status === 'Paid' ? 'default' : 'secondary'}>
                                {payment.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">{payment.invoiceId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Usage Statistics */}
          <div className="space-y-6">
            {/* Active Subscribers Widget */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Active Subscribers</h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Circular Progress */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - usageStats.activeSubscribers.percentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {usageStats.activeSubscribers.current}
                      </span>
                      <span className="text-sm text-gray-500">
                        / {usageStats.activeSubscribers.limit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fair Usage Limit Widget */}
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-4">Fair Usages Limit</h3>
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    {/* Circular Progress */}
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      {/* Background circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#f3f4f6"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="60"
                        cy="60"
                        r="54"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="8"
                        strokeDasharray={`${2 * Math.PI * 54}`}
                        strokeDashoffset={`${2 * Math.PI * 54 * (1 - usageStats.fairUsageLimit.percentage / 100)}`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Center text */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-green-600">
                        {usageStats.fairUsageLimit.percentage.toString().padStart(2, '0')}%
                      </span>
                      <span className="text-sm text-gray-500">
                        {usageStats.fairUsageLimit.current.toLocaleString()} / {usageStats.fairUsageLimit.limit.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </UserLayout>
  )
}
