import { useMemo, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Search, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Automagic Push',
        href: '/automation',
    },
];

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AutoPushItem {
    id: number;
    name: string;
    schedule_text: string;
    next_run: string;
    domain: string;
    type: string;
    schedule: string;
    created_at: string;
}

interface AutomationIndexProps {
    items?: {
        data: AutoPushItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
        links: PaginationLink[];
        next_page_url: string | null;
        prev_page_url: string | null;
    };
}

const fallbackItems: AutoPushItem[] = [];

export default function AutomationIndex({ items }: AutomationIndexProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState((items?.per_page ?? 10).toString());
    const [currentPage, setCurrentPage] = useState(1);

    const data = useMemo(() => items?.data ?? fallbackItems, [items]);

    const filtered = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return data;
        return data.filter((r) =>
            r.name.toLowerCase().includes(term) ||
            r.domain.toLowerCase().includes(term) ||
            r.type.toLowerCase().includes(term)
        );
    }, [data, searchTerm]);

    const isServerPaginated = Boolean(items?.links && items?.data && items.data.length > 0);
    const perPage = items?.per_page ?? (Number(itemsPerPage) || 10);
    const totalCount = items?.total ?? filtered.length;
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (safeCurrentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedData = isServerPaginated ? filtered : filtered.slice(startIndex, endIndex);
    const showingFrom = isServerPaginated ? (items?.from ?? 0) : (filtered.length ? startIndex + 1 : 0);
    const showingTo = isServerPaginated ? (items?.to ?? 0) : Math.min(filtered.length, endIndex);

    const handlePageChange = (url: string) => {
        const params: any = {};
        if (searchTerm) params.search = searchTerm;
        router.get(url, params, { preserveState: true });
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(value);
        if (isServerPaginated) {
            const params: any = { per_page: value };
            if (searchTerm) params.search = searchTerm;
            router.get('/automation', params, { preserveState: true });
        } else {
            setCurrentPage(1);
        }
    };

    const handleSearch = () => {
        if (isServerPaginated) {
            const params: any = {};
            if (searchTerm) params.search = searchTerm;
            router.get('/automation', params, { preserveState: true });
        } else {
            setCurrentPage(1);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Automagic Push" />

            <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Automagic Push</h1>
                        <p className="text-muted-foreground">Send Recurring Campaigns on a schedule.</p>
                    </div>
                    <div className='flex gap-2'>
                        <Link href={route('automation.create')}>
                            <Button className="bg-blue-500 text-white">
                                <Plus className="mr-2 h-4 w-4" />
                                Create AutoPush Campaigns
                            </Button>
                        </Link>

                        <Button className="bg-red-500 text-white">
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>

                <Alert className="border-red-300 bg-red-50 text-red-900">
                    <AlertDescription>
                        <span className="font-medium">Note:</span> This is a demo server used to showcase and test features or functions of LaraPush Pro Panel.
                    </AlertDescription>
                </Alert>

                <Card>
                    <CardHeader>
                        <CardTitle>All AutoPush</CardTitle>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select value={itemsPerPage} onValueChange={handleItemsPerPageChange}>
                                <SelectTrigger className="w-full sm:w-[140px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10 per page</SelectItem>
                                    <SelectItem value="25">25 per page</SelectItem>
                                    <SelectItem value="50">50 per page</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex-1">
                                <Input
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                />
                            </div>
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
                                    <TableHead>Name</TableHead>
                                    <TableHead>Schedule Text</TableHead>
                                    <TableHead>Action</TableHead>
                                    <TableHead>Next Run</TableHead>
                                    <TableHead>Domain</TableHead>
                                    <TableHead>AutoPush Type</TableHead>
                                    <TableHead>Schedule</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Created</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedData.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={9} className="text-center text-muted-foreground">
                                            No data available in table
                                        </TableCell>
                                    </TableRow>
                                )}
                                {paginatedData.map((r) => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-medium">{r.name}</TableCell>
                                        <TableCell>{r.schedule_text}</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>{r.next_run}</TableCell>
                                        <TableCell>{r.domain}</TableCell>
                                        <TableCell>{r.type}</TableCell>
                                        <TableCell>{r.schedule}</TableCell>
                                        <TableCell>{r.type}</TableCell>
                                        <TableCell>{r.created_at}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        {/* Pagination */}
                        {isServerPaginated ? (
                            <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                                <div className="text-sm text-gray-700">Showing {items?.from} to {items?.to} of {totalCount} entries</div>
                                <div className="flex items-center gap-2">
                                    {items?.links?.map((link, index) => (
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
                        ) : (
                            filtered.length > 0 && (
                                <div className="flex items-center justify-between bg-white px-6 py-3 border border-gray-200 rounded-lg mt-4">
                                    <div className="text-sm text-gray-700">Showing {showingFrom} to {showingTo} of {totalCount} entries</div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                            disabled={safeCurrentPage === 1}
                                            className={`px-3 py-1 text-sm rounded-md ${safeCurrentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            Previous
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1 text-sm rounded-md ${
                                                    page === safeCurrentPage
                                                        ? 'bg-blue-500 text-white cursor-default'
                                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                                }`}
                                                disabled={page === safeCurrentPage}
                                            >
                                                {page}
                                            </button>
                                        ))}
                                        <button
                                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                            disabled={safeCurrentPage === totalPages}
                                            className={`px-3 py-1 text-sm rounded-md ${safeCurrentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'}`}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}


