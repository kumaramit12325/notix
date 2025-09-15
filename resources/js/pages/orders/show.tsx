import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2, User, Package, DollarSign, Calendar, FileText, Download } from 'lucide-react';
import { PdfDownloadDebug } from '@/components/pdf-download-debug';
import { router } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Payment {
  id: number;
  payment_number: string;
  amount: number;
  payment_method: string;
  status: string;
  payment_date: string;
}

interface Order {
  id: number;
  order_number: string;
  product_name: string;
  description: string | null;
  amount: number;
  quantity: number;
  total_amount: number;
  status: string;
  payment_status: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  payments: Payment[];
}

interface OrderShowProps {
  order: Order;
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Orders',
    href: '/orders',
  },
  {
    title: 'Order Details',
    href: '#',
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Processing':
      return 'bg-blue-100 text-blue-800';
    case 'Completed':
      return 'bg-green-100 text-green-800';
    case 'Cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'Paid':
      return 'bg-green-100 text-green-800';
    case 'Failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OrderShow({ order }: OrderShowProps) {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      router.delete(`/orders/${order.id}`);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Order ${order.order_number}`} />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.get('/orders')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
              <p className="text-muted-foreground">
                Order #{order.order_number}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => router.get(`/orders/${order.id}/edit`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Order
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Order Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Order Number</label>
                    <p className="text-lg font-semibold">{order.order_number}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Product Name</label>
                    <p className="text-lg font-semibold">{order.product_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Quantity</label>
                    <p className="text-lg">{order.quantity}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Unit Price</label>
                    <p className="text-lg">${Number(order.amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Total Amount</label>
                    <p className="text-2xl font-bold text-green-600">${Number(order.total_amount).toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Order Status</label>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Payment Status</label>
                    <Badge className={getPaymentStatusColor(order.payment_status)}>
                      {order.payment_status}
                    </Badge>
                  </div>
                </div>

                {order.description && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Description</label>
                    <p className="text-sm mt-1">{order.description}</p>
                  </div>
                )}

                {order.notes && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Notes</label>
                    <p className="text-sm mt-1">{order.notes}</p>
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
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Customer Name</label>
                    <p className="text-lg font-semibold">{order.user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{order.user.email}</p>
                  </div>
                  {order.user.phone && (
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone</label>
                      <p className="text-lg">{order.user.phone}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment History */}
            {order.payments && order.payments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Payment History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {order.payments.map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-medium">{payment.payment_number}</p>
                            <p className="text-sm text-muted-foreground">
                              {payment.payment_method} • {new Date(payment.payment_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">${Number(payment.amount).toFixed(2)}</p>
                          <Badge className={getPaymentStatusColor(payment.status)}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Timeline */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Order Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Order Created</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium">Last Updated</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(order.updated_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <PdfDownloadDebug
                  url={`/orders/${order.id}/invoice`}
                  filename={`invoice-${order.order_number}.pdf`}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Invoice
                </PdfDownloadDebug>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.get(`/orders/${order.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Order
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.get(`/payments/create?order_id=${order.id}`)}
                >
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add Payment
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.get(`/users/${order.user.id}`)}
                >
                  <User className="mr-2 h-4 w-4" />
                  View Customer
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
} 