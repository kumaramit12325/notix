import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import {
    RefreshCw,
    Plus,
    Trash2,
    Search,
    Copy,
    Edit,
    ChevronUp,
    ChevronDown,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

interface SegmentationRule {
    id: number;
    user_id: number | null;
    name: string;
    domains: string;
    condition: string;
    created_at: string;
}

interface Props {
    segmentationRules: SegmentationRule[];
}

export default function SegmentationIndex({ segmentationRules }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(10);
    const [sortField, setSortField] = useState<string>('created_at');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

    // Filter rules based on search term
    const filteredRules = segmentationRules.filter(rule =>
        rule.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rule.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort rules
    const sortedRules = [...filteredRules].sort((a, b) => {
        const aValue = a[sortField as keyof SegmentationRule];
        const bValue = b[sortField as keyof SegmentationRule];

        if (sortDirection === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    // Pagination
    const totalPages = Math.ceil(sortedRules.length / entriesPerPage);
    const startIndex = (currentPage - 1) * entriesPerPage;
    const endIndex = startIndex + entriesPerPage;
    const currentRules = sortedRules.slice(startIndex, endIndex);

    const handleSort = (field: string) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleEntriesChange = (entries: number) => {
        setEntriesPerPage(entries);
        setCurrentPage(1);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this segmentation rule?')) {
            router.delete(`/segmentation/${id}`);
        }
    };

    const handleBulkDelete = () => {
        if (confirm('Are you sure you want to delete the selected segmentation rules?')) {
            // For now, we'll implement this later with checkboxes
            alert('Bulk delete functionality will be implemented with checkboxes');
        }
    };

    const handleCopy = (rule: SegmentationRule) => {
        try {
            const ruleData = {
                name: rule.name,
                domains: rule.domains,
                condition: rule.condition
            };
            
            navigator.clipboard.writeText(JSON.stringify(ruleData, null, 2)).then(() => {
                alert('Segmentation rule data copied to clipboard!');
            }).catch(() => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = JSON.stringify(ruleData, null, 2);
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                alert('Segmentation rule data copied to clipboard!');
            });
        } catch (error) {
            alert('Failed to copy data to clipboard');
        }
    };

    return (
        <AppLayout>
            <Head title="Segmentation" />

            <div className="space-y-6 p-4">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Segmentation</h1>
                    </div>
                    <div className="text-sm text-blue-600">
                        Home / Segmentations
                    </div>
                </div>


                {/* Main Content Card */}
                <Card>
                    <CardContent className="p-6">
                        {/* Top Controls */}
                        <div className="flex justify-between items-center mb-6">
                            <Button variant="outline" size="icon">
                                <RefreshCw className="h-4 w-4" />
                            </Button>

                            <div className='flex gap-2'>
                                <Button asChild className='bg-green-500 hover:bg-green-600'>
                                    <Link href="/segmentation/create">
                                        <Plus className="h-4 w-4 mr-2" />
                                        Create New Segmentation
                                    </Link>
                                </Button>
                                <Button variant="destructive" onClick={handleBulkDelete}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-600">Show</span>
                                    <select
                                        value={entriesPerPage}
                                        onChange={(e) => handleEntriesChange(Number(e.target.value))}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm"
                                    >
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                    </select>
                                    <span className="text-sm text-gray-600">entries</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
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
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-50">
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            ID
                                        </th>
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            User ID
                                        </th>
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            Name
                                        </th>
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            Domains
                                        </th>
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            Action
                                        </th>
                                        <th className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700">
                                            Condition
                                        </th>
                                        <th
                                            className="border border-gray-200 px-4 py-3 text-left text-sm font-medium text-gray-700 cursor-pointer"
                                            onClick={() => handleSort('created_at')}
                                        >
                                            <div className="flex items-center space-x-1">
                                                <span>Created At</span>
                                                {sortField === 'created_at' && (
                                                    sortDirection === 'asc' ?
                                                        <ChevronUp className="h-4 w-4" /> :
                                                        <ChevronDown className="h-4 w-4" />
                                                )}
                                            </div>
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                                                         {currentRules.map((rule) => (
                                         <tr key={rule.id} className="hover:bg-gray-50">
                                             <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                                 {rule.id}
                                             </td>
                                             <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                                 {rule.user_id || 'N/A'}
                                             </td>
                                             <td className="border border-gray-200 px-4 py-3">
                                                 <div className="flex items-center space-x-2">
                                                     <Link
                                                         href={`/segmentation/${rule.id}/edit`}
                                                         className="text-blue-600 hover:text-blue-800 font-medium"
                                                     >
                                                         {rule.name}
                                                     </Link>
                                                     <Edit className="h-3 w-3 text-gray-400" />
                                                 </div>
                                             </td>
                                            <td className="border border-gray-200 px-4 py-3">
                                                <Badge variant="secondary">{rule.domains}</Badge>
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3">
                                                <div className="flex items-center space-x-2">
                                                    <Button 
                                                        variant="outline" 
                                                        className='bg-blue-700 hover:bg-blue-700 text-white hover:text-white' 
                                                        size="sm"
                                                        onClick={() => handleCopy(rule)}
                                                    >
                                                        <Copy className="h-3 w-3 " />
                                                    </Button>
                                                    <Button 
                                                        variant="outline" 
                                                        className='bg-green-600 hover:bg-green-700 text-white hover:text-white' 
                                                        size="sm"
                                                        asChild
                                                    >
                                                        <Link href={`/segmentation/${rule.id}/edit`}>
                                                            <Edit className="h-3 w-3 " />
                                                        </Link>
                                                    </Button>
                                                    <Button 
                                                        variant="destructive" 
                                                        size="sm"
                                                        onClick={() => handleDelete(rule.id)}
                                                    >
                                                        <Trash2 className="h-3 w-3 " />
                                                    </Button>
                                                </div>
                                            </td>
                                            <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                                {(() => {
                                                    try {
                                                        const conditions = JSON.parse(rule.condition);
                                                        if (Array.isArray(conditions) && conditions.length > 0) {
                                                            return conditions.map((cond, index) => 
                                                                `${cond.property} ${cond.operator} ${cond.value}`
                                                            ).join(', ');
                                                        }
                                                        return 'No conditions';
                                                    } catch (e) {
                                                        return rule.condition || 'No conditions';
                                                    }
                                                })()}
                                            </td>
                                                                                         <td className="border border-gray-200 px-4 py-3 text-sm text-gray-600">
                                                 {rule.created_at}
                                             </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <div className="text-sm text-gray-600">
                                Showing {startIndex + 1} to {Math.min(endIndex, sortedRules.length)} of {sortedRules.length} entries
                            </div>

                            <div className="flex items-center space-x-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Previous
                                </Button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className="w-8 h-8 p-0"
                                    >
                                        {page}
                                    </Button>
                                ))}

                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
