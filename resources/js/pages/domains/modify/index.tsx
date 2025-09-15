import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { 
    Globe, 
    Edit, 
    Trash2, 
    Plus, 
    Search, 
    RefreshCw, 
    Copy, 
    Pause, 
    Megaphone, 
    RotateCcw,
    AlertTriangle,
    CheckCircle,
    Zap,
    FileText,
    Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/dashboard',
    },
    {
        title: 'Domains',
        href: '/domains/modify',
    },
];

interface Domain {
    id: number;
    domain: string;
    desktop_count: number;
    mobile_count: number;
    total_count: number;
    status: string;
    created_at: string;
    has_warning?: boolean;
    is_wordpress?: boolean;
    is_default?: boolean;
}

interface PaginationData {
    current_page: number;
    data: Domain[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

interface Props {
    domains: PaginationData;
}

export default function DomainsModify({ domains }: Props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(domains?.per_page?.toString() || '10');

    // Sample data for demonstration - replace with actual data from props
    const sampleDomains: Domain[] = [
        {
            id: 28,
            domain: 'naughtytalk.s6-tastewp.com',
            desktop_count: 1,
            mobile_count: 0,
            total_count: 1,
            status: 'Active',
            created_at: '2025-07-24 15:43',
            has_warning: true,
            is_wordpress: true,
            is_default: false
        },
        {
            id: 24,
            domain: 'test5.larapush.com',
            desktop_count: 0,
            mobile_count: 0,
            total_count: 0,
            status: 'Active',
            created_at: '2025-07-10 14:06',
            has_warning: true,
            is_wordpress: true,
            is_default: false
        },
        {
            id: 22,
            domain: 'eu2.wpsandbox.org',
            desktop_count: 23,
            mobile_count: 5,
            total_count: 28,
            status: 'Active',
            created_at: '2025-07-02 16:48',
            has_warning: true,
            is_wordpress: true,
            is_default: false
        },
        {
            id: 18,
            domain: 'entranced-scarab-b5c838.instawp.xyz',
            desktop_count: 2,
            mobile_count: 0,
            total_count: 2,
            status: 'Active',
            created_at: '2025-06-02 17:57',
            has_warning: true,
            is_wordpress: true,
            is_default: false
        },
        {
            id: 2,
            domain: 'test1.larapu.sh',
            desktop_count: 50,
            mobile_count: 18,
            total_count: 68,
            status: 'Active',
            created_at: '2025-04-02 18:39',
            has_warning: false,
            is_wordpress: true,
            is_default: false
        },
        {
            id: 1,
            domain: 'Default',
            desktop_count: 13,
            mobile_count: 1,
            total_count: 14,
            status: 'Active',
            created_at: '2025-04-02 18:26',
            has_warning: false,
            is_wordpress: true,
            is_default: true
        }
    ];

    const domainsData = domains?.data || sampleDomains;
    const totalEntries = domains?.total || domainsData.length;

    const filteredDomains = domainsData.filter((domain: Domain) =>
        domain.domain.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getDomainIcon = (domain: Domain) => {
        if (domain.is_default) {
            return <Zap className="h-4 w-4 text-blue-500" />;
        }
        return <Globe className="h-4 w-4 text-gray-500" />;
    };

    const getStatusIcon = (domain: Domain) => {
        if (domain.has_warning) {
            return <AlertTriangle className="h-4 w-4 text-red-500" />;
        }
        return <CheckCircle className="h-4 w-4 text-green-500" />;
    };

    const getWordPressIcon = (domain: Domain) => {
        return (
            <div className={`text-xs font-bold ${domain.has_warning ? 'text-gray-400' : 'text-blue-600'}`}>
                W
            </div>
        );
    };

    const handleDelete = (domainId: number) => {
        if (confirm('Are you sure you want to delete this domain?')) {
            router.delete(route('domains.destroy', domainId));
        }
    };

    const handleCopy = (domainId: number) => {
        router.post(route('domains.copy', domainId));
    };

    const handlePause = (domainId: number) => {
        router.post(route('domains.pause', domainId));
    };

    const handleBroadcast = (domainId: number) => {
        router.post(route('domains.broadcast', domainId));
    };

    const handleRefresh = (domainId: number) => {
        router.post(route('domains.refresh', domainId));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Domains" />
            
            <div className="flex flex-col gap-6 p-6">
                {/* Header Section */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Domains</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href={route('domains.create')}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add Domain
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Alert Message */}
                <Alert className="border-red-200 bg-red-50">
                    <Bell className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800">
                        Note: This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                {/* Table Controls */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm">
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Show</span>
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
                            <span className="text-sm text-gray-600">entries</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">Search:</span>
                        <Input
                            type="text"
                            placeholder="Search domains..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-64"
                        />
                    </div>
                </div>

                {/* Domains Table */}
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Domain
                                            <div className="flex flex-col ">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Desktop
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Mobile
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Total
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Status
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider">
                                        Action
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            Created
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                                        <div className="flex items-center gap-1">
                                            ID
                                            <div className="flex flex-col">
                                                <span className="text-xs">▲</span>
                                                <span className="text-xs">▼</span>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredDomains.map((domain) => (
                                    <tr key={domain.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {getDomainIcon(domain)}
                                                <div className="flex items-center justify-between gap-2">
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {domain.domain}
                                                    </span>
                                                    <Edit className="h-3 w-3 text-gray-400 cursor-pointer hover:text-gray-600" />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(domain)}
                                                    {getWordPressIcon(domain)}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {domain.desktop_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {domain.mobile_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {domain.total_count}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <Badge className="bg-green-500 text-white">
                                                {domain.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100"
                                                    onClick={() => handleCopy(domain.id)}
                                                >
                                                    <FileText className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                                                    onClick={() => handlePause(domain.id)}
                                                >
                                                    <Pause className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100"
                                                    onClick={() => handleBroadcast(domain.id)}
                                                >
                                                    <Megaphone className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
                                                    onClick={() => handleRefresh(domain.id)}
                                                >
                                                    <RotateCcw className="h-3 w-3" />
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                                                    onClick={() => handleDelete(domain.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {domain.created_at}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {domain.id}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700">
                        Showing 1 to {filteredDomains.length} of {totalEntries} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" disabled>
                            Previous
                        </Button>
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            1
                        </Button>
                        <Button variant="outline" size="sm" disabled>
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
