import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Search, Trash, RefreshCw, Edit, Eye, Bell } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Automation',
        href: '/automation',
    },
    {
        title: 'Welcome Push',
        href: '/welcomepush',
    },
];

interface WelcomePushItem {
    id: number;
    title: string;
    domain: string;
    delay_seconds: string;
    created_at: string;
}

const mockData: WelcomePushItem[] = [
    {
        id: 1,
        title: 'Thanks for subscribing',
        domain: 'All',
        delay_seconds: 'Immediately',
        created_at: '2025-04-17 16:45',
    },
];

export default function WelcomePushIndex() {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState('10');
    const [currentPage, setCurrentPage] = useState(1);

    const filtered = mockData.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / Number(itemsPerPage));
    const startIndex = (currentPage - 1) * Number(itemsPerPage);
    const endIndex = startIndex + Number(itemsPerPage);
    const paginatedData = filtered.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <AppLayout>
            <Head title="Welcome Push" />
            
            <div className="space-y-6 p-4">
                {/* Header Section */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Push</h1>
                    <p className="text-gray-600 mt-2">
                        Send or schedule push notification as soon as user subscribes you.
                    </p>
                </div>

                {/* Alert Banner */}
                <Alert className="border-red-200 bg-red-50">
                    <Bell className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                {/* Main Content Card */}
                <Card>
                    <CardHeader>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            {/* Left side - Refresh button */}
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">
                                    <RefreshCw className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Right side - Action buttons and search */}
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <div className="flex gap-2">
                                    <Link href="/welcomepush/create">
                                        <Button className="bg-blue-600 hover:bg-blue-700">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Welcome Push Campaign
                                        </Button>
                                    </Link>
                                    <Button variant="destructive">
                                        <Trash className="h-4 w-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                              
                            </div>
                        </div>

                        {/* Table controls */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium text-gray-700">Show:</label>
                                <Select value={itemsPerPage} onValueChange={setItemsPerPage}>
                                    <SelectTrigger className="w-20">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="10">10</SelectItem>
                                        <SelectItem value="25">25</SelectItem>
                                        <SelectItem value="50">50</SelectItem>
                                        <SelectItem value="100">100</SelectItem>
                                    </SelectContent>
                                </Select>
                                <span className="text-sm text-gray-700">entries</span>
                            </div>
                            <div className="flex items-center gap-2">
                                    <label className="text-sm font-medium text-gray-700">Search:</label>
                                    <Input
                                        placeholder="Search..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-48"
                                    />
                                </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        {/* Table */}
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Domain</TableHead>
                                        <TableHead>Delay (seconds)</TableHead>
                                        <TableHead>Action</TableHead>
                                        <TableHead className="cursor-pointer">
                                            Created
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                        <TableHead className="cursor-pointer">
                                            Id
                                            <span className="ml-1">↕</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {paginatedData.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Link 
                                                        href={`/welcomepush/${item.id}/edit`}
                                                        className="text-blue-600 hover:text-blue-800 font-medium"
                                                    >
                                                        {item.title}
                                                    </Link>
                                                    <Edit className="h-3 w-3 text-blue-600" />
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.domain}</TableCell>
                                            <TableCell>{item.delay_seconds}</TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    <Link href={`/welcomepush/${item.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/welcomepush/${item.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            <Edit className="h-3 w-3" />
                                                        </Button>
                                                    </Link>
                                                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                                        <Trash className="h-3 w-3" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                            <TableCell>{item.created_at}</TableCell>
                                            <TableCell>{item.id}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination and Summary */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
                            <div className="text-sm text-gray-700">
                                Showing {startIndex + 1} to {Math.min(endIndex, totalItems)} of {totalItems} entries
                            </div>
                            
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </Button>
                                
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                    >
                                        {page}
                                    </Button>
                                ))}
                                
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={currentPage === totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
