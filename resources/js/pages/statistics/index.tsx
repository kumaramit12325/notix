import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle, CheckCircle, ChevronUp, ChevronDown } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// Mock data for charts
const deviceData = [
    { name: 'Desktop', value: 75, color: '#ec4899' },
    { name: 'Mobile', value: 25, color: '#60a5fa' }
];

const osData = [
    { name: 'OS X', value: 45, color: '#06b6d4' },
    { name: 'Windows', value: 35, color: '#a78bfa' },
    { name: 'AndroidOS', value: 20, color: '#eab308' }
];

const browserData = [
    { name: 'Chrome', value: 95, color: '#a78bfa' },
    { name: 'Edge', value: 3, color: '#f97316' },
    { name: 'Firefox', value: 2, color: '#ec4899' }
];

// Breadcrumbs
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Statistics',
        href: '/statistics',
    },
];

// Mock data for tables
const countryData = [
    { country: 'India', desktop: 92, mobile: 23, total: 115 },
    { country: 'The Netherlands', desktop: 5, mobile: 0, total: 5 },
    { country: 'Egypt', desktop: 0, mobile: 1, total: 1 },
    { country: 'United States', desktop: 0, mobile: 1, total: 1 }
];

const stateData = [
    { state: 'Maharashtra', desktop: 47, mobile: 3, total: 50 },
    { state: 'Haryana', desktop: 22, mobile: 4, total: 26 },
    { state: 'National Capital Territory of Delhi', desktop: 7, mobile: 4, total: 11 },
    { state: 'Odisha', desktop: 8, mobile: 1, total: 9 },
    { state: 'Goa', desktop: 2, mobile: 2, total: 4 },
    { state: 'Uttarakhand', desktop: 3, mobile: 0, total: 3 },
    { state: 'Punjab', desktop: 0, mobile: 3, total: 3 },
    { state: 'Jharkhand', desktop: 0, mobile: 2, total: 2 },
    { state: 'Tamil Nadu', desktop: 0, mobile: 1, total: 1 },
    { state: 'Cairo Governorate', desktop: 0, mobile: 1, total: 1 }
];

// Simple Pie Chart Component
const PieChart = ({ data, title }: { data: any[], title: string }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = 0;

    return (
        <div className="flex flex-col items-center space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <div className="relative w-32 h-32">
                <svg width="128" height="128" viewBox="0 0 128 128" className="transform -rotate-90">
                    {data.map((item, index) => {
                        const angle = (item.value / total) * 360;
                        const x1 = 64 + 64 * Math.cos((currentAngle * Math.PI) / 180);
                        const y1 = 64 + 64 * Math.sin((currentAngle * Math.PI) / 180);
                        const x2 = 64 + 64 * Math.cos(((currentAngle + angle) * Math.PI) / 180);
                        const y2 = 64 + 64 * Math.sin(((currentAngle + angle) * Math.PI) / 180);
                        const largeArcFlag = angle > 180 ? 1 : 0;
                        
                        const pathData = [
                            `M 64 64`,
                            `L ${x1} ${y1}`,
                            `A 64 64 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                            'Z'
                        ].join(' ');
                        
                        currentAngle += angle;
                        
                        return (
                            <path
                                key={index}
                                d={pathData}
                                fill={item.color}
                                stroke="white"
                                strokeWidth="2"
                            />
                        );
                    })}
                </svg>
            </div>
            <div className="space-y-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <div 
                            className="w-3 h-3 rounded-sm" 
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-gray-700">{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Data Table Component
const DataTable = ({ data, title, columns }: { data: any[], title: string, columns: string[] }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = data.filter(item => 
        Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalPages = Math.ceil(filteredData.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">{title}</CardTitle>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Show</span>
                        <Select value={entriesPerPage.toString()} onValueChange={(value) => setEntriesPerPage(Number(value))}>
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                            </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-600">entries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Search:</span>
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-48"
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {columns.map((column, index) => (
                                    <th key={index} className="text-left py-3 px-4 font-medium text-gray-700">
                                        <div className="flex items-center space-x-1">
                                            <span>{column}</span>
                                            <div className="flex flex-col">
                                                <ChevronUp className="w-3 h-3 text-gray-400" />
                                                <ChevronDown className="w-3 h-3 text-gray-400" />
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.map((row, rowIndex) => (
                                <tr 
                                    key={rowIndex} 
                                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                >
                                    {Object.values(row).map((value, colIndex) => (
                                        <td key={colIndex} className="py-3 px-4 text-gray-700">
                                            {colIndex === 0 ? String(value) : (
                                                <span className="text-center block">{String(value)}</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
                    </div>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <Button
                                key={page}
                                variant={page === currentPage ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default function StatisticsPage() {
    const [filters, setFilters] = useState({
        domain: 'all',
        country: 'all',
        state: 'all',
        device: 'all',
        os: 'all',
        browser: 'all'
    });

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Statistics</h1>
                </div>

            {/* Alert Banner */}
            <Alert className="mb-6 border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                    Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                </AlertDescription>
            </Alert>

            {/* Current Active Subscribers Card */}
            <Card className="mb-6">
                <CardContent className="px-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-lg font-medium text-gray-900 mb-2">Current Active Subscribers</h2>
                            <p className="text-3xl font-bold text-gray-900">119 Subscribers</p>
                        </div>
                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Filters Card */}
            <Card className="mb-6">
                <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                            <Select value={filters.domain} onValueChange={(value) => handleFilterChange('domain', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="example.com">example.com</SelectItem>
                                    <SelectItem value="demo.com">demo.com</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                            <Select value={filters.country} onValueChange={(value) => handleFilterChange('country', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="india">India</SelectItem>
                                    <SelectItem value="netherlands">The Netherlands</SelectItem>
                                    <SelectItem value="egypt">Egypt</SelectItem>
                                    <SelectItem value="usa">United States</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                            <Select value={filters.state} onValueChange={(value) => handleFilterChange('state', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                    <SelectItem value="haryana">Haryana</SelectItem>
                                    <SelectItem value="delhi">National Capital Territory of Delhi</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
                            <Select value={filters.device} onValueChange={(value) => handleFilterChange('device', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="desktop">Desktop</SelectItem>
                                    <SelectItem value="mobile">Mobile</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Operating System</label>
                            <Select value={filters.os} onValueChange={(value) => handleFilterChange('os', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="osx">OS X</SelectItem>
                                    <SelectItem value="windows">Windows</SelectItem>
                                    <SelectItem value="android">AndroidOS</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Browser</label>
                            <Select value={filters.browser} onValueChange={(value) => handleFilterChange('browser', value)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All</SelectItem>
                                    <SelectItem value="chrome">Chrome</SelectItem>
                                    <SelectItem value="edge">Edge</SelectItem>
                                    <SelectItem value="firefox">Firefox</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button className="bg-green-600 hover:bg-green-700 text-white">
                            Filter
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                    <CardContent className="p-6">
                        <PieChart data={deviceData} title="Device" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <PieChart data={osData} title="OS" />
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-6">
                        <PieChart data={browserData} title="Browser" />
                    </CardContent>
                </Card>
            </div>

            {/* Data Tables */}
            <div className="space-y-6">
                <DataTable 
                    data={countryData} 
                    title="Country" 
                    columns={['Country', 'Desktop', 'Mobile', 'Total']} 
                />
                <DataTable 
                    data={stateData} 
                    title="State" 
                    columns={['State', 'Desktop', 'Mobile', 'Total']} 
                />
            </div>
        </div>
        </AppLayout>
    );
}
