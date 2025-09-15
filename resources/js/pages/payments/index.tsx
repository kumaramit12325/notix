import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Eye, Edit, Trash2, CreditCard, DollarSign, Wallet, Download, FileText } from 'lucide-react';
import { router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

interface Payment {
  id: number;
  payment_number: string;
  amount: number;
  payment_method: string;
  status: string;
  transaction_id: string | null;
  payment_date: string;
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

interface PaymentsPageProps {
  payments: {
    data: Payment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    next_page_url: string | null;
    prev_page_url: string | null;
  };
}

export default function PaymentsIndex({ payments }: PaymentsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [itemsPerPage, setItemsPerPage] = useState(payments.per_page.toString());

  const handlePageChange = (url: string) => {
    const searchParams: any = {};
    
    if (searchTerm) {
      searchParams.search = searchTerm;
    }
    
    if (statusFilter !== 'all') {
      searchParams.status = statusFilter;
    }
    
    if (methodFilter !== 'all') {
      searchParams.payment_method = methodFilter;
    }
    
    router.get(url, searchParams, { preserveState: true });
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(value);
    const searchParams: any = { per_page: value };
    
    if (searchTerm) {
      searchParams.search = searchTerm;
    }
    
    if (statusFilter !== 'all') {
      searchParams.status = statusFilter;
    }
    
    if (methodFilter !== 'all') {
      searchParams.payment_method = methodFilter;
    }
    
    router.get('/payments', searchParams, { preserveState: true });
  };

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
        return <CreditCard className="h-4 w-4" />;
      case 'Cash':
        return <DollarSign className="h-4 w-4" />;
      case 'Wallet':
        return <Wallet className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const handleSearch = () => {
    const searchParams: any = {
      search: searchTerm,
    };
    
    if (statusFilter !== 'all') {
      searchParams.status = statusFilter;
    }
    
    if (methodFilter !== 'all') {
      searchParams.payment_method = methodFilter;
    }
    
    router.get('/payments', searchParams, { preserveState: true });
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this payment?')) {
      router.delete(`/payments/${id}`);
    }
  };

  const totalAmount = payments.data.reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);
  const completedAmount = payments.data
    .filter(payment => payment.status === 'Completed')
    .reduce((sum, payment) => sum + (Number(payment.amount) || 0), 0);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Payments" />
      
      <div className="flex flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
            <p className="text-muted-foreground">
              Manage and track all payment transactions
            </p>
          </div>
          <div className="flex gap-2">
          
            <Button onClick={() => router.get('/payments/create')}>
              <Plus className="mr-2 h-4 w-4" />
              New Payment
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Payment Statistics </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{payments.total}</div>
                <div className="text-sm text-muted-foreground">Total Payments</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {payments.data.filter(payment => payment.status === 'Completed').length}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
                

              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {payments.data.filter(payment => payment.status === 'Pending').length}
                </div>
                <div className="text-sm text-muted-foreground">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  ${completedAmount.toFixed(2)}
                </div>
                <div className="text-sm text-muted-foreground">Total Collected</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search payments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Payment Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Select value={methodFilter} onValueChange={setMethodFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Payment Method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                  <SelectItem value="Debit Card">Debit Card</SelectItem>
                  <SelectItem value="UPI">UPI</SelectItem>
                  <SelectItem value="Net Banking">Net Banking</SelectItem>
                  <SelectItem value="Wallet">Wallet</SelectItem>
                </SelectContent>
              </Select>
              <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 per page</SelectItem>
                  <SelectItem value="10">10 per page</SelectItem>
                  <SelectItem value="25">25 per page</SelectItem>
                  <SelectItem value="50">50 per page</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Payment #</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.data.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="font-medium">{payment.payment_number}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{payment.user.name}</div>
                        <div className="text-sm text-muted-foreground">{payment.user.email}</div>
                      </div>
                    </TableCell>
                                         <TableCell className="font-medium">${(Number(payment.amount) || 0).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getMethodIcon(payment.payment_method)}
                        <span>{payment.payment_method}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {payment.transaction_id ? (
                        <span className="text-sm font-mono">{payment.transaction_id}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(payment.payment_date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.get(`/payments/${payment.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            // Use fetch to get the PDF and trigger download
                            fetch(`/payments/${payment.id}/invoice`)
                              .then(response => {
                                if (!response.ok) {
                                  throw new Error('Network response was not ok');
                                }
                                return response.blob();
                              })
                              .then(blob => {
                                const url = window.URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `invoice-${payment.payment_number}.pdf`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                                window.URL.revokeObjectURL(url);
                              })
                              .catch(error => {
                                console.error('Download failed:', error);
                                alert('Download failed. Please try again.');
                              });
                          }}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.get(`/payments/${payment.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(payment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {payments.data.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No payments found.</p>
              </div>
            )}

            {/* Pagination */}
            {payments.data.length > 0 && (
              <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                <div className="text-sm text-gray-700">
                  Showing {payments.from} to {payments.to} of {payments.total} results
                </div>
                <div className="flex items-center gap-2">
                  {payments.links.map((link, index) => (
                    <button
                      key={index}
                      onClick={() => link.url && handlePageChange(link.url)}
                      disabled={!link.url || link.active}
                      className={`px-3 py-1 text-sm rounded-md ${
                        link.active
                          ? 'bg-blue-500 text-white cursor-default'
                          : link.url
                          ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
} 