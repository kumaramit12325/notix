import { useState, useEffect } from 'react';
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
  payment_status: string;
  user_id: number;
}

interface PaymentCreateProps {
  users: User[];
  orders: Order[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Payments',
    href: '/payments',
  },
  {
    title: 'Create Payment',
    href: '#',
  },
];

export default function PaymentCreate({ users, orders }: PaymentCreateProps) {
  const { data, setData, post, processing, errors } = useForm({
    user_id: '',
    order_id: '',
    amount: 0,
    payment_method: '',
    status: 'Pending',
    transaction_id: '',
    gateway_response: '',
    notes: '',
  });

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  // Get URL parameters for pre-filling order_id
  const urlParams = new URLSearchParams(window.location.search);
  const orderIdParam = urlParams.get('order_id');

  useEffect(() => {
    if (orderIdParam) {
      const order = orders.find(o => o.id.toString() === orderIdParam);
      if (order) {
        setData('order_id', order.id.toString());
        setData('amount', order.total_amount);
        setSelectedOrder(order);
        setData('user_id', order.user_id.toString());
      }
    }
  }, [orderIdParam, orders]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert empty string to null for order_id
    if (data.order_id === '') {
      setData('order_id', null as any);
    }
    
    post('/payments');
  };

  const handleUserChange = (userId: string) => {
    setData('user_id', userId);
    const user = users.find(u => u.id.toString() === userId);
    setSelectedUser(user || null);
  };

  const handleOrderChange = (orderId: string) => {
    if (orderId === 'none') {
      setData('order_id', '');
      setSelectedOrder(null);
      setData('amount', 0);
    } else {
      setData('order_id', orderId);
      const order = orders.find(o => o.id.toString() === orderId);
      if (order) {
        setSelectedOrder(order);
        setData('amount', order.total_amount);
        setData('user_id', order.user_id.toString());
      }
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create New Payment" />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.get('/payments')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Payments
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Create New Payment</h1>
              <p className="text-muted-foreground">
                Add a new payment to the system
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.get('/payments')}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
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
                  <Label htmlFor="amount">Amount *</Label>
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
                    value={data.user_id}
                    onValueChange={handleUserChange}
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
                   <Label htmlFor="order_id">Related Order (Optional)</Label>
                   <Select
                     value={data.order_id || "none"}
                     onValueChange={handleOrderChange}
                   >
                     <SelectTrigger>
                       <SelectValue placeholder="Select order (optional)" />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="none">No Order</SelectItem>
                       {orders.map((order) => (
                         <SelectItem key={order.id} value={order.id.toString()}>
                           {order.order_number} - {order.product_name} (${Number(order.total_amount).toFixed(2)})
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

                {/* Payment Preview */}
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-sm text-gray-700 mb-2">Payment Preview</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-green-600">${Number(data.amount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span className="font-medium">{data.payment_method || 'Not selected'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">{data.status}</span>
                    </div>
                    {selectedOrder && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order:</span>
                        <span className="font-medium">{selectedOrder.order_number}</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.get('/payments')}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={processing}>
              <Save className="mr-2 h-4 w-4" />
              {processing ? 'Creating...' : 'Create Payment'}
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
} 