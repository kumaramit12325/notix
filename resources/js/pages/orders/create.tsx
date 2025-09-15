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

interface OrderCreateProps {
  users: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Orders',
    href: '/orders',
  },
  {
    title: 'Create Order',
    href: '#',
  },
];

export default function OrderCreate({ users }: OrderCreateProps) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    product_name: '',
    description: '',
    amount: 0,
    quantity: 1,
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/orders');
  };

  const calculateTotal = () => {
    return (Number(data.amount) * Number(data.quantity)).toFixed(2);
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create New Order" />
      
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
              <h1 className="text-3xl font-bold tracking-tight">Create New Order</h1>
              <p className="text-muted-foreground">
                Add a new order to the system
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
                  <Label htmlFor="product_name">Product Name *</Label>
                  <Input
                    id="product_name"
                    value={data.product_name}
                    onChange={(e) => setData('product_name', e.target.value)}
                    placeholder="Enter product name"
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
                      min="0"
                      value={data.amount}
                      onChange={(e) => setData('amount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
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
                      placeholder="1"
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

            {/* Customer & Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Customer & Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="user_id">Customer *</Label>
                  <Select
                    value={data.user_id}
                    onValueChange={(value) => setData('user_id', value)}
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
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={data.notes}
                    onChange={(e) => setData('notes', e.target.value)}
                    placeholder="Enter additional notes"
                    rows={3}
                  />
                </div>

                {/* Order Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Order Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Product:</span>
                      <span className="font-medium">{data.product_name || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Quantity:</span>
                      <span className="font-medium">{data.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Unit Price:</span>
                      <span className="font-medium">${Number(data.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-700 font-medium">Total:</span>
                      <span className="font-bold text-green-600">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.get('/orders')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Creating...' : 'Create Order'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
} 