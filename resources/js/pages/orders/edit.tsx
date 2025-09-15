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
  description: string | null;
  amount: number;
  quantity: number;
  total_amount: number;
  status: string;
  payment_status: string;
  notes: string | null;
  user_id: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface OrderEditProps {
  order: Order;
  users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Orders',
    href: '/orders',
  },
  {
    title: 'Edit Order',
    href: '#',
  },
];

export default function OrderEdit({ order, users }: OrderEditProps) {
  const { data, setData, put, processing, errors } = useForm({
    user_id: order.user_id,
    product_name: order.product_name,
    description: order.description || '',
    amount: order.amount,
    quantity: order.quantity,
    status: order.status,
    payment_status: order.payment_status,
    notes: order.notes || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/orders/${order.id}`);
  };

  const calculateTotal = () => {
    return (Number(data.amount) * Number(data.quantity)).toFixed(2);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit Order ${order.order_number}`} />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.get(`/orders/${order.id}`)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Order
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
              <p className="text-muted-foreground">
                Order #{order.order_number}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.get('/orders')}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Information */}
            <Card>
              <CardHeader>
                <CardTitle>Order Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="order_number">Order Number</Label>
                  <Input
                    id="order_number"
                    value={order.order_number}
                    disabled
                    className="bg-gray-50"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Order number cannot be changed
                  </p>
                </div>

                <div>
                  <Label htmlFor="product_name">Product Name *</Label>
                  <Input
                    id="product_name"
                    value={data.product_name}
                    onChange={(e) => setData('product_name', e.target.value)}
                    className={errors.product_name ? 'border-red-500' : ''}
                  />
                  {errors.product_name && (
                    <p className="text-sm text-red-500 mt-1">{errors.product_name}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    placeholder="Enter product description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="amount">Unit Price *</Label>
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
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={data.quantity}
                      onChange={(e) => setData('quantity', parseInt(e.target.value) || 1)}
                      className={errors.quantity ? 'border-red-500' : ''}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-red-500 mt-1">{errors.quantity}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="total_amount">Total Amount</Label>
                  <Input
                    id="total_amount"
                    value={`$${calculateTotal()}`}
                    disabled
                    className="bg-gray-50 font-semibold"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Calculated automatically
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Order Status & Customer */}
            <Card>
              <CardHeader>
                <CardTitle>Status & Customer</CardTitle>
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
                  <Label htmlFor="status">Order Status *</Label>
                  <Select
                    value={data.status}
                    onValueChange={(value) => setData('status', value)}
                  >
                    <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Processing">Processing</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-red-500 mt-1">{errors.status}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="payment_status">Payment Status *</Label>
                  <Select
                    value={data.payment_status}
                    onValueChange={(value) => setData('payment_status', value)}
                  >
                    <SelectTrigger className={errors.payment_status ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.payment_status && (
                    <p className="text-sm text-red-500 mt-1">{errors.payment_status}</p>
                  )}
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
              onClick={() => router.get(`/orders/${order.id}`)}
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