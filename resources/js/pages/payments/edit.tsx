import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Save, X } from 'lucide-react';
import { router } from '@inertiajs/react';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Order {
  id: number;
  order_number: string;
  product_name: string;
  total_amount: number;
}

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
  user_id: number;
  order_id: number | null;
  user: {
    id: number;
    name: string;
    email: string;
  };
  order?: {
    id: number;
    order_number: string;
    product_name: string;
  };
}

interface PaymentEditProps {
  payment: Payment;
  users: User[];
  orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Payments',
    href: '/payments',
  },
  {
    title: 'Edit Payment',
    href: '#',
  },
];

export default function PaymentEdit({ payment, users, orders }: PaymentEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: payment.user_id,
    order_id: payment.order_id || 'none',
    amount: payment.amount,
    payment_method: payment.payment_method,
    status: payment.status,
    transaction_id: payment.transaction_id || '',
    gateway_response: payment.gateway_response || '',
    notes: payment.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update the form data to convert 'none' to null
    if (data.order_id === 'none') {
      setData('order_id', null as any);
    }
    
    put(`/payments/${payment.id}`);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Payment ${payment.payment_number}`} />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Payment</h1>
              <p className="text-muted-foreground">
                Payment #{payment.payment_number}
              </p>
            </div>
          </div>
            <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.get(`/payments/${payment.id}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.get('/payments')}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
            </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="payment_number">Payment Number</Label>
                  <Input
                    id="payment_number"
                    value={payment.payment_number}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment number cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="amount">Amount *</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={data.amount}
                    onChange={(e) => setData('amount', parseFloat(e.target.value) || 0)}
                    className={errors.amount ? 'border-red-500' : ''}
                  />
                  {errors.amount && (
                    <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="payment_method">Payment Method *</Label>
                  <Select
                    value={data.payment_method}
                    onValueChange={(value) => setData('payment_method', value)}
                  >
                    <SelectTrigger className={errors.payment_method ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cash">Cash</SelectItem>
                      <SelectItem value="Credit Card">Credit Card</SelectItem>
                      <SelectItem value="Debit Card">Debit Card</SelectItem>
                      <SelectItem value="UPI">UPI</SelectItem>
                      <SelectItem value="Net Banking">Net Banking</SelectItem>
                      <SelectItem value="Wallet">Wallet</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_method && (
                    <p className="text-sm text-red-500 mt-1">{errors.payment_method}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                  >
                    <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                      <SelectItem value="Refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-500 mt-1">{errors.status}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="transaction_id">Transaction ID</Label>
                  <Input
                    id="transaction_id"
                    value={data.transaction_id}
                    onChange={(e) => setData('transaction_id', e.target.value)}
                    placeholder="Enter transaction ID"
                  />
                </div>

                <div>
                  <Label htmlFor="payment_date">Payment Date</Label>
                  <Input
                    id="payment_date"
                    type="datetime-local"
                    value={new Date(payment.payment_date).toISOString().slice(0, 16)}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment date cannot be changed
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer & Order Information */}
            <Card>
              <CardHeader>
                <CardTitle>Customer & Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="user_id">Customer *</Label>
                  <Select
                    value={data.user_id.toString()}
                    onValueChange={(value) => setData('user_id', parseInt(value))}
                  >
                    <SelectTrigger className={errors.user_id ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.name} ({user.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.user_id && (
                    <p className="text-sm text-red-500 mt-1">{errors.user_id}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="order_id">Related Order</Label>
                  <Select
                    value={data.order_id ? data.order_id.toString() : 'none'}
                    onValueChange={(value) => setData('order_id', value === 'none' ? 'none' : parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select order (optional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Order</SelectItem>
                      {orders.map((order) => (
                        <SelectItem key={order.id} value={order.id.toString()}>
                          {order.order_number} - {order.product_name} (${order.total_amount})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.order_id && (
                    <p className="text-sm text-red-500 mt-1">{errors.order_id}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="gateway_response">Gateway Response</Label>
                  <Textarea
                    id="gateway_response"
                    value={data.gateway_response}
                    onChange={(e) => setData('gateway_response', e.target.value)}
                    placeholder="Enter gateway response details"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Enter additional notes"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.get(`/payments/${payment.id}`)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
} 