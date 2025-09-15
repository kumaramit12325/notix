import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, CreditCard, DollarSign, Wallet, User, Calendar, Hash, Download } from 'lucide-react';
import { PdfDownloadDebug } from '@/components/pdf-download-debug';
import { router } from '@inertiajs/react';

interface Payment {
  id: number;
  payment_number: string;
  amount: number;
  payment_method: string;
  status: string;
  transaction_id: string | null;
  payment_date: string;
  gateway_response: string | null;
  notes: string | null;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string | null;
  };
  order?: {
    id: number;
    order_number: string;
    product_name: string;
    total_amount: number;
  };
}

interface PaymentShowProps {
  payment: Payment;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Payments',
    href: '/payments',
  },
  {
    title: 'Payment Details',
    href: '#',
  },
];

export default function PaymentShow({ payment }: PaymentShowProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Refunded':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'Credit Card':
      case 'Debit Card':
        return <CreditCard className="h-5 w-5" />;
      case 'Cash':
        return <DollarSign className="h-5 w-5" />;
      case 'Wallet':
        return <Wallet className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this payment?')) {
      router.delete(`/payments/${payment.id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Payment ${payment.payment_number}`} />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
          
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Payment Details</h1>
              <p className="text-muted-foreground">
                Payment #{payment.payment_number}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.get('/payments')}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Payments
            </Button>
          
            <Button
              variant="outline"
              onClick={() => router.get(`/payments/${payment.id}/edit`)}
            >
              <Edit className="mr-1 h-4 w-4" />
              Edit Payment
            </Button>
            <Button
              variant="outline"
              onClick={handleDelete}
            >
              <Trash2 className="mr-1 h-4 w-4" />
              Delete Payment
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Payment Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Number</label>
                    <p className="text-lg font-semibold">{payment.payment_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Amount</label>
                    <p className="text-lg font-semibold text-green-600">
                      ${(Number(payment.amount) || 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                    <div className="flex items-center gap-2 mt-1">
                      {getMethodIcon(payment.payment_method)}
                      <span className="font-medium">{payment.payment_method}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Status</label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Transaction ID</label>
                    <p className="font-mono text-sm">
                      {payment.transaction_id || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Date</label>
                    <p className="font-medium">
                      {new Date(payment.payment_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
                
                {payment.gateway_response && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gateway Response</label>
                    <p className="text-sm bg-gray-50 p-3 rounded-md mt-1">
                      {payment.gateway_response}
                    </p>
                  </div>
                )}
                
                {payment.notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-sm bg-gray-50 p-3 rounded-md mt-1">
                      {payment.notes}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Customer Name</label>
                    <p className="font-medium">{payment.user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="font-medium">{payment.user.email}</p>
                  </div>
                  {payment.user.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="font-medium">{payment.user.phone}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Customer ID</label>
                    <p className="font-medium">#{payment.user.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Order */}
            {payment.order && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Hash className="h-5 w-5" />
                    Related Order
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Order Number</label>
                      <p className="font-medium">{payment.order.order_number}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Product</label>
                      <p className="font-medium">{payment.order.product_name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Order Amount</label>
                      <p className="font-medium">${(Number(payment.order.total_amount) || 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.get(`/orders/${payment.order!.id}`)}
                      >
                        View Order Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Summary Card */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Amount</span>
                  <span className="font-semibold">${(Number(payment.amount) || 0).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <Badge className={getStatusColor(payment.status)}>
                    {payment.status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method</span>
                  <span className="font-medium">{payment.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-xs text-muted-foreground mb-3 p-2 bg-blue-50 rounded-md">
                  💡 "View PDF" opens in new window, "Download PDF" saves directly to your device. Both work with Google Drive!
                </div>
                
                <PdfDownloadDebug
                  url={`/payments/${payment.id}/invoice`}
                  filename={`invoice-${payment.payment_number}.pdf`}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </PdfDownloadDebug>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.get(`/payments/${payment.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.get(`/users/${payment.user.id}`)}
                >
                  <User className="mr-2 h-4 w-4" />
                  View Customer
                </Button>
                {payment.order && (
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => router.get(`/orders/${payment.order?.id}`)}
                  >
                    <Hash className="mr-2 h-4 w-4" />
                    View Order
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 